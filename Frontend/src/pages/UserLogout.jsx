import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserLogout() {
    const navigate = useNavigate();
    useEffect(() => {
        // Clear user session or token
        localStorage.removeItem('token');
        
        // Redirect to login page
        const navigate = useNavigate();
        navigate('/login');
    }, []);
  return (
    <div>UserLogout</div>
  )
}
 
export default UserLogout