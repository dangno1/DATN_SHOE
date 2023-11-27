import { useGetProductsQuery } from "@/api/product";
import { IProduct } from "@/interface/product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";


const Seller = () => {

  const { data } = useGetProductsQuery(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const compareAmountSold = (a, b) => {
    return b.variants[0].amountSold - a.variants[0].amountSold;
  };

  const getFeaturedProducts = () => {
    if (!data) return [];

    // Sắp xếp sản phẩm theo amountSold
    const sortedProducts = [...data].sort(compareAmountSold);

    // Lọc ra những sản phẩm có amountSold lớn hơn 1
    const filteredProducts = sortedProducts.filter(
      (product) => product.variants[0].amountSold > 1
    );

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    return filteredProducts.slice(startIndex, endIndex);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const featuredProducts = getFeaturedProducts();

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
        {featuredProducts?.map((product:IProduct)=>(
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
                <p className="text-lg font-semibold cursor-auto my-3 text-red-500">
                {product?.variants[0].discount.toLocaleString('vi-VN')} VND
                </p>
                <del>
                  <p className="text-sm text-gray-600 cursor-auto ml-2">
                  {product?.variants[0].price.toLocaleString('vi-VN')} VND
                  </p>
                </del>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="mr-2 px-4 py-2 bg-gray-300 text-gray-600 rounded-md cursor-pointer"
        >
          <CgChevronLeft />
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage * productsPerPage >= data?.length}
          className="ml-2 px-4 py-2 bg-gray-300 text-gray-600 rounded-md cursor-pointer"
        >
          <CgChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Seller;
