import { useGetProductsQuery } from "@/api/product";
import { IProduct } from "@/interface/product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./featuredProducts/style.css"

const ProductList2 = () => {
  const { data } = useGetProductsQuery(false);

  const [alex, setAlex] = useState<IProduct[]>([]);
  useEffect(() => {
    if (data) {
      const productRandom = [];
      const dataCopy = [...data];
      for (let index = 0; index < 8 && dataCopy.length > 0; index++) {
        const indexRandom = Math.floor(Math.random() * dataCopy.length);
        const randomProduct = dataCopy.splice(indexRandom, 1)[0];
        productRandom.push(randomProduct);
      }
      setAlex(productRandom);
    }
  }, [data]);

  return (
    <>
      <div className="text-center p-10">
        <h1 className=" product__title">
          Các sản phẩm khác của Website
        </h1>
      </div>
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-14"
      >
        {alex?.map((product: IProduct) => (
          <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" key={product._id}>
            <Link to={`/detail/${product._id}`}>
              <img
                src={String(product?.image)}
                alt="Product"
                className="h-80 w-72 object-cover rounded-t-xl"
              />
              <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">
                  {product?.brandId}
                </span>
                <p className="text-lg font-bold text-black truncate block capitalize hover:underline">
                  {product?.name}
                </p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold cursor-auto my-3 text-red-500">
                    {product?.variants[0].discount?.toLocaleString('vi-VN')} VND
                  </p>
                  <del>
                    <p className="text-sm text-gray-600 cursor-auto ml-2">
                      {product?.variants[0].price.toLocaleString('vi-VN')} VND
                    </p>
                  </del>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default ProductList2;
