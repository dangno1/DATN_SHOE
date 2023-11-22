import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "@/api/product";
import { IProduct } from "@/interface/product";
import { BsBagPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
const Similarproduct = () => {
  const { data } = useGetProductsQuery<{ data: IProduct[] }>(false);
  console.log(data);
  // const [showTrashCan, setShowTrashCan] = useState(false)
  // const { data: dataProduct } = useGetProductsQuery(showTrashCan);
  // console.log(dataProduct);

  const [Similar, setSimilar] = useState<IProduct[]>([]);
  useEffect(() => {
    if (data) {
      const productRandom = [];
      const dataCopy = [...data];
      for (let index = 0; index < 6 && dataCopy.length > 0; index++) {
        const indexRandom = Math.floor(Math.random() * dataCopy.length);
        const randomProduct = dataCopy.splice(indexRandom, 1)[0];
        productRandom.push(randomProduct);
      }
      setSimilar(productRandom);
    }
  }, [data]);
  return (
    <div>
      <div className=" 2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
        <div className="flex items-center justify-between r">
          <div className="items-center text-cente gap-12">
            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl uppercase ">
              Sản phẩm khác
            </h2>
          </div>
        </div>
        <section
          id="Projects"
          className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-14"
        >
          {Similar?.map((product: IProduct) => (
            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" key={product.id}>
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
                  <p className="text-lg font-bold text-black truncate block capitalize hover:underline">
                    {product?.name}
                  </p>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold cursor-auto my-3 text-red-500">
                      {product?.variants[0].discount?.toLocaleString('vi-VN')} VND
                    </p>
                    <del>
                      <p className="text-sm text-gray-600 cursor-auto ml-2">
                        {product?.variants[0].price?.toLocaleString('vi-VN')} VND
                      </p>
                    </del>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Similarproduct;
