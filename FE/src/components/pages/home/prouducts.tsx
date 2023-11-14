/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetProductsQuery } from "@/api/product";
import { useEffect, useState } from "react";
import Slider from "./banner";
import Social from "./social";
import Blog from "./blog";
import { useGetColorQuery, useGetColorsQuery } from "@/api/color";
import { useGetSizeQuery, useGetSizesQuery } from "@/api/size";
import { BsBagPlus } from "react-icons/bs";
import { useGetCategoryesQuery } from "@/api/category";

const Products = () => {
  const { data } = useGetProductsQuery<{ data: IProduct[] }>(false);
  // console.log(data);
  
  const { data: Color } = useGetColorsQuery();
  const { data: Size } = useGetSizesQuery();
  const [productData, setProductData] = useState<IProduct[]>(data); //dùng chung
  const [sortOrder, setSortOrder] = useState("asc");
  const { data: Cate } = useGetCategoryesQuery();
  // console.log(Cate);
  
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const test = (event:any) => {
    const selectedId = event.target.value; 
    const selectedName = event.target.options[event.target.selectedIndex].text; 
    console.log(`Selected Category Id: ${selectedId}`);
    console.log(`Selected Category Name: ${selectedName}`);
    setSelectedSubcategory(selectedId);
  };

  useEffect(() => {
    data && setProductData(data);
  }, [data]);

  useEffect(() => {
    if (data && selectedSubcategory) {
      const newProduct = data.filter((item: IProduct) =>
        item.categoryId == selectedSubcategory
      );
      console.log(newProduct);
      
      setProductData(newProduct);
    } else {
      setProductData(data || []);
    }
  }, [data, selectedSubcategory]);

  const handleSelectChangeColor = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newProduct = data?.filter((item: IProduct) =>
      item.variants.some((variant) => variant.colorId === event.target.value)
    );

    setProductData(newProduct);
  };

  const handleSelectChangeSize = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newProduct = data?.filter((item: IProduct) =>
      item.variants.some((variant) => variant.sizeId === event.target.value)
    );

    setProductData(newProduct);
  };

  const handleSelectChangePrice = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (productData) {
      const sortedArray = [...productData];
      if (event?.target.value === "low") {
        if (sortOrder === "asc") {
          sortedArray.sort((a, b) => a.variants[0].price - b.variants[0].price);
          setSortOrder("asc");
        } else if (sortOrder === "desc") {
          sortedArray.sort((a, b) => b.variants[0].price - a.variants[0].price);
          setSortOrder("desc");
        }
      } else if (event?.target.value === "high") {
        if (sortOrder === "asc") {
          sortedArray.sort((a, b) => b.variants[0].price - a.variants[0].price);
          setSortOrder("desc");
        } else if (sortOrder === "desc") {
          sortedArray.sort((a, b) => a.variants[0].price - b.variants[0].price);
          setSortOrder("asc");
        }
      }
      setProductData(sortedArray);
    }
  };
  // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(event.target.value);
  // };

  // const filteredProducts = (productData || []).filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase())).sort((a, b) => {
  //     if (sortOrder === "asc") {
  //       return a.variants[0].price - b.variants[0].price;
  //     } else {
  //       return b.variants[0].price - a.variants[0].price;
  //     }
  //   });
  // const [filter, setFilter] = useState({
  //   price: "",
  //   color: "",
  //   size: "",
  //   search: "",
  // });
  // const [filteredProducts, setFilteredProducts] = useState([]);

  // useEffect(() => {
  //   if (data) {
  //     // Áp dụng bộ lọc vào danh sách sản phẩm
  //     let filtered = [...data];
  //     if (filter.search) {
  //       filtered = filtered.filter((product) =>
  //         product.name.toLowerCase().includes(filter.search.toLowerCase())
  //       );
  //     setFilteredProducts(filtered);
  //     }
  //   }
  // }, [data, filter]);

  // const handleFilterChange = (event: any) => {
  //   const { name, value } = event.target;
  //   setFilter({
  //     ...filter,
  //     [name]: value,
  //   });
  // };

  // const clearFilters = () => {
  //   setFilter({
  //     price: "",
  //     color: "",
  //     size: "",
  //     search: "",
  //   });
  // };

  return (
    <>
      <Slider />
      <div className="2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
        <div className="lg:flex lg:items-center lg:justify-between md:flex md:items-center md:justify-between flex flex-col items-center justify-center">
          <div className="lg:items-center lg:text-center lg:gap-12 md:mb-4 lg:mb-0 mb-4">
            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl uppercase mb-3">
              Tất cả sản phẩm
            </h2>
          </div>
          <div className="lg:flex lg:items-center">
            <select
              name="price"
              onChange={handleSelectChangePrice}
              className="border border-gray-300 rounded-md p-2 ml-2"
            >
              <option value="">Tất cả giá</option>
              <option value="low">Giá thấp đến cao</option>
              <option value="high">Giá cao đến thấp</option>
            </select>
            <select
              name="color"
              onChange={handleSelectChangeColor}
              className="border border-gray-300 rounded-md p-2 ml-2"
            >
              <option value="">Tất cả màu</option>
              {Color?.map((colorItem: any) => (
                <option value={colorItem?._id} key={colorItem?._id}>
                  {colorItem?.value}
                </option>
              ))}
            </select>
            <select
              name="size"
              onChange={handleSelectChangeSize}
              className="border border-gray-300 rounded-md p-2 ml-2"
            >
              <option value="">Tất cả kích thước</option>
              {Size?.map((sizeItem: any) => (
                <option  value={sizeItem?._id} key={sizeItem?._id}>
                  {sizeItem?.value}
                </option>
              ))}
            </select>

            <select
              name="category"
              onChange={test}
              className="border border-gray-300 rounded-md p-2 ml-2"
            >
              <option value="">Danh mục</option>
              {Cate?.map((cateitem: any) => (
                <option                  
                  value={cateitem?._id}
                  key={cateitem?._id}
                >
                  {cateitem.name}
                </option>
              ))}
            </select>
            {/* <button onClick={clearFilters} className="ml-2 border rounded-md p-2">Xóa bộ lọc</button> */}
          </div>
        </div>

        <div className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-14">
          {productData?.map((product: IProduct) => (
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
                  <p className="text-lg font-bold text-black truncate block hover:underline uppercase">
                    {product?.name}
                  </p>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto my-3">
                    {product?.variants[0].price.toLocaleString('vi-VN')} VND
                    </p>
                    <del>
                      <p className="text-sm text-gray-600 cursor-auto ml-2">
                      {product?.variants[0].discount} VND

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
        </div>
      </div>
      <Social />
      <Blog />
    </>
  );
};

export default Products;
