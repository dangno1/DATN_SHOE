import { Link, useParams } from "react-router-dom";
import Slider from "../banner";
import { useGetCategoryQuery } from "@/api/category";
import { IProduct } from "@/interface/product";

const LayoutTest = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useGetCategoryQuery(id || "");

  const priceMin = (variants: IProduct["variants"][0][]) => {
    return Math.min(
      ...[
        ...new Set(
          variants.flatMap((variants: IProduct["variants"][0]) => {
            if (variants.discount) {
              return variants.discount;
            } else return variants.price;
          })
        ),
      ]
    );
  };
  const priceMax = (variants: IProduct["variants"][0][]) => {
    return Math.max(
      ...[
        ...new Set(
          variants.flatMap((variants: IProduct["variants"][0]) => {
            if (variants.discount) {
              return variants.discount;
            } else return variants.price;
          })
        ),
      ]
    );
  };

  return (
    <div>
      <Slider />
      <div className="relative my-[20px] w-full h-[43px] text-[26px] font-semibold uppercase text-center before:content-[''] before:w-[100px] before:h-[3px] before:bg-[#51adcd] before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%]">
        {data?.name}
      </div>
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {data?.products?.length === 0 ? (
          <p className="w-full text-center text-[20px] font-semibold text-gray-600 col-span-4 uppercase">
            Không có sản phẩm nào
          </p>
        ) : (
          data?.products?.map((product: IProduct) => (
            <div
              key={product._id}
              className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
            >
              <Link to={`/detail/${product._id}`}>
                <img
                  src={String(product?.image)}
                  alt="Product"
                  className="h-80 w-72 object-cover rounded-t-xl"
                />
                <div className="px-4 py-3 w-72">
                  <p className="text-lg font-bold text-black truncate block hover:underline uppercase">
                    {product?.name}
                  </p>
                  <div className="flex items-center">
                    {
                      <p className="text-lg font-semibold cursor-auto my-3 text-red-500">
                        {priceMin(product?.variants).toLocaleString("vi-VN")}{" "}
                        VND
                      </p>
                    }
                    {priceMax(product?.variants) >
                      priceMin(product?.variants) && (
                      <del>
                        <p className="text-sm text-gray-600 cursor-auto ml-2">
                          {priceMax(product?.variants).toLocaleString("vi-VN")}{" "}
                          VND
                        </p>
                      </del>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default LayoutTest;
