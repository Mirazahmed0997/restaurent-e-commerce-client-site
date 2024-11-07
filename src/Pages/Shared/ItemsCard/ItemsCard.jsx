import React from 'react';
import { Link } from 'react-router-dom';

const ItemsCard = ({ item }) => {
    const { image, name, price, recipe } = item
    return (
        <section>
            <div className="max-w-xs p-6 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900">
                <img src={image} alt="" className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                <div className="mt-6 mb-2">
                    <h2 className="text-xl font-semibold tracking-wide">{name}</h2>

                    <span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-600">Recipe</span>
                </div>
                <p className="dark:text-gray-800">{recipe.slice(0,60)}...</p>
            </div>
          
        </section>
    );
};

export default ItemsCard;