import { useGetColorsQuery } from "@/api/color";
import { useGetProductQuery } from "@/api/product";
import { useGetSizesQuery } from "@/api/size";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCreateCartMutation } from "@/api/cart";
import { ICart } from "@/interface/cart";
import { message } from "antd";
import { IColor } from "@/interface/color";
import { ISize } from "@/interface/size";
import { useGetRateQuery } from "@/api/rating";
const Inforproduct = () => {
  const { id } = useParams<{ id: string }>();
  const { data: sizeData } = useGetSizesQuery()
  const { data: colorData } = useGetColorsQuery()
  const { data: productData, isLoading } = useGetProductQuery(id || '');
  const variants = productData?.variants;
  const size = variants?.map((item: unknown) => {
    const sizeProduct = sizeData?.find(
      (sizeItem: ISize) => item?.sizeId == sizeItem._id
    );
    return sizeProduct;
  });
  const color = variants?.map((item: unknown) => {
    const colorProduct = colorData?.find(
      (colorItem: IColor) => item?.colorId == colorItem._id
    );
    return colorProduct;
  });
  console.log(color);
  const [addCart] = useCreateCartMutation();
  const [userData, setUserData] = useState(localStorage);
  const [selectedColor, setSelectedColor] = useState<IColor | undefined>();
  const [selectedSize, setSelectedSize] = useState<ISize | undefined>(sizeData?.[0]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setUserData(userData);
    }
  }, []);
  const navigate = useNavigate();
  const handleAddCar = async () => {
    if (!userData.username || !userData.email || !userData.address) {
      message.
        error({
          content: "Bạn chưa có tài khoản. Vui lòng đăng nhập hoặc đăng ký để thêm sản phẩm vào giỏ hàng.",
          duration: 5,
        });
      setTimeout(() => {
        navigate("/signup");
      }, 2000);
      return;
    }
    if (!selectedColor) {
      message.error({
        content: "Vui lòng chọn màu sắc trước khi thêm vào giỏ hàng.",
        duration: 3,
      });
      return;
    }
    if (!selectedSize) {
      message.error({
        content: "Vui lòng chọn size trước khi thêm vào giỏ hàng.",
        duration: 3,
      });
      return;
    }
    if (productData && selectedColor && selectedSize) {
      const productToAdd: ICart = {
        userName: userData.fullname,
        userEmail: userData.email,
        userAddress: userData.address,
        productName: productData.name,
        quantity: amount,
        price: productData.variants[0].price,
        initialPrice: productData.variants[0].price,
        size: selectedSize.value,
        totalPrice: 300000,
        category: productData.categoryId,
        image: String(productData.image),
        color: selectedColor.value,
        status: String(productData.variants[0].status),
        productID: productData._id
      };
      const data = await addCart(productToAdd);
      message.info("Đã thêm sản phẩm vào giỏ hàng thành công")
      data && setTimeout(() => {
        navigate("/cart");
      }, 2000);
      console.log(data);
    } else {
      console.error("productData is not defined.");
    }
  };

  const [images, setImage] = useState<(File | File[] | undefined)[]>()
  useEffect(() => {
    const listImage = [productData?.image, ...(productData?.thumbnail ? productData.thumbnail : [])]
    setImage(listImage)
  }, [productData])

  const [activeImgId, setActiveImageId] = useState(1); 

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
  //--------------------------------
  const starsData = useGetRateQuery();
  const calculateAverageStarsFromPath = (starsData, idFromPath) => {
    let totalStars = 0;
    let numberOfRatings = 0;     
    
    const stars = starsData?.data?.filter((item:any) => item.productID._id === id);
    
    if (stars && Array.isArray(stars)) {
      stars.forEach((item) => {
        if (item && item.stars) {
          totalStars += item.stars;
          numberOfRatings++;
        }
      });
    }
   
   
    const averageStars = numberOfRatings > 0 ? totalStars / numberOfRatings : 0;
  
    return {
      totalStars,
      averageStars: averageStars.toFixed(1), 
    };
  };
  
  const saoData = starsData;
  console.log(saoData);
  const { totalStars, averageStars } = calculateAverageStarsFromPath(saoData, id);

