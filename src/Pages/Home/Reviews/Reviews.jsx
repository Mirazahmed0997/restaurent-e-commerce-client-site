import React from 'react';
import useReviews from '../../../Hooks/UseReviews/useReviews';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const Reviews = () => {
    const [reviews] = useReviews()
    return (
        <div>

            <section className="my-8">
                <div className="container mx-auto flex flex-col items-center pb-6 mb-4 md:p-10 md:px-12">
                    <h1 className="text-4xl font-semibold leading-none text-center">What our customers are saying about us</h1>
                </div>
             <Swiper slidesPerView={4}
                spaceBetween={20}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper m-2">
             {
                    reviews.map(review =>
                        <SwiperSlide className="container mx-auto grid grid-cols-1 gap-8 lg:gap-20 md:px-10 md:pb-10 lg:grid-cols-2">
                            <div className="flex flex-col items-center mx-12 lg:mx-0">
                                <div className="relative text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute top-0 left-0 w-8 h-8 dark:text-gray-300">
                                        <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                        <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                                    </svg>
                                    <p className="px-6 py-1 my-6 text-lg italic">{review.details}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute bottom-0 right-0 w-8 h-8 dark:text-gray-300">
                                        <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                        <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                                    </svg>
                                </div>
                                <span className="w-12 h-1 my-2 rounded-lg dark:bg-violet-600"></span>
                                <p>{review.name}</p>
                                <p>Raing : {review.rating}</p>
                            </div>

                        </SwiperSlide>
                    )
                }
             </Swiper>
            </section>
        </div>
    );
};

export default Reviews;