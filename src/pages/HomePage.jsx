import React from 'react';
import Navbar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import CardSection from '../components/CardSection';
import Gallery from '../components/Gallery';
import FooterSection from '../components/FooterSection';

const HomePage = () => {
  return (
    <main>
       <Navbar/>
       <HeroSection/>
       <CardSection/>
       <Gallery/>
       <FooterSection/>
    </main>
   
  );
};

export default HomePage;
