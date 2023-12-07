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
import { notification } from "antd";
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

  type NotificationType = 'success' | 'info' | 'warning' | 'error';
  const [notificationVisible, setNotificationVisible] = useState(false);

  const openNotification = (type: NotificationType, message: string) => {
    setNotificationVisible(true);
    notification[type]({
      message: 'Thông báo',
      description: message,
      onClose: () => setNotificationVisible(false), // Hide notification when closed
    });
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setUserData(userData);
    }
  }, []);
  //render số lượng sản phẩm trong kho theo biến thể
  const [selectedVariant, setSelectedVariant] = useState<IProduct['variants'][0] | undefined>(variants?.[0]);
  useEffect(() => {
    if (selectedSize && selectedColor) {
      const matchingVariant = variants?.find(
        (variant) =>
          variant.sizeId === selectedSize._id &&
          variant.colorId === selectedColor._id
      );
      setSelectedVariant(matchingVariant);
    }
  }, [selectedSize, selectedColor, variants]);
  //hết code render số lượng sản phẩm trong kho theo biến thể
  //validate điều kiện add cart
  const navigate = useNavigate();
  const handleAddCar = async () => {
    if (!userData.username || !userData.email || !userData.address) {
      openNotification('error', "Bạn chưa có tài khoản. Vui lòng đăng nhập hoặc đăng ký để thêm sản phẩm vào giỏ hàng.");
      setTimeout(() => {
        navigate("/signup");
      }, 2000);
      return;
    }
    if (!selectedColor) {
      openNotification('error', "Vui lòng chọn màu sắc trước khi thêm vào giỏ hàng");
      return;
    }
    if (!selectedSize) {
      openNotification('error', "Vui lòng chọn size trước khi thêm vào giỏ hàng.");
      return;
    }
    if (productData && selectedColor && selectedSize) {
      if (selectedVariant?.quantity !== undefined) {
        if (selectedVariant.quantity <= 0) {
          openNotification('error', "Sản phẩm đã hết hàng. Vui lòng chọn một biến thể khác.");
          return;
        }


        if (amount > selectedVariant.quantity) {
          openNotification('error', "Số lượng sản phẩm trong giỏ hàng vượt quá số lượng có sẵn trong kho.");
          return;
        }
      } else {
        openNotification('error', "Sản phẩm không có sẵn trong kho. Vui lòng chọn sản phẩm khác.");
        return;
      }
      const productToAdd: ICart = {
        userName: userData.fullname,
        userEmail: userData.email,
        userAddress: userData.address,
        productName: productData.name,
        quantity: amount,
        price: productData.variants[0].price,
        initialPrice: productData.variants[0].price,
        size: selectedSize.value,
        totalPrice: amount * productData.variants[0].price,
        category: productData.categoryId,
        image: String(productData.image),
        color: selectedColor.value,
        status: String(productData.variants[0].status),
        productID: String(productData?._id),
        quantityAvailable: selectedVariant?.quantity || 0,
      };

      const data = await addCart(productToAdd);
      if (data) {
        openNotification('success', "Đã thêm sản phẩm vào giỏ hàng thành công");
        navigate("/cart");
      } else {
        console.error("Error adding to cart:", data);
      }
    } else {
      console.error("productData is not defined.");
    }
  };
  //hết code addCart

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const listImage = [productData?.image, ...(productData?.thumbnail ? productData.thumbnail : [])].filter(Boolean);
    setImages(listImage.map(String));
  }, [productData]);

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
    const stars = starsData?.data?.filter((item: any) => item.productID?._id === id);
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
      {notificationVisible}
      <section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          productData && (
            <div className="container ">
              <div className="grid grid-cols-[3fr,1fr]">
                <div className=" px-4 max-w-6xl">
                  <div className="image_one relative mb-6 lg:mb-10 ">
                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                      {images?.map((item, index: number) => (
                        <SwiperSlide key={index}>
                          <img
                            src={item}
                            alt=""
                            onClick={() => handleImageClick(index + 1)} // Tăng ID bằng 1 để từ 1, 2, 3, ...
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="flex-wrap hidden md:flex ml-14">
                    {images?.map((item, index: number) => (
                      <div key={item} className=" p-8 ">
                        <a
                          href="#"
                          className="block border-box border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300"
                          onClick={() => handleImageClick(index + 1)}
                        >
                          <img
                            src={item}
                            alt=""
                            className="object-cover w-full"
                            style={{ height: '180px', width: '180px' }}
                          />
                        </a>
                      </div>
                    ))}
                  </div>



                </div>
                <div className="w-full">
                  <div className="">
                    <div className="mb-8">
                      {/* <span className="text-lg font-medium text-rose-500 dark:text-rose-200 uppercase">{productData.brandId}</span> */}
                      <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl uppercase">{productData.name}</h2>
                      <p className="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400">
                        <span>{productData.variants[0].price.toLocaleString("vi-VN")}VND</span>
                        <span className="ml-2 text-base font-normal text-red-500 line-through dark:text-gray-400">
                          {productData.variants[0].discount.toLocaleString("vi-VN")}VND
                        </span>
                      </p>
                      <div className="mr-7 flex flex-wrap items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="yellow"
                          stroke="black"
                          strokeWidth="1.5"
                        >
                          <path
                            d="M9.97183 1.70846C10.4382 0.933481 11.5618 0.933482 12.0282 1.70847L14.3586 5.58087C14.5262 5.85928 14.7995 6.05784 15.116 6.13116L19.5191 7.15091C20.4002 7.35499 20.7474 8.42356 20.1545 9.10661L17.1918 12.5196C16.9788 12.765 16.8744 13.0863 16.9025 13.41L17.2932 17.9127C17.3714 18.8138 16.4625 19.4742 15.6296 19.1214L11.4681 17.3583C11.1689 17.2316 10.8311 17.2316 10.5319 17.3583L6.37038 19.1214C5.53754 19.4742 4.62856 18.8138 4.70677 17.9127L5.09754 13.41C5.12563 13.0863 5.02124 12.765 4.80823 12.5196L1.8455 9.1066C1.25257 8.42356 1.59977 7.35499 2.48095 7.15091L6.88397 6.13116C7.20053 6.05784 7.47383 5.85928 7.64138 5.58087L9.97183 1.70846Z"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <p className="ml-3">{averageStars}</p>
                      </div>
                      <p className="max-w-md mb-8 mt-2 font-bold text-gray-700 dark:text-gray-400 border-t border-gray-300 capitalize">
                        {productData.desc}
                      </p>
                    </div>
                    <div className="border border-gray-300 p-5 mb-5 relative mt-30px font-roboto">
                      <div className="mt-2 ">
                        <div className="flex flex-wrap items-center">
                          <span className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4 text-gray-700 dark:text-gray-400 bi bi-truck" viewBox="0 0 16 16">
                              <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                            </svg>
                          </span>
                          <h2 className="text-lg font-bold text-gray-700 dark:text-gray-400">Vận chuyển</h2>
                        </div>
                        <ul>
                          <li className="text-cyan-400 font-thin">Giao hàng nhanh</li>
                          <li className="text-cyan-400 font-thin">Đổi trả trong 30 ngày</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-center mb-5 mt-5">
                      <h2 className="w-18 mr-6 text-lg font-bold dark:text-gray-400">Màu Sắc : </h2>
                      <div className="flex flex-wrap -mx-2 -mb-2">
                        {color?.map((item) => (
                          <button
                            key={item?._id}
                            className={`p-1 mb-2 mr-2 border ${selectedColor === item ? 'border-blue-400' : 'dark:border-gray-600'} hover:border-blue-400  hover:text-blue-600  dark:hover:border-gray-300 dark:text-gray-400`}
                            onClick={() => setSelectedColor(item)}
                          >
                            <div>{item?.value}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center mb-5">
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
                    <div className="flex items-center mb-8">
                      <h2 className="w-18 mr-6 text-lg font-bold dark:text-gray-400">Số Lượng Sản Phẩm Trong Kho : </h2>
                      <div className="flex flex-wrap -mx-2 -mb-2">
                        {selectedVariant?.quantity !== undefined ? (
                          selectedVariant.quantity <= 0 ? (
                            <span className="text-gray-500">Hết hàng</span>
                          ) : (
                            <span>{selectedVariant.quantity}</span>
                          )
                        ) : (
                          <span className="text-gray-500">Sản phẩm hết hàng</span>
                        )}
                      </div>
                    </div>
                    <div className="w-max mb-5 flex items-center gap-5">
                      <div className=" w-full font-bold leading-6 text-black  font-roboto">Số Lượng:</div>
                      <div className="relative flex flex-row w-28 h-10 mt-1 bg-transparent rounded-lg">
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
                      <div className="w-full px-4 mb-4  lg:mb-0">

                        <button
                          disabled={selectedVariant?.quantity <= 0}
                          className={`flex items-center justify-center w-full p-3  text-blue-500 border ${selectedVariant?.quantity <= 0 ? 'border-gray-300 text-gray-300 cursor-not-allowed' : 'border-blue-500'} rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover-bg-blue-700 dark:hover-border-blue-700 dark:hover-text-gray-300`}
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



