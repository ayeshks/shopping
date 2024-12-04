import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';  // Import your Auth context
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  const { user, loading } = useAuth();  // Access user and loading from context

  if (loading) {
    return <div>Loading...</div>;  // Display a loading state while checking auth
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Route for HomePage */}
        <Route
          path="/home"
          element={user ? <HomePage /> : <Navigate to="/login" replace />}  // Redirect to login if not authenticated
        />

        {/* Optional: Add a Not Found page for invalid routes */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
