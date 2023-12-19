import { useGetProductsQuery } from "@/api/product";
import { Link } from "react-router-dom";
import "./style.css"
import { useGetSizesQuery } from "@/api/size";
import { useGetColorsQuery } from "@/api/color";

const Featured = () => {
  const { data } = useGetProductsQuery(false);
  const { data: sizeData } = useGetSizesQuery();
  const { data: colorData } = useGetColorsQuery();

  const variants = data?.flatMap((product) => product.variants.map(variant => {
    if (variant.amountSold >= 4) {
      return ({ ...variant, name: product.name, _idProduct: product._id, image: String(product.image) })
    }
  }));

  const productFeatured = variants?.sort((a, b) => Number(b?.amountSold) - Number(a?.amountSold))?.slice(0, 4)?.filter(item => item !== undefined)

  return (
    <div className=" 2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
      <div className="product">
        <div className="product__title">
          Sản phẩm nổi bật
        </div>
        <div className="product__list">
          {productFeatured?.map((product) => (
            <Link key={product?._id} to={`/detail/${product?._idProduct}`} onClick={() => window.scrollTo(0, 0)}>
              <div className="product__list--item shadow-md rounded-xl duration-500 hover:scale-105">
                <div className="product__list--img">
                  <img className="h-[250px] w-full object-cover " src={product?.image} alt="" />
                  {product?.discount &&
                    product?.price && (
                      <div className="product__item--sale">
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
                </div>
                <div className="text-lg font-bold text-black truncate block capitalize hover:underline pl-2 pt-5 pb-5">
                  {product?.name}
                </div>
                {/* <div className="px-3 text-orange-500 font-bold">Kích cỡ: {sizeData?.find(size => size._id == product?.sizeId)?.value}, Màu: {colorData?.find(color => color._id == product?.colorId)?.value}</div> */}
                <div className="p-3 product__list--price text-left space-x-2 inline-block">
                  <span className="product__list--initlprice text-lg font-semibold cursor-auto my-3 text-red-500">
                    {product?.discount
                      ? product?.discount.toLocaleString('vi-VN')
                      : product?.price.toLocaleString('vi-VN')} VND
                  </span>
                </div>
                <div className="p-3 inline-block float-right text-sm">
                  Đã bán {product?.amountSold}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div >
  );
};

export default Featured;
