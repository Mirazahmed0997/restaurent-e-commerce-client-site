import React from 'react';
import AllItemsCard from '../../Shared/AllItemsCard/AllItemsCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


const OrderTab = ({ items }) => {

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };


    return (
            <>
                <Swiper
                    pagination={pagination}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div  className='grid md:grid-cols-3 gap-10'>
                            {
                                items.map(item => <AllItemsCard key={item._id} item={item}></AllItemsCard>)
                            }
                        </div>
                    </SwiperSlide>

                </Swiper>
            </>
    );
};

export default OrderTab;