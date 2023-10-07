import { BsBagPlus } from "react-icons/bs";

const ProductList = () => {
  return (
    <>
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4"> Members' Exclusive</h1>
      </div>
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-14"
      >
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img
              src="https://assets.adidas.com/images/w_280,h_280,f_auto,q_auto:sensitive/0f108327ea874f9b93fdaf20014a38e5_9366/gi%C3%A0y-rivalry-low.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Nam Originals
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Giày Rivalry Low
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
              src="https://assets.adidas.com/images/w_280,h_280,f_auto,q_auto:sensitive/e64de67204ad422f8c6daebe01304a92_9366/gi%C3%A0y-adventure-mocaturf.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Nam Originals
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Giày Adventure Mocaturf
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
              src="https://assets.adidas.com/images/w_280,h_280,f_auto,q_auto:sensitive/9665de88e0c647758f16aeba00f81924_9366/gi%C3%A0y-adventure-rovermule.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                {" "}
                Nam Originals{" "}
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Giày Adventure Rovermule
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
              src="https://assets.adidas.com/images/w_280,h_280,f_auto,q_auto:sensitive/d9ea0b3526d24fceb32faed701784a77_9366/gi%C3%A0y-pureboost-22.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Nam Chạy
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Giày Pureboost 22
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
      </section>
    </>
  );
};

export default ProductList;
