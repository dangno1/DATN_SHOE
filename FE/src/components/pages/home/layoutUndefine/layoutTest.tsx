import { Link, Outlet, useParams } from "react-router-dom";
// import Header from "../header/header";
// import Footer from "../footer";
import Slider from "../banner";
import { useGetCategoryQuery } from "@/api/category";
import { IProduct } from "@/interface/product";
// import BannerUndifine from "./banner";
import Blog from "../Blog/index";

const LayoutTest = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const { data } = useGetCategoryQuery(id || "");
  console.log(data);
  return (
    <div>
      {/* <Header /> */}
      <Outlet />
      <Slider/>
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {data?.products.length === 0 ? (
          <p className="text-center  text-xl font-bold text-gray-600">
            Không có sản phẩm nào
          </p>
        ) : (
          data?.products.map((product: IProduct) => (
            <div
              key={product._id}
              className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
            >
              <Link to={`/detail/${product._id}`}>
                <img
                  src={product?.image}
                  alt="Product"
                  className="h-80 w-72 object-cover rounded-t-xl"
                />
                <div className="px-4 py-3 w-72">
                  <span className="text-gray-400 mr-3 uppercase text-xs">
                    {product?.brand}
                  </span>
                  <p className="text-lg font-bold text-black truncate block hover:underline uppercase">
                    {product?.name}
                  </p>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold cursor-auto my-3 text-red-500">
                      {product?.variants[0].discount.toLocaleString("vi-VN")}{" "}
                      VND
                    </p>
                    <del>
                      <p className="text-sm text-gray-600 cursor-auto ml-2">
                        {product?.variants[0].price.toLocaleString("vi-VN")} VND
                      </p>
                    </del>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </section>
      <Blog/>
    </div>
  );
};

export default LayoutTest;
