import { useGetProductsQuery } from "@/api/product";
import { IProduct } from "@/interface/product";
import { useEffect } from "react";
import { useState } from "react";
import { BsBagPlus} from "react-icons/bs";

const ProductList = () => {
  const { data } = useGetProductsQuery(false);
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

  return (
    <>
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4 uppercase"> dành riêng cho thành viên</h1>
      </div>
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-14"
      >
        {alex?.map((product: IProduct) => (
          <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <a href="#">
              
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
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                    ${product?.variants[0].price}
                  </p>
                  <del>
                    <p className="text-sm text-gray-600 cursor-auto ml-2">
                      $1000
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
    </>
  );
};

export default ProductList;
