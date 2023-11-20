import { useGetProductsQuery } from "@/api/product";
import { IProduct } from "@/interface/product";
import { BsBagPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";

const ProductList = () => {
  const { data } = useGetProductsQuery(false);

  // Kiểm tra xem có dữ liệu sản phẩm không
  if (!data) {
    return <div>Loading...</div>;
  }

  // Số mili giây trong 1 ngày
  const oneDay = 24 * 60 * 60 * 1000;

  // Thời điểm hiện tại
  const currentDate = new Date();

  // Đặt thời điểm hiện tại về đầu ngày
  currentDate.setHours(0, 0, 0, 0);
  const startOfDay = currentDate.getTime();

  // Thời điểm 4 trước đó
  const fourDaysLater = startOfDay - 4 * oneDay;

  // Lọc danh sách sản phẩm từ ngày hôm nay đến 4 ngày sau
  const latestProducts = data.filter((product) => {
    const createdAt = new Date(product.createdAt).getTime();
    // return createdAt >= startOfDay && createdAt <= fourDaysLater;
    return createdAt >= fourDaysLater && createdAt <= startOfDay;

  });
  

  return (
    <>
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4 uppercase">Sản phẩm mới nhất </h1>
      </div>

      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-14"
      >
        {/* Hiển thị sản phẩm mới nhất nếu có */}
        {latestProducts?.map((product:IProduct) => (
          <div key={product._id} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
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
            </Link>
          </div>
        ))}

        {/* Hiển thị thông báo nếu không có sản phẩm mới */}
        
      </section>
      {latestProducts?.length === 0 && (
          <div className="text-center mt-[-2%] pb-2 text-gray-500 font-semibold">
          Không có sản phẩm mới nào trong khoảng thời gian này.
          </div>
        )}
    </>
  );
};

export default ProductList;
