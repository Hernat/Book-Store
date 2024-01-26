import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

import { Card } from 'flowbite-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import { FaCartShopping, FaStar } from 'react-icons/fa6'

//import './styles.css'

// import required modules
import { Pagination } from 'swiper/modules'

const BookCards = ({ books, headline }) => {
    return (
        <div className="my-16 px-4 lg:px-24">
            <h2 className="text-5xl text-center font-bold text-black my-5">
                {headline}
            </h2>

            {/* cards */}
            <div className="mt-12">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper w-full"
                >
                    {books.map((book) => (
                        <SwiperSlide key={book._id}>
                            <Card
                                className="max-w-md w-full"
                                imgAlt={book.bookTitle}
                                imgSrc={book.bookImgURL}
                            >
                                <Link to={`/book/${book._id}`}>
                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                        {book.bookTitle}
                                    </h5>
                                </Link>
                                <div className="mb-5 mt-2.5 flex items-center ">
                                    <div className="text-yellow-300 flex">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                    </div>
                                    <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                                        5.0
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                        $599
                                    </span>
                                    <a
                                        href="#"
                                        className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                                    >
                                        <FaCartShopping className="w-4 h-4 text-white" />
                                    </a>
                                </div>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

BookCards.propTypes = {
    books: PropTypes.array.isRequired,
    headline: PropTypes.string.isRequired,
}

export default BookCards
