import { useState } from "react";
import "./App.css";
import Footer from "./component/footer/Footer";
import Navbar from "./component/header/Navbar";
import { Outlet } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import 'leaflet/dist/leaflet.css';

function App() {
  const [count, setCount] = useState(0);
  const { authToken, setAuthToken } = useContext(AuthContext);
  console.log(authToken)

  const handleLogout = async () => {
    localStorage.removeItem('authToken');
    try {
      // Make a request to the server to log out
      const response = await fetch('http://127.0.0.1:8000/api/logout/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      // Check for a successful response
      if (response.ok) {
        // Remove the token from localStorage and reset state
        localStorage.removeItem('authToken');
        setAuthToken('');
        console.log('Logged out successfully');
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  return (
    <>
      <Navbar handleLogout={handleLogout} authToken={authToken} />
      <main>
        <Outlet setAuthToken={setAuthToken} />
      </main>
      <Footer />
    </>
  );
}

export default App;
