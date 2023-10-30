import { useGetColorsQuery } from "@/api/color";
import { useGetProductQuery } from "@/api/product";
import { useGetSizesQuery } from "@/api/size";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { AiFillHeart ,AiOutlineShoppingCart } from "react-icons/ai";
const Inforproduct = () => {
  const { id } = useParams<{ id: string }>();
  const { data: sizeData } = useGetSizesQuery()
  const { data: colorData } = useGetColorsQuery()
  const { data: productData, isLoading } = useGetProductQuery(id || '');
  const { handleSubmit } = useForm();
  const onSubmit = (formData: any) => {
  };
  console.log("productData: ", productData);
  const [images ,setImage ]=useState<any>()
  useEffect(() => {
  const listImage = [productData?.image, ...(productData?.thumbnail ? productData.thumbnail : [])]
    setImage(listImage)
  }, [productData])
  console.log( images);
  
  const [activeImgId, setActiveImageId] = useState(1); // Initialize active image ID to 1

  const handleImageClick = (id: number) => {
    setActiveImageId(id); // Update the active image ID when a thumbnail is clicked
  };
  const [amount, setAmount] = useState(1);
  const increaseAmount = () => {
    setAmount(amount + 1);
  };
  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };
  return (
    <div>
      <section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          productData && (
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
                <div className="flex flex-wrap -mx-4">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="sticky top-0 z-50 overflow-hidden">
                      <div className="relative mb-6 lg:mb-10 lg:h-2/4">
                        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                          {images.map((item: any, index:number) => (
                            <SwiperSlide key={index}>
                              <img
                                src={item}
                                alt=""
                                className="object-cover w-full lg:h-full"
                                onClick={() => handleImageClick(index + 1)} // Tăng ID bằng 1 để từ 1, 2, 3, ...
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                      <div className="flex-wrap hidden md:flex">
                         {images?.map((item: any,index : number) => (
                          <div key={item} className="w-1/2 p-2 sm:w-1/4">
                            <a
                              href="#"
                              className="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300"
                              onClick={() => handleImageClick(index   + 1)}
                            >
                              <img src={item} alt="" className="object-cover w-full lg:h-20" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="lg:pl-20">
                      <div className="mb-8">
                        <span className="text-lg font-medium text-rose-500 dark:text-rose-200">{productData.brand}</span>
                        <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">{productData.name}</h2>
                        <div className="flex items-center mb-6">
                          <ul className="flex mr-2">
                            <li>
                              <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star" viewBox="0 0 16 16">
                                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                </svg>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star" viewBox="0 0 16 16">
                                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465 .792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                </svg>
                              </a>
                            </li>
                          </ul>
                          <p className="text-xs dark:text-gray-400">(2 customer reviews)</p>
                        </div>
                        <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                          {productData.desc}
                        </p>
                        <p className="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400">
                          <span>{productData.variants[0].price}</span>
                          <span className="text-base font-normal text-red-500 line-through dark:text-gray-400">{productData.variants[0].price + 10000}</span>
                        </p>
                        <p className="text-green-600 dark:text-green-300">7 in stock</p>
                      </div>
                      <div className="flex items-center mb-8">
                        <h2 className="w-18 mr-6 text-lg font-bold dark:text-gray-400">Màu Sắc : </h2>
                        <div className="flex flex-wrap -mx-2 -mb-2">
                          {colorData?.map((color) => (
                            <button key={color._id} className="p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400">
                              <div >{color.value}</div>
                              {/* <div className={`w-6 h-6 bg-red-500`}></div> */}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center mb-8">
                        <h2 className="w-20 text-lg font-bold dark:text-gray-400">Kích Cỡ:</h2>
                        <div className="flex flex-wrap -mx-2 -mb-2">
                          {sizeData?.map((size) => (
                            <button key={size._id} className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">
                              {size.value}
                            </button>
                          ))}

                        </div>
                      </div>
                      <div className="w-32 mb-8">
                        <label htmlFor="" className="w-full text-xl font-semibold text-gray-700 dark:text-gray-400">Số Lượng</label>
                        <div className="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                          <button
                            className="w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover-bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400"
                            onClick={decreaseAmount}
                          >
                            <span className="m-auto text-2xl font-thin">-</span>
                          </button>
                          <input
                            type="number"
                            className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                            placeholder="1"
                            value={amount}
                            readOnly
                          />
                          <button
                            className="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover-bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400"
                            onClick={increaseAmount}
                          >
                            <span className="m-auto text-2xl font-thin">+</span>
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center -mx-4">
                        <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                          <button type="submit" className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover-bg-blue-700 dark:hover-border-blue-700 dark:hover-text-gray-300">
                            Thêm vào giỏ hàng <AiOutlineShoppingCart/>
                          </button>
                        </div>
                        <div className="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                          <button className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover-bg-blue-700 dark:hover-border-blue-700 dark:hover-text-gray-300">
                            Thêm vào ưa thích <AiFillHeart/>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )
        )}
      </section>
    </div>
  );
};

export default Inforproduct;

// import { useGetProductQuery } from "@/api/product"
// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// const Inforproduct=()=> {
//   const {id} = useParams<{id:string}>()
// const {data } = useGetProductQuery(id || '')

// const [images ,setImage ]=useState<any>()
// useEffect(() => {
// const listImage = [data?.image, ...(data?.thumbnail ? data.thumbnail : [])]
//   setImage(listImage)
// }, [data])
// console.log( images);

// }

