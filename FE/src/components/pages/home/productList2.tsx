import React from 'react'
import { BsBagPlus } from 'react-icons/bs'

const ProductList2 = () => {
  return (
    <>
 
    <div className="text-center p-10">
      <h1 className="font-bold text-4xl mb-4"> Other products of the shop</h1>
      {/* <h1 className="text-3xl">Tailwind CSS</h1> */}
    </div>
    {/* ✅ Grid Section - Starts Here 👇 */}
    <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {/*   ✅ Product card 1 - Starts Here 👇 */}
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img
              src="https://assets.adidas.com/images/w_600,f_auto,q_auto/5bd92667564d40328e9e9511bac0bc48_9366/Giay_Campus_00s_Mau_tim_ID7038_01_standard.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Giày Campus 00s
              </p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">
                  $149
                </p>
                <del>
                  <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                </del>
                <div className="ml-auto font-bold text-2xl">
                  <BsBagPlus />
                </div>
              </div>
            </div>
          </a>
        </div>
        {/*   🛑 Product card 1 - Ends Here  */}
        {/*   ✅ Product card 2 - Starts Here 👇 */}
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img
              src="https://assets.adidas.com/images/w_600,f_auto,q_auto/e8190bda50a44a9cbcbbe4937a1949ff_9366/Giay_Gazelle_trang_IE0546_01_standard.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Giày Gazelle
              </p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">
                  $149
                </p>
                <del>
                  <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                </del>
                <div className="ml-auto font-bold text-2xl">
                  <BsBagPlus />
                </div>
              </div>
            </div>
          </a>
        </div>
        {/*   🛑 Product card 2- Ends Here  */}
        {/*   ✅ Product card 3 - Starts Here 👇 */}
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img
              src="https://assets.adidas.com/images/w_600,f_auto,q_auto/2d85dc90ba68498f9be8efe7eceb9d6f_9366/Giay_LG2_SPZL_trang_IF8358_01_standard.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Giày LG2 SPZL
              </p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">
                  $149
                </p>
                <del>
                  <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                </del>
                <div className="ml-auto font-bold text-2xl">
                  <BsBagPlus />
                </div>
              </div>
            </div>
          </a>
        </div>
        {/*   🛑 Product card 3 - Ends Here  */}
        {/*   ✅ Product card 4 - Starts Here 👇 */}
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img
              src="https://assets.adidas.com/images/w_600,f_auto,q_auto/a02d4f03dc7945159ef2c04f49841aca_9366/Giay_Adizero_Prime_X_2.0_STRUNG_trang_HP9709_HM1.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Giày Adizero Prime X 2.0 STRUNG
              </p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">
                  $149
                </p>
                <del>
                  <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                </del>
                <div className="ml-auto font-bold text-2xl">
                  <BsBagPlus />
                </div>
              </div>
            </div>
          </a>
        </div>
        {/*   🛑 Product card 4 - Ends Here  */}
       
      </section>
    {/* 🛑 Grid Section - Ends Here */}
  
  
  </>
  )
}

export default ProductList2