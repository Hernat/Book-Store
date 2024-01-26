import { useState, useEffect } from 'react'
import { Button, Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ManageBook = () => {
    const [allBooks, setAllBooks] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch('http://localhost:8080/all-books')
            .then((res) => res.json())
            .then((data) => setAllBooks(data))
    }, [allBooks])

    // delete book
    const handleDelete = (bookID) => {
        //console.log(bookID)

        setLoading(true)
        const notify = () => {
            toast.success('Book deleted successfully')
        }

        fetch(`http://localhost:8080/delete-book/${bookID}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then(() => {
                notify()
                setLoading(false)
            })
    }

    return (
        <div className="px-4 mt-12">
            <h2 className="mb-8 text-3xl font-bold">Manage a book</h2>

            <ToastContainer />
            {/* table book */}
            <div className="overflow-x-auto">
                <Table
                    hoverable
                    className="lg:w-[1180px]   border border-blue-300"
                >
                    <Table.Head>
                        <Table.HeadCell>No.</Table.HeadCell>
                        <Table.HeadCell>Book Name</Table.HeadCell>
                        <Table.HeadCell>Book Author Name</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell>Price</Table.HeadCell>
                        <Table.HeadCell>
                            <span>Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y shadow">
                        {allBooks.map((book, index) => (
                            <Table.Row
                                key={book._id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {index + 1}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {book.bookTitle}
                                </Table.Cell>
                                <Table.Cell>{book.authorName}</Table.Cell>
                                <Table.Cell>{book.category}</Table.Cell>
                                <Table.Cell>
                                    {book.bookPrice || '$20'}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex justify-center items-center">
                                        <Link
                                            to={`/admin/dashboard/edit/${book._id}`}
                                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                                        >
                                            Edit
                                        </Link>
                                        {loading ? (
                                            <Button
                                                size="xs"
                                                isProcessing
                                                onClick={() =>
                                                    handleDelete(book._id)
                                                }
                                                className="bg-red-600   font-semibold text-white rounded hover:bg-sky-600"
                                            >
                                                Delete
                                            </Button>
                                        ) : (
                                            <Button
                                                size="xs"
                                                onClick={() =>
                                                    handleDelete(book._id)
                                                }
                                                className="bg-red-600   font-semibold text-white rounded hover:bg-sky-600"
                                            >
                                                Delete
                                            </Button>
                                        )}
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}

export default ManageBook
