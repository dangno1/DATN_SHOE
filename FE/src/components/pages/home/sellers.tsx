import { useGetProductsQuery } from "@/api/product";
import { IProduct } from "@/interface/product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Seller = () => {
  const { data } = useGetProductsQuery();
  console.log(data);
  const [alex, setAlex] = useState([]);
  useEffect(() => {
    if (data) {
      const productRandom = [];
      const dataCopy = [...data];
      for (let index = 0; index < 4 && dataCopy.length > 0; index++) {
        const indexRandom = Math.floor(Math.random() * dataCopy.length);
        const randomProduct = dataCopy.splice(indexRandom, 1)[0];
        productRandom.push(randomProduct);
      }
      setAlex(productRandom);
    }
  }, [data]);
  console.log(alex);
   
  
  return (
    <div className=" 2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
      <div className="flex items-center justify-between r">
        <div className="items-center text-cente gap-12">
          <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl uppercase ">
            Sản phẩm nổi bật
          </h2>
        </div>
        <Link to="/products"
          className="inline-block rounded-lg border bg-white px-4 py-2 uppercase text-center text-sm font-semibold  outline-none ring-indigo-300 transition duration-100 hover:text-white hover:bg-black focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base"
        >
          xem thêm
        </Link>
      </div>
      <div className=" grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:grap-8 md:gap-6 gap-4 mt-10">
        {alex?.map((product:IProduct)=>(
            <div className="relative group">
            <img
              src={product.image}
              alt=""
              className=" lg:block  w-[700px] h-[300px] shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
            />
            <div className=" flex justify-center items-center" />
            <div className="px-4 py-3 w-72 ">
              <span className="text-gray-400 mr-3 uppercase text-xs">{product.brand}</span>
              <p className="text-lg font-bold text-black truncate block capitalize hover:underline">
               {product.name}
              </p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">
                 ${product.variants[0].price}
                </p>
                <del>
                  <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                </del>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seller;
