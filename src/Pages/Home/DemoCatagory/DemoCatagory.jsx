import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import slide1 from '../../../assets/assets/home/slide1.jpg'
import slide2 from '../../../assets/assets/home/slide2.jpg'
import slide3 from '../../../assets/assets/home/slide3.jpg'
import slide4 from '../../../assets/assets/home/slide4.jpg'
import slide5 from '../../../assets/assets/home/slide5.jpg'
import SharedTitle from '../SharedTitle';
import { Link } from 'react-router-dom';
import useMenu from '../../../Hooks/UseMenu/UseMenu';


const DemoCatagory = () => {

    const [menu] = useMenu()
    const desertCatalog = menu.filter(item => item.category === 'popular')

    return (
        <section>
            <SharedTitle title={"Order Online"} subTitle={'From 11am to 9pm'}></SharedTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={20}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper m-2"
            >

                    {

                        desertCatalog.map(item =>
                         <SwiperSlide>
                            <img src={item.image} alt="" />
                            <p className='text-2xl uppercase mb-6 text-black bg-base-700'>{item.name}</p>
                        </SwiperSlide>)

                    }

            </Swiper>
            <div className='text-center'>
                <Link >See More</Link>
            </div>
        </section>
    );
};

export default DemoCatagory;