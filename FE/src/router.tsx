import { createBrowserRouter } from "react-router-dom";
import LayoutWebsite from "./components/pages/layout/layoutWebsites";
import LayoutAdmin from "./components/pages/layout/laypoutAdmin";
import HomePage from "./components/pages/home/homePage";
import Signin from "./features/auth/components/Signin";
import Signup from "./features/auth/components/Signup";
import AddProduct from "./features/products/pages/addProduct";
import UpdateProduct from "./features/products/pages/updateProduct";
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
import ListCoupons from "./features/coupons/components/list";
import Products from "./components/pages/home/prouducts";
import ListProduct from "./features/products/components/list";
import SaleProduct from "./components/pages/home/saleProduct";
import ForgotPassword from "./features/auth/components/ForgotPassword";
import DetailProduct from "./features/products/pages/detailProduct";
import Test001 from "./components/pages/admin/order/test001";
import CommentAdmin from "./features/comment/components/list";
import Statistical from "./features/statistical/statistical";
import Test002 from "./features/statistical/statisticalDetail";
import LayoutTest from "./components/pages/home/layoutUndefine/layoutTest";
import ListBrand from "./features/brand/components/list";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWebsite />,
    children: [
      { path: "/:categoryName/:id", element: <LayoutTest /> },
      { index: true, element: <HomePage /> },
      { path: "detail/:id", element: <Detail /> },
      { path: "Men/:id", element: <Men /> },
      { path: "Kids/:id", element: <Kids /> },
      { path: "Women/:id", element: <Women /> },
      { path: "products", element: <Products /> },
      { path: "sale", element: <SaleProduct /> },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "cartDetail",
        element: <CartDetail />,
      },
      {
        path: "cartDetail/:id",
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
    path: "signin",
    element: <Signin />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        path: "product",
        element: <ListProduct />,
      },
      { path: "product/add", element: <AddProduct /> },
      { path: "product/update/:id", element: <UpdateProduct /> },
      { path: "product/detail/:id", element: <DetailProduct /> },
      {
        path: "product/trashCan",
        element: <ListProduct />,
      },
      {
        path: "categoryes",
        element: <ListCategory />,
      },
      {
        path: "brand",
        element: <ListBrand />,
      },
      {
        path: "size",
        element: <ListSize />,
      },
      {
        path: "color",
        element: <ListColor />,
      },
      {
        path: "coupons",
        element: <ListCoupons />,
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
        path: "orders",
        element: <AdminOrder />,
      },
      {
        path: "orders/detail/:id",
        element: <Test001 />,
      },
      {
        path: "users",
        element: <AdminUser />,
      },
      {
        path: "statistical",
        element: <Statistical />,
      },
      {
        path: "statistical/detail/:id",
        element: <Test002 />,
      },
      {
        path: "add",
        element: <AddAdmin />,
      },
      {
        path: "comment",
        element: <CommentAdmin />
      }

    ],
  },
]);
