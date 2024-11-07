import React from 'react';
import bgImg from '../../../assets/assets/home/slide2.jpg'


const DemoArticle = () => {
    return (
        <div
        className="hero h-96 p-6 my-6 bg-red-700 bg-opacity-50"
        style={{
          backgroundImage: `url('${bgImg}')`,
        }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md bg-white p-6 text-black bg-opacity-60">
            <h1 className="mb-5 text-5xl font-bold">Restaurent</h1>
            <p className="mb-5 ">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            {/* <button className="btn btn-primary">Get Started</button> */}
          </div>
        </div>
      </div>
    );
};

export default DemoArticle;