import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import Categories from "../Pages/Dashboard/Categories/Categories";
import DashboarLayout from "../Pages/Dashboard/DashboarLayout";
import Products from "../Pages/Dashboard/Products/Products";
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
                element: <AddProduct />
            },
            {
                path: '/dashboard/profile',
                element: <Profile />
            },
            {
                path: '/dashboard/categories',
                element: <Categories />
            },
            {
                path: '/dashboard/products',
                element: <Products />
            },
            {
                path: '/dashboard/addProduct',
                element: <AddProduct />
            },
        ]
    }
])