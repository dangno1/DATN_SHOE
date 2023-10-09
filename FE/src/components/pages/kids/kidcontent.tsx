import { BsBagPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
const Kidcontent = () => {
  return (
    <>
      <div className="container max-w-full mx-auto  py-12 px-4 sm:px-6 lg:px-8 ">
        <div>
          <iframe
            className="w-full"
            height="800"
            src="https://www.youtube.com/embed/SbR_s41aUC0?si=yhf74ha7bmyCxJZm"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className=" mx-auto max-w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="p-8">
          <p className="text-center font-medium ">Nike Air Max 1 EasyOn</p>
          <h1 className="font-bold text-6xl mb-4 text-center">
            THE ICON MADE EASY
          </h1>
          <p className="text-center font-normal ">
            The kids-exclusive Air Max 1 EasyOn reimagines lacing for an easier
            way to slip into a classic style.
          </p>
        </div>
        <div className="pt-6">
          <section
            id="Projects"
            className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-14"
          >
            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <Link to={`/detail/:id`}>
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
                      <p className="text-sm text-gray-600 cursor-auto ml-2">
                        $199
                      </p>
                    </del>
                    <div className="ml-auto font-bold text-2xl">
                      <BsBagPlus />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <Link to={`/detail/:id`}>
                <img
                  src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/w_579,c_limit/1eb2983b-1f14-4e9e-a19d-e97b359add69/lebron-witness-7-se-younger-shoes-b3bwxf.png"
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
                      <p className="text-sm text-gray-600 cursor-auto ml-2">
                        $199
                      </p>
                    </del>
                    <div className="ml-auto font-bold text-2xl">
                      <BsBagPlus />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <Link to={`/detail/:id`}>
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
                      <p className="text-sm text-gray-600 cursor-auto ml-2">
                        $199
                      </p>
                    </del>
                    <div className="ml-auto font-bold text-2xl">
                      <BsBagPlus />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <Link to={`/detail/:id`}>
                <img
                  src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/w_579,c_limit/ba26a81a-9557-442e-927c-82675cc79f50/force-1-le-younger-shoe-rg3gD7.png"
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
                      <p className="text-sm text-gray-600 cursor-auto ml-2">
                        $199
                      </p>
                    </del>
                    <div className="ml-auto font-bold text-2xl">
                      <BsBagPlus />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <Link to={`/detail/:id`}>
                <img
                  src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_579,c_limit/33599edd-49ac-4f2f-b82c-f3552aee843c/nike-kids.png"
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
                      <p className="text-sm text-gray-600 cursor-auto ml-2">
                        $199
                      </p>
                    </del>
                    <div className="ml-auto font-bold text-2xl">
                      <BsBagPlus />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <Link to={`/detail/:id`}>
                <img
                  src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_451,c_limit/dfe74f40-d240-4edc-9a1c-2ddcf4e7812a/nike-kids.png"
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
                      <p className="text-sm text-gray-600 cursor-auto ml-2">
                        $199
                      </p>
                    </del>
                    <div className="ml-auto font-bold text-2xl">
                      <BsBagPlus />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <Link to={`/detail/:id`}>
                <img
                  src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_451,c_limit/a5b65e64-3b64-4381-ae84-9037c5432bb5/nike-kids.png"
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
                      <p className="text-sm text-gray-600 cursor-auto ml-2">
                        $199
                      </p>
                    </del>
                    <div className="ml-auto font-bold text-2xl">
                      <BsBagPlus />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <Link to={`/detail/:id`}>
                <img
                  src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_451,c_limit/1f070ea0-2a73-44dd-8a70-e43256e231ab/flex-runner-2-older-road-running-shoes-RJPdh4.png"
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
                      <p className="text-sm text-gray-600 cursor-auto ml-2">
                        $199
                      </p>
                    </del>
                    <div className="ml-auto font-bold text-2xl">
                      <BsBagPlus />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>

      <div className=" mx-auto max-w-full py-12 px-4 sm:px-6 lg:px-8">
        <div>
          <div className="pt-6">
            <h1 className="font-medium text-3xl mb-4">Featured</h1>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-4">
              <div className="">
                <img
                  className="w-full h-full"
                  src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/t_prod/h_1016,c_limit/84989cd7-feb4-4ebf-9456-3d9614295562/nike-kids.png"
                  alt=""
                />
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <img
                    className="w-full h-full"
                    src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_875,c_limit/3b7b4ddb-b8a1-44b2-a3d2-441b33a8a26b/nike-kids.png"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    className="w-full h-full"
                    src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_875,c_limit/3b7b4ddb-b8a1-44b2-a3d2-441b33a8a26b/nike-kids.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mx-auto max-w-full py-12 px-4 sm:px-6 lg:px-8 ">
        <div>
          <div className="pt-6">
            <h1 className="font-medium text-3xl mb-4">Featured</h1>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3  lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-4">
              <div className="">
                <img
                  className="w-full h-full"
                  src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/eb24f5da-179f-40f2-9e9d-901ed72e5412/air-jordan-1-low-older-shoes-xLzJc6.png"
                  alt=""
                />
              </div>
              <div className="">
                <img
                  className="w-full h-full"
                  src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ac7b16d2-e516-44dd-9dd4-8e8215c5ce63/air-jordan-1-low-se-older-shoes-NDwhDt.png"
                  alt=""
                />
              </div>
              <div className="">
                <img
                  className="w-full h-full"
                  src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/t_prod/h_1016,c_limit/84989cd7-feb4-4ebf-9456-3d9614295562/nike-kids.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Kidcontent;
