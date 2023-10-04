
const Seller = () => {
  return (
    <div className=" 2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
      <div className="flex items-center justify-between r">
        <div className="items-center text-cente gap-12">
          <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl ">
            Outstanding Products
          </h2>
        </div>
        <a
          href="#"
          className="inline-block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold  outline-none ring-indigo-300 transition duration-100 hover:text-white hover:bg-black focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base"
        >
          See More
        </a>
      </div>
      <div className=" grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:grap-8 md:gap-6 gap-4 mt-10">
        <div className="relative group">
          <img
            src="https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/ef76174079d24f7dabb7b9e99b028da1_9366/adizero-sl.jpg"
            alt=""
            className=" lg:block  w-full shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl "
          />
          <div className=" flex justify-center items-center" />
          <div className="px-4 py-3 w-72 ">
            <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              ADIZERO SL
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                $150
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
              </del>
            </div>
          </div>
        </div>
        <div className="relative group">
          <img
            src="https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/0fcdf101f2984072a268a3d762eaba15_9366/gi%C3%A0y-ultraboost-light.jpg"
            alt=""
            className=" lg:block  w-full shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          />
          <div className=" flex justify-center items-center" />
          <div className="px-4 py-3 w-72 ">
            <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              Giày Ultraboost Light
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                $150
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">$188</p>
              </del>
            </div>
          </div>
        </div>
        <div className="relative group">
          <img
            src="https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/36fee312e3ab4b149cb22982d282b852_9366/gi%C3%A0y-ch%E1%BA%A1y-b%E1%BB%99-switch-fwd.jpg"
            alt=""
            className=" lg:block  w-full shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          />
          <div className=" flex justify-center items-center" />
          <div className="px-4 py-3 w-72 ">
            <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              Giày Chạy Bộ Switch FWD
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                $150
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
              </del>
            </div>
          </div>
        </div>
        <div className="relative group">
          <img
            src="https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/8bc17cbdc83646a6b093cb217a850fbd_9366/gi%C3%A0y-ch%E1%BA%A1y-b%E1%BB%99-ultra-4dfwd.jpg"
            alt=""
            className=" lg:block  w-fullshadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl "
          />
          <div className=" flex justify-center items-center" />
          <div className="px-4 py-3 w-72 ">
            <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              Giày Chạy Bộ Ultra 4DFWD
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                $150
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
              </del>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;
