import React, { useState, useEffect } from 'react'
import { Card } from 'flowbite-react'
import TextTruncate from 'react-text-truncate'

const Shop = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/all-books')
            .then((res) => res.json())
            .then((data) => setBooks(data))
    }, [])
    return (
        <div className="mt-28 px-4 lg:px-24">
            <h2 className="text-5xl font-bold text-center">
                All Books ar here !
            </h2>

            <div className="grid gap-10 my-12 lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 ">
                {books?.map((book) => (
                    <Card
                        key={book._id}
                        className="max-w-sm hover:bg-blue-200 hover:scale-105 transition-all duration-200"
                        renderImage={() => (
                            <img
                                src={book.bookImgURL}
                                alt={book.bookTitle}
                                className="h-100"
                            />
                        )}
                    >
                        <div className="flex h-full flex-col justify-between gap-4 p-2 shadow-md ">
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {book.bookTitle}
                            </h5>
                            <span className="text-green-600 px-2 leading-tight">
                                | {book.category}
                            </span>
                            <TextTruncate
                                line={2}
                                element="p"
                                truncateText="…"
                                text={book.bookDescription}
                                textTruncateChild={
                                    <a
                                        className="text-sm text-blue-500"
                                        href="#"
                                    >
                                        view more
                                    </a>
                                }
                                className="font-normal text-gray-700 dark:text-gray-400"
                            />

                            <button className="bg-blue-700 font-semibold text-white py-2 rounded">
                                Buy now
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Shop
