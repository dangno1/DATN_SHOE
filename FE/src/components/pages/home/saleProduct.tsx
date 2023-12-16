import { useGetProductsQuery } from "@/api/product";
import Slider from "./banner";
import "./featuredProducts/style.css"
import { useGetSizesQuery } from "@/api/size";
import { useGetColorsQuery } from "@/api/color";
import { Link } from "react-router-dom";

const SaleProduct = () => {
  const { data } = useGetProductsQuery(false);
  const { data: sizeData } = useGetSizesQuery();
  const { data: colorData } = useGetColorsQuery();

  const variants = data?.flatMap((product) => product.variants.map(variant => {
    if (variant.discount > 0) {
      return ({ ...variant, name: product.name, _idProduct: product._id, image: String(product.image) })
    }
  }));

  const productSele = variants?.sort((a, b) => Number(a?.discount) - Number(b?.discount))?.filter(item => item !== undefined)
  return (
    <>
      <Slider />
      <div className=" 2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
        <div className="flex items-center justify-center">
          <div className="text-center gap-12">
            <h2 className=" text-gray-800 lg:text-3xl uppercase">
              <span className="border-b-2 border-cyan-500 ">Sản phẩm sale</span>
            </h2>
          </div>
        </div>
      </div>
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {productSele?.map((product) => (
          <div key={product?._id} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl relative">
            <Link to={`/detail/${product?._idProduct}`}>
              <img
                src={product?.image}
                alt="Product"
                className="h-80 w-72 object-cover rounded-t-xl"
              />
              {product?.discount &&
                product?.price && (
                  <div className="absolute top-0 right-0 bg-red-600 text-white rounded-bl-lg py-1 px-2   ">
                    -
                    {Math.floor(
                      ((product?.price -
                        product?.discount) /
                        product?.price) *
                      100
                    )}
                    %
                  </div>
                )}
              <div className="px-4 py-3 w-72">
                <div className="px-4 my-4 h-[40px] max-h-[40px] text-sm text-back line-clamp-2 hover:underline cursor-pointer font-sans">
                  {product?.name}
                </div>
                <div className="px-3 text-orange-500 font-bold">Kích cỡ: {sizeData?.find(size => size._id == product?.sizeId)?.value}, Màu: {colorData?.find(color => color._id == product?.colorId)?.value}</div>
                <div className="p-3 product__list--price text-left space-x-2 inline-block">
                  <span className="product__list--initlprice">
                    {product?.discount.toLocaleString('vi-VN')} VND
                  </span>
                  <span className="text-base text-slate-500 line-through">
                    {product?.price.toLocaleString('vi-VN')} VND
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default SaleProduct;
