import { useState } from 'react'
import { Button, Textarea, Select, Label, TextInput } from 'flowbite-react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UploadBook = () => {
    const bookCategories = [
        'Action',
        'Adventure',
        'Biography',
        'History',
        'Horror',
        'Kids',
        'Learning',
        'Sci-Fi',
        'Fiction',
        'Mystery',
        'Romance',
        'War',
        'Western',
        'Other',
    ]

    const [category, setCategory] = useState(bookCategories[0])

    const handleBookCategories = (e) => {
        //console.log(e.target.value)
        setCategory(e.target.value)
    }

    // Submit book categories
    const handleBookSubmit = (e) => {
        e.preventDefault()
        const form = e.target

        const bookTitle = form.bookTitle.value
        const authorName = form.authorName.value
        const bookImgURL = form.bookImgURL.value
        const bookDescription = form.bookDescription.value
        const category = form.category.value
        const bookpdfURL = form.bookpdfURL.value

        const bookData = {
            bookTitle,
            authorName,
            bookImgURL,
            bookDescription,
            category,
            bookpdfURL,
        }
        const notify = () => {
            toast.success('Book added successfully')
        }
        // send data base
        fetch('http://localhost:8080/upload-book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData),
        })
            .then((res) => res.json())
            .then(() => {
                notify()
                form.reset()
            })
    }

    return (
        <div className="px-4 my-12">
            <h2 className="mb-8 text-3xl font-bold">Upload a book</h2>

            <ToastContainer />
            <form
                onSubmit={handleBookSubmit}
                className="flex  lg:w-[1180px] flex-col flex-wrap gap-4"
            >
                {/* First row */}
                <div className="flex gap-8">
                    {/* Book Title */}
                    <div className="lg:w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="bookTitle" value="Book Title" />
                        </div>
                        <TextInput
                            id="bookTitle"
                            name="bookTitle"
                            type="text"
                            placeholder="Book name"
                            required
                        />
                    </div>

                    {/* Author name */}
                    <div className="lg:w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="authorName" value="Author name" />
                        </div>
                        <TextInput
                            id="authorName"
                            name="authorName"
                            type="text"
                            placeholder="Author name"
                            required
                        />
                    </div>
                </div>
                {/* Second Row */}
                <div className="flex gap-8">
                    {/* Image URL */}
                    <div className="lg:w-1/2">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="bookImgURL"
                                value="Book Image URL"
                            />
                        </div>
                        <TextInput
                            id="bookImgURL"
                            name="bookImgURL"
                            type="text"
                            placeholder="Book Image URL"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div className="lg:w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="category" value="Book Category" />
                        </div>
                        <Select
                            id="category"
                            name="category"
                            className="w-full rounded"
                            value={category}
                            onChange={handleBookCategories}
                            required
                        >
                            {bookCategories.map((category) => {
                                return (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                )
                            })}
                        </Select>
                    </div>
                </div>

                {/* Third row */}
                <div className="mb-2 block">
                    <Label htmlFor="bookDescription" value="Book Description" />
                </div>
                <Textarea
                    id="bookDescription"
                    name="bookDescription"
                    type="text"
                    placeholder="Book description..."
                    required
                    rows={6}
                    className="w-full"
                />

                {/* Book PDF LINK */}

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="bookpdfURL" value="Book PDF URL " />
                    </div>
                    <TextInput
                        id="bookpdfURL"
                        type="text"
                        placeholder="Book PDF URL..."
                        required
                    />
                </div>
                <Button type="submit">Upload Book</Button>
            </form>
        </div>
    )
}

export default UploadBook
