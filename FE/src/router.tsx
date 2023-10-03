import { createBrowserRouter } from "react-router-dom";
import LayoutWebsite from "./components/pages/layout/layoutWebsites";
import LayoutAdmin from "./components/pages/layout/laypoutAdmin";
import { Navigate } from "react-router-dom";
import HomePage from "./components/pages/home/homePage";
import Dashboard from "./components/pages/admin/dashboard";
import Signin from "./features/auth/components/Signin";
import Signup from "./features/auth/components/Signup";
import AdminProduct from "./components/pages/admin/product";
import Detail from "./components/pages/detail/Detail";
import Kids from "./components/pages/kids/kids";
import Women from "./components/pages/women/home";
import Cart from "./features/cart/cart";
import CartDetail from "./features/cart/cartDetail";
import Carts from "./components/pages/admin/cart";
import CartAdminDetail from "./components/pages/admin/cart/cartDetail";
import Men from "./components/pages/men/menPage";
import AddAdmin from "./components/pages/admin/user/addUser";
import AdminUser from "./components/pages/admin/user";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWebsite />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "menPage", element: <Men /> },
      { path: "detail", element: <Detail /> },
      { path: "kids", element: <Kids /> },
      { path: "women", element: <Women /> },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "cartDetail",
        element: <CartDetail />,
      },
    ],
  },
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
        path: "carts",
        element: <Carts />,
      },
      {
        path: "cart/user/:id",
        element: <CartAdminDetail />,
      },
      {
        path: "users",
        element: <AdminUser />,
      },
      {
        path: "add",
        element: <AddAdmin />,
      },
    ],
  },
]);
