import Slider from "./banner";
// import ProductList from "./productList";
import Social from "./social products/index";
// import Seller from "./sellers";
import Banner1 from "./banner1/banner1";
import ProductList2 from "./productList2";
import Blog from "./Blog/index";
import Seller from "./outstanding products";

const HomePage = () => {
  return (
    <div>
      <Slider />
      <Seller />
      <Social/>
      {/* <ProductList /> */}
      <ProductList2 />
      <Banner1 />
      {/* <Social /> */}
      <Blog />
    </div>
  );
};

export default HomePage;
