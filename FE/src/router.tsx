import { createBrowserRouter } from "react-router-dom";
import LayoutWebsite from "./components/pages/layout/layoutWebsites";
import LayoutAdmin from "./components/pages/layout/laypoutAdmin";
import { Navigate } from "react-router-dom";
import HomePage from "./components/pages/home/homePage";
import Dashboard from "./components/pages/admin/dashboard";
import Signin from "./features/auth/components/Signin";
import Signup from "./features/auth/components/Signup";
import AddProduct from "./features/products/pages/addProduct";
import UpdateProduct from "./features/products/pages/updateProduct";
import AddSize from "./features/size/pages/addSize";
import UpdateSize from "./features/size/pages/updateSize";
import UpdateColor from "./features/color/pages/updateColor";
import AddColor from "./features/color/pages/addColor";
import Detail from "./components/pages/detail/Detail";
import Kids from "./components/pages/kids/kids";
import Women from "./components/pages/women/home";
import Cart from "./features/cart/cart";
import CartDetail from "./features/cart/cartDetail";
import Carts from "./components/pages/admin/cart";
import CartAdminDetail from "./components/pages/admin/cart/cartDetail";
import AdminOrder from "./components/pages/admin/order/index";
import Men from "./components/pages/men/menPage";
import AddAdmin from "./components/pages/admin/user/addUser";
import AdminUser from "./components/pages/admin/user";
import OderHistory from "./components/pages/oderHistory/oderHistory";
import UserPage from "./components/pages/userinformation/userPage";
import ListSize from "./features/size/components/list";
import ListColor from "./features/color/components/list";
import ListCategory from "./features/category/components/list";
import AddCategory from "./features/category/pages/addCategory";
import UpdateCategory from "./features/category/pages/updateCategory";
import AddCoupons from "./features/coupons/pages/addCoupons";
import UpdateCoupons from "./features/coupons/pages/updateCoupons";
import ListCoupons from "./features/coupons/components/list";
import ListProduct from "./features/products/components/list";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWebsite />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "menPage", element: <Men /> },
      { path: "detail/:id", element: <Detail /> },
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
      {
        path: "oder&history",
        element: <OderHistory />,
      },
      { path: "user", element: <UserPage /> },
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
        element: <ListProduct />,
      },
      { path: "product/add", element: <AddProduct /> },
      { path: "product/update/:id", element: <UpdateProduct /> },
      {
        path: "categoryes",
        element: <ListCategory />,
      },
      { path: "categoryes/add", element: <AddCategory /> },
      { path: "categoryes/update/:id", element: <UpdateCategory /> },
      {
        path: "size",
        element: <ListSize />,
      },
      {
        path: "size/add",
        element: <AddSize />,
      },
      { path: "size/update/:id", element: <UpdateSize /> },
      {
        path: "color",
        element: <ListColor />,
      },
      { path: "color/add", element: <AddColor /> },
      { path: "color/update/:id", element: <UpdateColor /> },
      {
        path: "coupons",
        element: <ListCoupons />,
      },
      { path: "coupons/add", element: <AddCoupons /> },
      { path: "coupons/update/:id", element: <UpdateCoupons /> },

      {
        path: "carts",
        element: <Carts />,
      },
      {
        path: "cart/user/:id",
        element: <CartAdminDetail />,
      },
      {
        path: "orders",
        element: <AdminOrder />,
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