console.log('Total Stars:', totalStars);
console.log('Average Stars:', averageStars);

  return (
    <div>
      <section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          productData && (
            <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full px-4 md:w-1/2">
                  <div className="sticky top-0 z-50 overflow-hidden">
                    <div className="relative mb-6 lg:mb-10 lg:h-2/4">

                      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                        {images?.map((item: any, index: number) => (

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
                      {images?.map((item: any, index: number) => (
                        <div key={item} className="w-1/2 p-2 sm:w-1/4">
                          <a
                            href="#"
                            className="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300"
                            onClick={() => handleImageClick(index + 1)}
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
                      <span className="text-lg font-medium text-rose-500 dark:text-rose-200 uppercase">{productData.brand}</span>
                      <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl uppercase">{productData.name}</h2>
                      <div className="mr-7">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          // fill={index + 1 <= (hoverRating || rating) ? "yellow" : "none"}
                          fill="yellow"
                          stroke="black"
                          strokeWidth="1.5"
                        >
                          <path
                            d="M9.97183 1.70846C10.4382 0.933481 11.5618 0.933482 12.0282 1.70847L14.3586 5.58087C14.5262 5.85928 14.7995 6.05784 15.116 6.13116L19.5191 7.15091C20.4002 7.35499 20.7474 8.42356 20.1545 9.10661L17.1918 12.5196C16.9788 12.765 16.8744 13.0863 16.9025 13.41L17.2932 17.9127C17.3714 18.8138 16.4625 19.4742 15.6296 19.1214L11.4681 17.3583C11.1689 17.2316 10.8311 17.2316 10.5319 17.3583L6.37038 19.1214C5.53754 19.4742 4.62856 18.8138 4.70677 17.9127L5.09754 13.41C5.12563 13.0863 5.02124 12.765 4.80823 12.5196L1.8455 9.1066C1.25257 8.42356 1.59977 7.35499 2.48095 7.15091L6.88397 6.13116C7.20053 6.05784 7.47383 5.85928 7.64138 5.58087L9.97183 1.70846Z"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <p>{averageStars}</p>
                      </div>
                      <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400 capitalize">
                        {productData.desc}
                      </p>
                      <p className="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400">
                        <span>{productData.variants[0].discount.toLocaleString("vi-VN")}VND</span>
                        <span className="text-base font-normal text-red-500 line-through dark:text-gray-400">{productData.variants[0].price.toLocaleString("vi-VN")}VND</span>
                      </p>
                    </div>
                    <div className="flex items-center mb-8">
                      <h2 className="w-18 mr-6 text-lg font-bold dark:text-gray-400">Màu Sắc : </h2>
                      <div className="flex flex-wrap -mx-2 -mb-2">
                        {color?.map((item) => (
                          <button
                            key={item?._id}
                            className={`p-1 mb-2 mr-2 border ${selectedColor === item ? 'border-blue-400' : 'border-transparent'} hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400`}
                            onClick={() => setSelectedColor(item)}
                          >
                            <div>{item?.value}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center mb-8">
                      <h2 className="w-20 text-lg font-bold dark:text-gray-400">Kích Cỡ:</h2>
                      <div className="flex flex-wrap -mx-2 -mb-2">
                        {size?.map((item) => (
                          <button
                            key={item?._id}
                            className={`py-1 mb-2 mr-1 border w-11 ${selectedSize === item ? 'border-blue-400 text-blue-600' : 'hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400'}`}
                            onClick={() => setSelectedSize(item)}
                          >
                            {item?.value}
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
                        <button
                          className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover-bg-blue-700 dark:hover-border-blue-700 dark:hover-text-gray-300"
                          onClick={() => handleAddCar()}
                        >
                          Thêm vào giỏ hàng<AiOutlineShoppingCart />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </section>
    </div>
  );
};

export default Inforproduct;



