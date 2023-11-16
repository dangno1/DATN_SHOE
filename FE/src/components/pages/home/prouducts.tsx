import { useGetProductsQuery } from "@/api/product";
import { useEffect, useState } from "react";
import Slider from "./banner";
import Social from "./social";
import Blog from "./blog";

const Products = () => {
  const { data } = useGetProductsQuery(false);
  const [filter, setFilter] = useState({
    price: "",
    color: "",
    size: "",
    search: "",
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (data) {
      let filtered = [...data];

      if (filter.price === "low") {
        filtered = filtered.sort((a, b) => a.variants[0].price - b.variants[0].price);
      } else if (filter.price === "high") {
        filtered = filtered.sort((a, b) => b.variants[0].price - a.variants[0].price);
      }

      if (filter.color) {
        filtered = filtered.filter((product) =>
          product.color.toLowerCase() === filter.color.toLowerCase()
        );
      }

      if (filter.size) {
        filtered = filtered.filter((product) =>
          product.size.toLowerCase() === filter.size.toLowerCase()
        );
      }

      if (filter.search) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(filter.search.toLowerCase())
        );
      }

      setFilteredProducts(filtered);
    }
  }, [data, filter]);

  const handleFilterChange = (event:any) => {
    const { name, value } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const clearFilters = () => {
    setFilter({
      price: "",
      color: "",
      size: "",
      search: "", // Đặt trường "search" về rỗng để xóa tất cả
    });
  };

  return (
    <>
    <Slider/>
    <div className="2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
      <div className="flex items-center justify-between r">
        <div className="items-center text-cente gap-12">
          <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl uppercase">
            Tất cả sản phẩm
          </h2>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            name="search"
            value={filter.search}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md p-2"
          />
          <select
            name="price"
            value={filter.price}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md p-2 ml-2"
          >
            <option value="">Tất cả giá</option>
            <option value="low">Giá thấp đến cao</option>
            <option value="high">Giá cao đến thấp</option>
          </select>
          <select
            name="color"
            value={filter.color}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md p-2 ml-2"
          >
            <option value="">Tất cả màu</option>
            <option value="red">Đỏ</option>
            <option value="blue">Xanh</option>
            {/* Thêm các tùy chọn màu khác ở đây */}
          </select>
          <select
            name="size"
            value={filter.size}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md p-2 ml-2"
          >
            <option value="">Tất cả kích thước</option>
            <option value="small">Nhỏ</option>
            <option value="medium">Trung bình</option>
            {/* Thêm các tùy chọn kích thước khác ở đây */}
          </select>
          <button onClick={clearFilters} className="ml-2 border rounded-md p-2">
            Xóa bộ lọc
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:grap-8 md:gap-6 gap-4 mt-10">
        {filteredProducts?.map((product) => (
          <div className="relative group" key={product.id}>
            <img
              src={product.image}
              alt=""
              className="lg:block w-[700px] h-[300px] shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
            />
            <div className="flex justify-center items-center" />
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
    <Social/>
    <Blog/>
    </>
    
  );
};

export default Products;
