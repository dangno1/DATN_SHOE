import Slider from "./banner";
import Social from "./socialProducts/index";
import Banner1 from "./banner1/banner1";
import ProductList2 from "./productList2";
import Blog from "./Blog/index";
import Featured from "./featuredProducts";

const HomePage = () => {
  return (
    <div>
      <Slider />
      <Featured />
      <Social />
      <ProductList2 />
      <Banner1 />
      <Blog />
    </div>
  );
};

export default HomePage;
