const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const port = process.env.PORT || 8080

// middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// mongodb connect

const {
    MongoClient,
    ServerApiVersion,
    ObjectId,
    MongoError,
} = require('mongodb')
const uri = process.env.MONGODB_URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

async function run() {
    let isConnected = false

    while (!isConnected) {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            await client.connect()

            // Send a ping to confirm a successful connection
            await client.db('admin').command({ ping: 1 })
            console.log(
                'Pinged your deployment. You successfully connected to MongoDB!'
            )

            // create collection

            const bookCollections = client
                .db('BookInventory')
                .collection('books')

            // insert books
            app.post('/upload-book', async (req, res) => {
                const data = req.body

                const result = await bookCollections.insertOne(data)

                res.send(result)
            })

            // get books
            // app.get('/get-books', async (req, res) => {
            //     const books = bookCollections.find()
            //     const result = await books.toArray()
            //     res.send(result)
            // })

            // update book
            app.patch('/update-book/:id', async (req, res) => {
                const id = req.params.id

                const updateData = req.body
                const filter = { _id: new ObjectId(id) }
                const options = { upsert: true }

                const updateDoc = {
                    $set: {
                        ...updateData,
                    },
                }

                const result = await bookCollections.updateOne(
                    filter,
                    updateDoc,
                    options
                )

                res.send(result)
            })

            // delete book
            app.delete('/delete-book/:id', async (req, res) => {
                const id = req.params.id

                const filter = { _id: new ObjectId(id) }

                const result = await bookCollections.deleteOne(filter)

                res.send(result)
            })

            // find by category
            app.get('/all-books/', async (req, res) => {
                let query = {}
                if (req.query?.category) {
                    query = { category: req.query.category }
                }

                const result = await bookCollections.find(query).toArray()
                res.send(result)
            })

            // get one book
            app.get('/get-book/:id', async (req, res) => {
                const id = req.params.id

                const filter = { _id: new ObjectId(id) }

                const result = await bookCollections.findOne(filter)
                res.send(result)
            })

            isConnected = true
        } catch (error) {
            console.error('Error:', error.message)

            // Traiter spécifiquement les erreurs liées à la connexion réseau
            if (
                error instanceof MongoError &&
                error.code === 8000 &&
                error.codeName === 'AtlasError'
            ) {
                console.log('Authentication failed. Check your credentials.')
                break // Arrête la boucle si l'erreur est liée à l'authentification
            } else if (
                error instanceof Error &&
                error.name === 'MongoNetworkError'
            ) {
                console.log('Attempting to reconnect...')
                await new Promise((resolve) => setTimeout(resolve, 5000))
            } else if (isDnsError(error)) {
                console.log('DNS resolution error. Retrying in 5 seconds...')
                await new Promise((resolve) => setTimeout(resolve, 5000))
            } else {
                // Propager les autres erreurs
                throw error
            }
        } finally {
            // Ensures that the client will close when you finish/error
            // await client.close()
        }
    }
}

function isDnsError(error) {
    return (
        error instanceof Error &&
        error.code === 'ESERVFAIL' &&
        error.syscall === 'queryTxt' &&
        error.hostname === 'tanaestate.kub8xwx.mongodb.net'
    )
}

async function reconnect() {
    try {
        // Close the existing client
        await client.close()

        // Create a new client and attempt to reconnect
        await client.connect()
        console.log('Reconnected to MongoDB!')
    } catch (error) {
        console.error('Error reconnecting to MongoDB:', error.message)
        // Handle the error or retry as needed
    }
}

run().catch(console.dir)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
