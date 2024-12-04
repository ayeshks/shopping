import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true);  // Add a loading state

  // Initialize user state based on localStorage when the app reloads
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const isAuth = JSON.parse(localStorage.getItem('isAuth'));

    if (isAuth) {
      setUser(storedUser);  
    }
    setLoading(false);  // After checking localStorage, set loading to false
  }, []);  // Only run once when the component is mounted

  const login = (userData) => {
    setUser(userData);  // Set the user in the state
    localStorage.setItem('user', JSON.stringify(userData));  // Save user data to localStorage
    localStorage.setItem('isAuth', JSON.stringify(true));  // Set isAuth to true
  };

  const logout = () => {
    setUser(null);  // Clear the user state
    localStorage.removeItem('user');  // Remove user data from localStorage
    localStorage.setItem('isAuth', JSON.stringify(false));  // Set isAuth to false
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
