import Slider from "./banner";
import ProductList from "./productList";
import Social from "./social";
import Seller from "./sellers";
import Banner1 from "./banner1";
import ProductList2 from "./productList2";
import Blog from "./blog";

const HomePage = () => {
  return (
    <div>
      <Slider />
      <Seller />
      <ProductList />
      <Banner1 />
      <ProductList2 />
      <Social />
      <Blog />
      {/* <Footer/> */}
    </div>
  );
};

export default HomePage;
