import React, { useState } from 'react';
import coverIMG from '../../assets/assets/shop/banner2.jpg';
import Cover from '../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../Hooks/UseMenu/UseMenu';
import OrderTab from './OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const OrderPage = () => {
    const categories = ['Salad', 'Soup', 'Pizza', 'Dessert', 'Drinks', 'All'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category) !== -1 ? categories.indexOf(category) : 0;

    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu, loading] = useMenu();
    const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

    const filterByCategory = (category) => {
        if (category === 'All') {
            return menu;
        }
        return menu.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    };

    const filterBySearch = (items) => {
        if (!searchTerm.trim()) {
            return items; // Return unfiltered items if searchTerm is empty
        }
        return items.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value); // Update searchTerm dynamically
    };

    const renderTabPanel = (category) => {
        const filteredItems = filterBySearch(filterByCategory(category));
        return <OrderTab items={filteredItems}></OrderTab>;
    };

    return (
        <div>
            <Helmet>
                <title>Restaurant | Order Food</title>
            </Helmet>
            <Cover img={coverIMG} coverTitle="Order Now"></Cover>

            {/* Search Bar */}
            <div className="search-bar text-center my-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search for items..."
                    className="border p-2 rounded w-1/2"
                />
            </div>

            {/* Tabs */}
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                    <Tab>All</Tab>
                </TabList>
                <TabPanel>{renderTabPanel('Salad')}</TabPanel>
                <TabPanel>{renderTabPanel('Soup')}</TabPanel>
                <TabPanel>{renderTabPanel('Pizza')}</TabPanel>
                <TabPanel>{renderTabPanel('Dessert')}</TabPanel>
                <TabPanel>{renderTabPanel('Drinks')}</TabPanel>
                <TabPanel>{renderTabPanel('All')}</TabPanel>
            </Tabs>
        </div>
    );
};

export default OrderPage;
