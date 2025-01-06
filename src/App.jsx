import './App.css';
import MainContent from './layout/MainContent';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './Login';

import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';


const token = localStorage.idToken;


const ProtectedRoute = ({ isAuthUser, children }) => {
  if (!token && !isAuthUser) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};


const PublicRoute = ({ isAuthUser, children }) => {

  if (isAuthUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isAuthenticated} = useSelector(({auth}) => auth)
  const dispatch = useDispatch();

  useEffect(() => {
    if(token) {
      console.log(token, 'TOKEN')
    }
  
  }, [token])




  return (
    <>
    <div className="App">
       <Routes>
              <Route path="/" element={<ProtectedRoute isAuthUser={isAuthenticated}>
              <MainContent/>          
                </ProtectedRoute>}  />
              <Route path="/signin" element={<PublicRoute isAuthUser={isAuthenticated}>
                    <Login/>              
                </PublicRoute>} />
             </Routes>
    </div>
    </>
  )
}

export default App
