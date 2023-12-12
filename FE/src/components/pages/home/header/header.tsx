import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { AiOutlineUser } from "react-icons/ai";
import "./style.css";

import { useGetCategoryesQuery } from "@/api/category";
import { ICategory } from "@/interface/category";
// import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { data } = useGetCategoryesQuery();

  const [userData, setUserData] = useState(localStorage);
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUserData(userData);
    }
  }, []);
  const handleUserIconClick = () => {
    if (userData && userData.fullname) {
      navigate("/user");
    } else {
      navigate("/signin");
    }
  };
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handleCategoryClick = () => {
    setDropdownOpen(false);
  };
  return (
    <div className="dark:bg-gray-900">
      <div className=" flex items-center justify-between w-full max-w-screen-xl mx-auto py-6 ">
        <div className="text-[60px] ">
          <Link to="/">
            <img
              src="https://icolor.vn/wp-content/uploads/2018/07/adidas-3-la.jpg"
              alt=""
              className="h-10 w-full"
            />
          </Link>
        </div>

        <div className="px-2 pl-[15%]">
          <ul className=" flex items-center space-x-6 list-none ">
            <li>
              <Link
                to="/"
                className="text-black text-lg font-semibold uppercase hover:underline"
              >
                Trang Chủ
              </Link>
            </li>
            <li className="relative group">
              <span
                className="cursor-pointer text-black text-lg font-semibold uppercase hover:underline"
                onClick={handleDropdownToggle}
              >
                Danh mục
              </span>
              {isDropdownOpen && (
                <ul className=" absolute mt-2 space-y-2 bg-white border rounded-lg shadow-lg z-[99] px-[30%] w-[250%]">
                  <li className="text-black font-semibold uppercase hover:underline">
                    <Link to="./products" onClick={handleCategoryClick}>
                      Tất cả các sản phẩm
                    </Link>
                  </li>
                  
                  {data?.map((cate: ICategory) => (
                    <li className="text-black font-semibold uppercase hover:underline">
                      <Link
                        to={`/${cate?.slug}/${cate?._id}`}
                        onClick={handleCategoryClick}
                      >
                        {cate?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/sale"
                className=" text-black text-lg font-semibold uppercase hover:underline"
              >
                Giảm Giá
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="text-black text-lg font-semibold uppercase hover:underline"
              >
                Về chúng tôi
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex items-center space-x-6 list-none ">
            <li>
              <a href="#" className="text-3xl">
                <CiSearch />
              </a>
            </li>
            <li>
              <Link to="/cart" className="text-3xl">
                <LiaShoppingBagSolid />
              </Link>
            </li>
            <li>
              <button
                aria-label="go to cart"
                className="text-gray-800 dark:hover:text-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 text-2xl flex items-center space-x-2"
                onClick={handleUserIconClick}
              >
                <Link to="/user">
                  <div className="flex items-center space-x-2">
                    <AiOutlineUser className="text-4xl" />
                    <div className="text-xs">{userData.username}</div>
                  </div>
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
