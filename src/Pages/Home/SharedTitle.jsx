import React from 'react';

const SharedTitle = ({title, subTitle}) => {
    return (
        <div className='text-center my-6'>
            <p className='text-yellow-600'>---{subTitle}---</p>
            <p className='uppercase border-y-4 p-6 text-3xl'>{title}</p>
        </div>
    );
};

export default SharedTitle;