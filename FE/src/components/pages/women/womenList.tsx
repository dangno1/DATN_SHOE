import { BsBagPlus } from "react-icons/bs";

const WomenList = () => {
  return (
    <>
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4">
          Responsive Product card grid
        </h1>
      </div>
      {/* ✅ Grid Section - Starts Here 👇 */}
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {/*   ✅ Product card 1 - Starts Here 👇 */}
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img
              src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/d0fbf9b2772542f58acaaf1e00f46ba8_9366/Adistar_2.0_Shoes_Pink_GV9122_01_standard.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Product Name
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
              src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/97f047abbbe143f99d97ae2e00b33338_9366/Grand_Court_Lifestyle_Court_Elastic_Lace_and_Top_Strap_Shoes_White_GY2327_01_standard.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Product Name
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
              src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c4429297761549cb8ebaaf3401496ba5_9366/Nizza_Platform_Shoes_White_HQ1902_01_standard.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Product Name
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
              src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c8aba848adba4eeebf89ae2e00ba47dd_9366/Grand_Court_Court_Elastic_Lace_and_Top_Strap_Shoes_White_GW6521_01_standard.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Product Name
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
        {/*   ✅ Product card 5 - Starts Here 👇 */}
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img
              src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b9024954fc7c4b7492664e133a9284cb_9366/Cloudfoam_Pure_Shoes_White_IG7376_01_standard.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Product Name
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
        {/*   🛑 Product card 5 - Ends Here  */}
        {/*   ✅ Product card 6 - Starts Here 👇 */}
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img
              src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/38f51c82cca64840b90d6a074ed58d16_9366/Court_Platform_Shoes_White_IE9987_01_standard.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Product Name
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
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img
              src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/5bd92667564d40328e9e9511bac0bc48_9366/Campus_00s_Shoes_Purple_ID7038_01_standard.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Product Name
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
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img
              src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRUMWdk5g4vw6te8sqLsU3Lx5-meBfyYSEsafLJ-Z0XR16Ff_HEGAI2mgbKb-wFxl-aXMp39h7zD53c8BBCujPa8HcO5Tv8S9RaWRpQxSfkaueKwoepFjgB"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Product Name
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
        {/*   🛑 Product card 6 - Ends Here  */}
      </section>
      {/* 🛑 Grid Section - Ends Here */}
    </>
  );
};

export default WomenList;
