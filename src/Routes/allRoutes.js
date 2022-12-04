import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Authentication/Login";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    }
])