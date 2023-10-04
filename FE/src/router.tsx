import { createBrowserRouter } from "react-router-dom";
import LayoutWebsite from "./components/pages/layout/layoutWebsites";
import LayoutAdmin from "./components/pages/layout/laypoutAdmin";
import { Navigate } from "react-router-dom";
import HomePage from "./components/pages/home/homePage";
import Dashboard from "./components/pages/admin/dashboard";
import Signin from "./features/auth/components/Signin";
import Signup from "./features/auth/components/Signup";
import List from "./features/products/components/list";
import AddProduct from "./features/products/pages/add";
import UpdateProduct from "./features/products/components/update";
import AddSize from "./features/size/pages/addSize";
import SizeList from "./features/size/components/list";
import DetailSize from "./features/size/components/detailSize";
import UpdateSize from "./features/size/pages/updateSize";
import AllSize from "./features/size/components/allSize";
import AllSizeCoppy from "./features/size/components/allSize copy";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWebsite />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
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
        element: <List />,
      },
      { path: "product/add", element: <AddProduct /> },
      { path: "product/update/:id", element: <UpdateProduct /> },
      {
        path: "size",
        element: <SizeList />,
        children: [
          { index: true, element: <AllSize /> },
          { path: ":id", element: <DetailSize /> },
        ],
      },
      { path: "size/add", element: <AddSize /> },
      { path: "size/update/:id", element: <UpdateSize /> },
    ],
  },
]);
