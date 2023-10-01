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
import ColorList from "./features/color/components/list";
import AllColor from "./features/color/components/allColor";
import DetailColor from "./features/color/components/detailColor";
import UpdateColor from "./features/color/pages/updateColor";
import AllSize from "./features/size/components/allSize";
import AddColor from "./features/color/pages/addColor";

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
      {
        path: "color",
        element: <ColorList />,
        children: [
          { index: true, element: <AllColor /> },
          { path: ":id", element: <DetailColor /> },
        ],
      },
      { path: "color/add", element: <AddColor /> },
      { path: "color/update/:id", element: <UpdateColor /> },
    ],
  },
]);
