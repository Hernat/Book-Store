import React, { useState, useEffect } from 'react'

import BookCards from '../components/BookCards'

const BestSellerBooks = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/all-books')
            .then((response) => response.json())
            .then((data) => setBooks(data.slice(0, 6)))
    }, [])
    return (
        <div>
            <BookCards books={books} headline="Best Seller Books" />
        </div>
    )
}

export default BestSellerBooks
