import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from '../AuthContext.jsx';  // Import the AuthProvider

// Ensure the AuthProvider is wrapping the App component
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>  {/* Wrap App with AuthProvider */}
      <App />
    </AuthProvider>
  </StrictMode>
);
