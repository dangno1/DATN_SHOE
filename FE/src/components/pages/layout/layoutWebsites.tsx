import { Outlet } from "react-router-dom";
import Header from "../home/header/header";
import Footer from "../home/footer";


const LayoutWebsite = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutWebsite;
