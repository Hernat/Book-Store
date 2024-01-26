import { useState } from 'react'
import { Button, Textarea, Select, Label, TextInput } from 'flowbite-react'

import { useParams, useLoaderData, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EditBook = () => {
    const { id } = useParams()

    const navigate = useNavigate()

    const {
        bookTitle,
        authorName,
        bookDescription,
        bookImgURL,
        bookpdfURL,
        category,
    } = useLoaderData()

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
    const index = bookCategories.indexOf(category)
    const [categoryData, setCategoryData] = useState(bookCategories[index])

    const handleBookCategories = (e) => {
        //console.log(e.target.value)
        setCategoryData(e.target.value)
    }

    // Submit book categories
    const handleBookUpdate = (e) => {
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

        // update data base

        const notify = () => {
            toast.success('Book Updated successfully')
        }
        fetch(`http://localhost:8080/update-book/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(bookData),
        })
            .then((res) => res.json())
            .then(() => {
                notify()
                setTimeout(() => {
                    navigate('/admin/dashboard/manage')
                }, 1000)
            })
    }

    return (
        <div className="px-4 my-12">
            <h2 className="mb-8 text-3xl font-bold">Update a book</h2>
            <ToastContainer />
            <form
                onSubmit={handleBookUpdate}
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
                            defaultValue={bookTitle}
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
                            defaultValue={authorName}
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
                            defaultValue={bookImgURL}
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
                            value={categoryData}
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
                    defaultValue={bookDescription}
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
                        defaultValue={bookpdfURL}
                    />
                </div>
                <Button type="submit">Update Book</Button>
            </form>
        </div>
    )
}

export default EditBook
