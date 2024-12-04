import React, { useState, useEffect } from 'react';

const ProductCard = ({ id, name, price, description, image }) => {
  const [cart, setCart] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [alreadyInCart, setAlreadyInCart] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart); 
  }, []); 


  const handleAddToCart = () => {
    
    const productExists = cart.some((product) => product.id === id);
    
    if (productExists) {
      setAlreadyInCart(true);
      setTimeout(() => setAlreadyInCart(false), 2000); 
      return; 
    }

    // Add the product details to the cart
    const newProduct = { id, name, price, description, image };
    const updatedCart = [...cart, newProduct]; // Add the new product to the cart

    // Update the state and localStorage with the new cart
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to localStorage

    // Show a success message for a short period
    setAddedToCart(true);
    window.location.reload();
    setTimeout(() => setAddedToCart(false), 2000); // Hide message after 2 seconds
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="p-8 rounded-t-lg" src={image} alt={name} />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <span className="text-gray-500 text-xs font-semibold rounded">{description}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">${price}</span>

          <button
            onClick={handleAddToCart}
            className={`${
              addedToCart || alreadyInCart ? 'bg-gray-100' : 'bg-primary'
            } text-white hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            {addedToCart || alreadyInCart ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>

        {/* Show message if product is already in the cart */}
        {alreadyInCart && (
          <div className="mt-2 text-yellow-600 font-semibold text-sm">
            This product is already in your cart.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
