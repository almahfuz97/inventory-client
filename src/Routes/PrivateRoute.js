import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Components/Spinner/Spinner';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';

export default function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) return <Spinner />
    if (!user?.uid) return <Navigate to='/login' state={{ from: location }} replace ></Navigate >
    return children;
}