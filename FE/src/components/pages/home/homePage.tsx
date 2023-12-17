import Slider from "./banner";
import Banner1 from "./banner1/banner1";
import ProductList2 from "./productList2";
import Featured from "./featuredProducts";

const HomePage = () => {
  return (
    <div>
      <Slider />
      <Featured />
      <ProductList2 />
      <Banner1 />
    </div>
  );
};

export default HomePage;
