import React, { useState, useEffect } from 'react'

import BookCards from '../components/BookCards'

const OtherBooks = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/all-books')
            .then((response) => response.json())
            .then((data) => setBooks(data.slice(4, 10)))
    }, [])
    return (
        <div>
            <BookCards books={books} headline="Other Books" />
        </div>
    )
}

export default OtherBooks
