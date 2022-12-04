import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import DashboarLayout from "../Pages/Dashboard/DashboarLayout";
import Profile from "../Pages/Dashboard/Profile/Profile";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboarLayout /></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <Profile />
            },
            {
                path: '/dashboard/profile',
                element: <Profile />
            },
        ]
    }
])