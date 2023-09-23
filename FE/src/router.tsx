/* eslint-disable @typescript-eslint/no-unused-vars */
import {createBrowserRouter} from "react-router-dom"
import LayoutWebsite from "./components/pages/layout/layoutWebsites"
import HomePage from "./components/pages/home/homePage"
import Men from "./components/pages/home/menPage"

export const router = createBrowserRouter([
    {path: "/", element: <LayoutWebsite/>,children:[
        {index: true, element:<HomePage/>},
        {path: "menPage", element:<Men/>}
    ]},
   
])
