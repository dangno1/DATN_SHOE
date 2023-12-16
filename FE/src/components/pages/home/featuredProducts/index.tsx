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
    if (variant.amountSold >= 10) {
      return ({ ...variant, name: product.name, _idProduct: product._id, image: String(product.image) })
    }
  }));

  const productFeatured = variants?.sort((a, b) => Number(b?.amountSold) - Number(a?.amountSold))?.slice(0, 8)?.filter(item => item !== undefined)

  return (
    <div className=" 2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
      <div className="product">
        <div className="product__title">
          Sản phẩm nổi bật
        </div>
        <div className="product__list">
          {productFeatured?.map((product) => (
            <div key={product?._id} className="product__list--item shadow-md rounded-xl">
              <div className="product__list--img">
                <Link to={`/detail/${product?._idProduct}`} onClick={() => window.scrollTo(0, 0)}>
                  <img className="h-[250px] object-cover " src={product?.image} alt="" />
                </Link>
                {product?.discount &&
                  product?.price && (
                    <div className="product__item--sale">
                      -
                      {Math.round(
                        ((product?.price -
                          product?.discount) /
                          product?.price) *
                        100
                      )}
                      %
                    </div>
                  )}
              </div>
              <div className="px-4 my-4 h-[40px] max-h-[40px] text-sm text-back line-clamp-2 hover:underline cursor-pointer font-sans">
                {product?.name}
              </div>
              <div className="px-3 text-orange-500 font-bold">Kích cỡ: {sizeData?.find(size => size._id == product?.sizeId)?.value}, Màu: {colorData?.find(color => color._id == product?.colorId)?.value}</div>
              <div className="p-3 product__list--price text-left space-x-2 inline-block">
                <span className="product__list--initlprice">
                  {product?.discount
                    ? product?.discount.toLocaleString('vi-VN')
                    : product?.price.toLocaleString('vi-VN')} VND
                </span>
              </div>
              <div className="p-3 inline-block float-right text-sm">
                Đã bán {product?.amountSold}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default Featured;
