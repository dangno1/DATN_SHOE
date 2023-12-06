import { useGetProductsQuery } from "@/api/product";
import { IProduct } from "@/interface/product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import "./style.css"


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
      <div className="product">
    <div className="product__title">
      Sản phẩm nổi bật
    </div>
    <div className="product__list">
        {featuredProducts?.map((product:IProduct)=>(
            <div className="product__list--item">
            <div className="product__list--img">
              <Link to={`/detail/${product._id}`}>
                <img src={product?.image} alt=""/>
              </Link>
              {product.variants[0].discount !== undefined &&
                product.variants[0].price !== undefined &&
                product.variants[0].price !== 0 && (
                  <div className="product__item--sale">
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
            </div>
            <div className="text-lg font-bold text-black truncate block capitalize hover:underline text-center font-sans">
              {product?.name}
            </div>
            <div className="product__list--price">
              <span className="product__list--initlprice"> {product?.variants[0].discount.toLocaleString('vi-VN')} VND</span>
              <s className="product__list--old"> {product?.variants[0].price.toLocaleString('vi-VN')} VND</s>
            </div>
          </div>
        ))}
    </div>
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
