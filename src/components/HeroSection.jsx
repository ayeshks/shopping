import React from 'react'; 
import hero  from '../assets/hero1.jpg'


const HeroSection = () => {
  
    return (
<section className="px-3 py-5 bg-primary lg:py-10"> 
    <div className="grid lg:grid-cols-2 items-center justify-items-center gap-5">
        <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
            <p className="text-4xl font-bold md:text-7xl text-white">25% OFF</p>
            <p className="text-4xl font-bold md:text-7xl uppercase">Christmas Sales</p>
            <p className="mt-2 text-sm md:text-lg">For limited time only!</p>
            <button className="text-lg md:text-2xl bg-black text-white py-2 px-5 mt-10 hover:bg-zinc-800 rounded-lg">Shop Now</button>
        </div>
        <div className="order-1 lg:order-2">
            <img className="h-80 w-80 object-cover lg:w-[500px] lg:h-[500px] rounded-lg border" src={hero} alt=""/>
        </div>
    </div>
      </section>
    );
  };
  
  export default HeroSection;
