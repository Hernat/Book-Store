import React from 'react'
import { Link } from 'react-router-dom'
import BookAward from '../assets/awardbooks.png'

const PromoBanner = () => {
    return (
        <div className="mt-16 py-12 bg-teal-100 px-4 lg:px-24">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="md:h-1/2">
                    <h2 className="text-4xl font-bold mb-6 leading-snug">
                        2024 national Book Award For Fiction Shortlist
                    </h2>
                    <Link to="/shop" className="  block">
                        <button className="bg-blue-700 text-white font-semibold px-5 rounded py-2 hover:bg-black transition-all duration-500">
                            Get Promo Code
                        </button>
                    </Link>
                </div>

                <div>
                    <img src={BookAward} alt="Award" />
                </div>
            </div>
        </div>
    )
}

export default PromoBanner
