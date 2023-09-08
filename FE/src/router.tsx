import {createBrowserRouter} from "react-router-dom"
import LayoutWebsite from "./components/pages/layout/layoutWebsites"
import LayoutAdmin from "./components/pages/layout/laypoutAdmin"
import { Navigate } from "react-router-dom"
import HomePage from "./components/pages/home/homePage"
import Dashboard from "./components/pages/admin/dashboard"
import Signin from "./features/auth/components/Signin"
import Signup from "./features/auth/components/Signup"
import AdminProduct from "./components/pages/admin/product"
import User from "./components/pages/admin/User"
import Statistical from "./components/pages/admin/statistical"
import Oder from "./components/pages/admin/order"



export const router = createBrowserRouter([
    {path: "/", element: <LayoutWebsite/>,children:[
        {index: true, element:<HomePage/>},
        {
            path: "signin",
            element: <Signin />,
        },
        {
            path: "signup",
            element: <Signup />,
        },
    ]},
    {
        path: "/admin",
        element: <LayoutAdmin />,
        children: [
            { index: true, element: <Navigate to="dashboard" /> },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "product",
                element: <AdminProduct />,
            },
            {
                path: "user",
                element: <User />,
            },
            {
                path: "statistical",
                element: <Statistical />,
            },
      
            {
                path: "oder",
                element: <Oder />,
            },
           
        ],
    },
   
]);
