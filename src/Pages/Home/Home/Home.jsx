import React from 'react';
import Banner from '../Banner/Banner';
import DemoCatagory from '../DemoCatagory/DemoCatagory';
import DemoArticle from '../DemoArticle/DemoArticle';
import DemoMenu from '../DemoMenu/DemoMenu';
import RecommendsItems from '../RecommendsItem/RecommendsItems';
import { Helmet } from 'react-helmet-async';
import Reviews from '../Reviews/Reviews';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Restaurent</title>
            </Helmet>
            <Banner></Banner>
            <DemoCatagory></DemoCatagory>
            <DemoArticle></DemoArticle>
            <DemoMenu></DemoMenu>
            <RecommendsItems></RecommendsItems>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;