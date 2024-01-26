import React from 'react'
import FavBookImg from '../assets/favoritebook.jpg'
import { Link } from 'react-router-dom'

const FavBook = () => {
    return (
        <div className="px-4 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center">
            <div className="md:w-1/2">
                <img
                    src={FavBookImg}
                    alt="favoritebook"
                    className="rounded md:w-10/12"
                />
            </div>
            <div className="md:w-1/2 space-y-6">
                <h2 className="text-5xl font-bold my-5 md:h-3/4 leading-snug">
                    Find Your Favorite{' '}
                    <span className="text-blue-700">Book Here ! </span>
                </h2>
                <p className="mb-10 text-lg md:w-5/6 text-justify">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Quasi placeat nihil recusandae iusto dolorem ab distinctio.
                    Laudantium rerum ipsa voluptates voluptate ducimus obcaecati
                    quae ullam earum! Ratione similique vel neque!
                </p>
                <div className="flex flex-col sm:flex-row justify-between gap-5 md:w-3/4 my-14">
                    <div>
                        <h3 className="text-3xl font-bold">800+</h3>
                        <p className="text-base">Book Listing</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold">600+</h3>
                        <p className="text-base">Register Users</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold">100K+</h3>
                        <p className="text-base">PDF Downloaded</p>
                    </div>
                </div>

                <Link to="/shop" className="mt-12 block">
                    <button className="bg-blue-700 text-white font-semibold px-5 rounded py-2 hover:bg-black transition-all duration-500">
                        Explore More
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default FavBook
