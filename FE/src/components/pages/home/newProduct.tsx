import { useGetProductsQuery } from "@/api/product";
import { IProduct } from "@/interface/product";
// import React, { useEffect, useState } from 'react'
// import { Link } from "react-router-dom";
import Social from "./social";
import Blog from "./blog";
import Slider from "./banner";
import { BsBagPlus } from "react-icons/bs";

const SaleProduct = () => {
  const { data } = useGetProductsQuery(false);
  console.log(data);
  return (
    <>
      <Slider />
      <div className=" 2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
        <div className="flex items-center justify-center">
          <div className="text-center gap-12">
            <h2 className="text-3xl font-bold text-gray-800 lg:text-3xl uppercase">
              Sản phẩm sale
            </h2>
          </div>
        </div>
      </div>
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {data?.map((product: IProduct) => (
          <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl relative">
            <a href="#">
              <img
                src={product?.image}
                alt="Product"
                className="h-80 w-72 object-cover rounded-t-xl"
              />
              {product.variants[0].discount !== undefined &&
                product.variants[0].price !== undefined &&
                product.variants[0].price !== 0 && (
                  <div className="absolute top-0 right-0 bg-yellow-200 text-red-500 py-1 px-2 rounded-bl-xl rounded-tr-xl">
                    -
                    {Math.round(
                      ((product.variants[0].price -
                        product.variants[0].discount) /
                        product.variants[0].price) *
                        100
                    )}
                    %
                  </div>
                )}
              <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">
                  {product?.brand}
                </span>
                <p className="text-lg font-bold text-black truncate block hover:underline uppercase">
                  {product?.name}
                </p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3 text-red-500">
                    {product?.variants[0].discount.toLocaleString("vi-VN")} VND
                  </p>
                  <del>
                    <p className="text-sm text-gray-600 cursor-auto ml-2">
                      {product?.variants[0].price.toLocaleString("vi-VN")} VND
                    </p>
                  </del>
                  <div className="ml-auto font-bold text-2xl">
                    <BsBagPlus />
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </section>
      <Social />
      <Blog />
    </>
  );
};

export default SaleProduct;
