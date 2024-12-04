import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProducCard';

const CardSection = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the JSON file
  useEffect(() => {
    axios.get('/src/data/products.json') // Adjust path if needed
      .then((response) => {
        setProducts(response.data);  
      })
      .catch((error) => {
        console.error("Error fetching products: ", error);
      });
  }, []);

  return (
    <section className="sm:h-[80vh] overflow-y-auto py-5 lg:py-10 grid gap-4 sm:grid-cols-3 justify-center items-center sm:ml-14">
      <h1 className="text-black uppercase text-center sm:text-5xl text-3xl font-bold pb-6">
        Explore Products
      </h1>
      {products.map((product) => (
        <ProductCard
          key={product.id}  // Pass unique key
          id={product.id}   // Pass product id to ProductCard
          name={product.name}
          price={product.price}
          description={product.description}
          image={product.image}
        />
      ))}
    </section>
  );
};

export default CardSection;
