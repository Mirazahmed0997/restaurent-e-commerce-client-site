import React from 'react';
import { Helmet } from 'react-helmet-async';
import menuImg from '../../assets/assets/menu/banner3.jpg'
import Cover from '../Shared/Cover/Cover';
import ItemsCard from '../Shared/ItemsCard/ItemsCard';
import dessertImg from '../../assets/assets/menu/dessert-bg.jpeg';
import saladImg from '../../assets/assets/menu/salad-bg.jpg';
import soupImg from '../../assets/assets/menu/soup-bg.jpg';
import DemoMenu from '../Home/DemoMenu/DemoMenu';
import SharedTitle from '../Home/SharedTitle';
import useMenu from '../../Hooks/UseMenu/UseMenu';
import MenuCatagories from './MenuCatagories/MenuCatagories';


const Menu = () => {

    const [menu] = useMenu();
    const deserts= menu.filter(item => item.category === 'dessert')
    const offered= menu.filter(item => item.category === 'offered')
    const pizza= menu.filter(item => item.category === 'pizza')
    const salad= menu.filter(item => item.category === 'salad')
    const soup= menu.filter(item => item.category === 'soup')

    return (
        <div>
            <Helmet>
                <title>Restaurent | Menu</title>
            </Helmet>
            <Cover img={menuImg} coverTitle='our menu'></Cover>

            <SharedTitle subTitle="Don't Miss" title="Todays offer" ></SharedTitle>
            <MenuCatagories items={offered}></MenuCatagories>

            
            <SharedTitle subTitle="To Fill The Meal" title="Desserts" ></SharedTitle>
            <MenuCatagories title="Dessert" coverIMG={dessertImg} items={deserts}></MenuCatagories>

            <SharedTitle subTitle="Have Fun With" title="Pizza" ></SharedTitle>
            <MenuCatagories title="Pizza" coverIMG={dessertImg} items={pizza}></MenuCatagories>


            <SharedTitle subTitle="To Begins with" title="Soup" ></SharedTitle>
            <MenuCatagories title="Soup" coverIMG={soupImg} items={soup}></MenuCatagories>


            <SharedTitle subTitle="Less Collestorel" title="Salad" ></SharedTitle>
            <MenuCatagories title="Salad" coverIMG={saladImg} items={salad}></MenuCatagories>


           
        </div>
    );
};

export default Menu;