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
import { IColor } from "@/interface/color";
import { ISize } from "@/interface/size";
import { notification } from "antd";
import { IProduct } from "@/interface/product";

const Inforproduct = () => {
  const { id } = useParams<{ id: string }>();
  const { data: sizeData } = useGetSizesQuery()
  const { data: colorData } = useGetColorsQuery()
  const { data: productData, isLoading } = useGetProductQuery(id || '');
  console.log(productData);


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
        openNotification('error', "Sản phẩm không có sẵn trong kho. Vui lòng chọn một biến thể khác.");
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
  const [images, setImage] = useState<(File | File[] | undefined)[]>()
  useEffect(() => {
    const listImage = [productData?.image, ...(productData?.thumbnail ? productData.thumbnail : [])]
    setImage(listImage)
  }, [productData])

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
      {notificationVisible}
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
                          disabled={selectedVariant?.quantity <= 0}
                          className={`flex items-center justify-center w-full p-4 text-blue-500 border ${selectedVariant?.quantity <= 0 ? 'border-gray-300 text-gray-300 cursor-not-allowed' : 'border-blue-500'} rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover-bg-blue-700 dark:hover-border-blue-700 dark:hover-text-gray-300`}
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