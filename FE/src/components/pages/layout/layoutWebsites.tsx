import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../home/header";
import Footer from "../home/footer";



const LayoutWebsite = () => {
    return (
        <div>
            {/* LayoutWebsite */}
            <Header/>
            <Outlet />
            <Footer/>
        </div>
    );
};

export default LayoutWebsite;