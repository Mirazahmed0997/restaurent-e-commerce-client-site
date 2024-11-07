import React from 'react';
import SharedTitle from '../SharedTitle';
import featuredImage from '../../../assets/assets/home/featured.jpg'
import './RecommendsItems.css'

const RecommendsItems = () => {
    return (
        <div className='recommendesItems text-white pt-8 my-20'>
            <SharedTitle title='Featured Items' subTitle='Cehck It Out'></SharedTitle>
            <div className='md:flex justify-center items-center py-20 px-16'>
                <div className=''>
                    <img src={featuredImage} alt="" />
                </div>
                <div className='md:ml-10'>
                    <p>Aug 20, 2024</p>
                    <p className='uppercase'>Where can I get Some</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla eos beatae perspiciatis, unde repellendus veniam animi est nam debitis distinctio.</p>
                    <button className='btn btn-outline'>Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default RecommendsItems;