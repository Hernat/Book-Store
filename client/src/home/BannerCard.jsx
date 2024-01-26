import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

import Hand from '../assets/hand.svg'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-cards'

import './BannerCard.css'

// import required modules
import { EffectCards } from 'swiper/modules'

const BannerCard = () => {
    return (
        <div className="banner">
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
            >
                <SwiperSlide> </SwiperSlide>
                <SwiperSlide> </SwiperSlide>
                <SwiperSlide> </SwiperSlide>
                <SwiperSlide> </SwiperSlide>
                <SwiperSlide> </SwiperSlide>
            </Swiper>
            <div className="pt-3">
                <h3 className="text-center font-bold text-gradient">
                    {'<<<'} Swipe {'<<<'}
                </h3>
            </div>
        </div>
    )
}

export default BannerCard
