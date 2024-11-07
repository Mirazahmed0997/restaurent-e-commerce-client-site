import React from 'react';
import ItemsCard from '../../Shared/ItemsCard/ItemsCard';
import Cover from '../../Shared/Cover/Cover';
import { Link } from 'react-router-dom';

const MenuCatagories = ({ items, title, coverIMG }) => {
    return (
        <div className='pt-8'>
            {title && <Cover img={coverIMG} coverTitle={title}></Cover>}
            <div className='grid  md:grid-cols-4 sm:grid-cols-2 my-16'>
                {
                    items.slice(0,4).map(item =>

                        <ItemsCard key={item._id} item={item}>
                        </ItemsCard>)
                }
            </div>
            <Link to={`/order/${title}`}>
                <button className='btn btn-outline'>Order Now</button>
            </Link>
        </div>
    );
};

export default MenuCatagories;