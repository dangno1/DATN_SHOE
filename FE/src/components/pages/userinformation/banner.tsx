import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
const Banner = () => {
  const [userData, setUserData] = useState(localStorage);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setUserData(userData);
    }
  }, []);
return (
    <>
      <div className="dark:bg-gray-900 bg-gray-50 ">
        <div className="container mx-auto flex items-center justify-between">
          <h1
            className="md:w-2/12 cursor-pointer text-gray-800 dark:text-white"
            aria-label="the Crib."
          >
            <h1 className="font-bold text-xl ml-3">Chào {userData.fullname}</h1>
            <p className="ml-3">50 điểm</p>
          </h1>
          <ul className="hidden w-8/12 md:flex items-center justify-center space-x-8">
            <li className="dropdown inline-block relative">
              <button className="  text-gray-700 font-semibold rounded inline-flex items-center">
                <span className="mr-1">
                  <Link to="/user">Tài Khoản</Link>
                </span>
              </button>
            </li>

            <li className="dropdown inline-block relative">
              <button className="  text-gray-700 font-semibold  rounded inline-flex items-center">
                <span className="mr-1">
                  {" "}
                  <Link to="/oder&history">Đơn hàng Đã Đặt</Link>
                </span>
              </button>
            </li>

          </ul>
          {/* icon */}
          <div className="md:w-2/12 justify-end flex items-center space-x-4 xl:space-x-8 pr-8">
            <div className="hidden lg:flex items-center">
              <img
                src="https://www.adidas.com.vn/glass/react/b3dc1a9/assets/img/membership-home/myaccount-redesign/new-adiClub-levels/adiclub-level-1-badge-DT-SVG.svg"
                alt=""
              />
            </div>
            <div className="flex lg:hidden">
              <button
                aria-label="show options"
                className="text-black dark:text-white dark:hover:text-gray-300 hidden md:flex focus:outline-none focus:ring-2 rounded focus:ring-gray-600"
              >
                <svg
                  className="fill-stroke"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6H20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 12H20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 18H20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                aria-label="open menu"
                className="text-black dark:text-white dark:hover:text-gray-300 md:hidden focus:outline-none focus:ring-2 rounded focus:ring-gray-600"
              >
                <svg
                  className="fill-stroke"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6H20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 12H20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 18H20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
