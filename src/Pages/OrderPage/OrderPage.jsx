import React, { useState } from 'react';
import coverIMG from '../../assets/assets/shop/banner2.jpg'
import Cover from '../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../Hooks/UseMenu/UseMenu';
import AllItemsCard from '../Shared/AllItemsCard/AllItemsCard';
import OrderTab from './OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const OrderPage = () => {
    const categories = ['Salad','Soup','Pizza','Dessert','Drinks','Offered']
    const {category}=useParams();
    console.log(category)
    const initialIndex= categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex)
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert')
    const offered = menu.filter(item => item.category === 'offered')
    const pizza = menu.filter(item => item.category === 'pizza')
    const salad = menu.filter(item => item.category === 'salad')
    const soup = menu.filter(item => item.category === 'soup')
    const drinks = menu.filter(item => item.category === 'drinks')
    return (
        <div>
            <Helmet>
                <title>Restaurent | Order Food</title>
            </Helmet>
            <Cover img={coverIMG} coverTitle="Order Nolw"></Cover>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                    <Tab>All</Tab>
                </TabList>
                <TabPanel>
                   <OrderTab items={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={desserts}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drinks}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={menu}></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default OrderPage;