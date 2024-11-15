import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import HeroSection from './component/herosection/HeroSection.jsx';
import Signup from './component/authentication/Signup.jsx';
import Login from './component/authentication/Login.jsx';
import FindRoute from './component/findroute/FindRoute.jsx';
import AboutUs from './component/about/Aboutus.jsx';
import Dashboard from './component/dashborad/Dashboard.jsx';
import { AuthProvider } from './context/AuthContext';
import AuthLayout from './component/authentication/AuthLayout.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<HeroSection />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/about' element={<AboutUs /> } />
      <Route path='/dashboard' element={<Dashboard /> } />
      <Route path='/find-route' 
          element={<AuthLayout path={'find-route'}> 
                          <FindRoute /> 
                    </AuthLayout>} 
      />
      {/* <Route path='/dashboard' 
          element={<AuthLayout path={'/dashboard'}> 
                          <Dashboard /> 
                    </AuthLayout>} 
      /> */}
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider> {/* Wrap the router with AuthProvider */}
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
