import React, { useEffect, useState } from 'react';
import SharedTitle from '../SharedTitle';
import ItemsCard from '../../Shared/ItemsCard/ItemsCard';
import { Link } from 'react-router-dom';
import useMenu from '../../../Hooks/UseMenu/UseMenu';

const DemoMenu = () => {

    const [menu] = useMenu();
    const popularItems= menu.filter(item => item.category === 'popular')




    return (
        <div className='my-6'>
            <SharedTitle title='From Our Menu' subTitle='Popular Items'></SharedTitle>
            <div className='grid  md:grid-cols-4 sm:grid-cols-2 '>
                {
                    popularItems.map(item => <ItemsCard key={item._id} item={item}></ItemsCard>)
                }
            </div>
            <div className='text-center p-6'>
                <Link >See All Menu</Link>
            </div>
        </div>
    );
};

export default DemoMenu;