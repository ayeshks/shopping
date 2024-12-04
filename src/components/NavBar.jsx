import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext'; // Import the context

const Navbar = () => {
  const { user, logout } = useAuth(); // Get user and logout from context
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCart(updatedCart);
  }, []);

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
      .toFixed(2);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return;
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.location.reload();
  };

  const handleLogout = () => {
    logout(); // Call the logout function from context
    window.location.reload(); // Optionally reload the page
  };

  return (
    <div className="navbar bg-primary border-b border-b-gray-200">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-white">Santa's Shop</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">{cart.length}</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-72 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">{cart.length} Items</span>
              <span className="text-info">Subtotal: ${calculateTotal()}</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View Cart</button>
              </div>
            </div>
            <div className="overflow-y-scroll max-h-72 px-4 pb-4">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-2 border-b"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-cover"
                    />
                    <div className="text-sm">
                      <p>{item.name}</p>
                      <span className="text-gray-500">Qty: </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="btn btn-xs btn-outline"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="btn btn-xs btn-outline"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="btn btn-xs btn-error ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-sm">No items in cart</p>
              )}
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex="0"
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a> {/* Logout button */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
