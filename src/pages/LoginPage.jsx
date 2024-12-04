import React from 'react';
import 'primeicons/primeicons.css'
import bg from '../assets/bg.jpg'
import Login from '../components/Login';


const LoginPage = () => {
  return (
    <>    
<section className='h-screen bg-cover bg-center ' style={{ backgroundImage: `url(${bg})` }} >

  <h1 className="sm:text-5xl text-4xl text-center font-serif font-bold text-primary sm:pt-8 pt-10">
    Santa's Shop
  </h1>
 <div className="regiser-form flex justify-center items-center">
 <Login/>
</div>
</section>

    </>
       
  );
};

export default LoginPage;