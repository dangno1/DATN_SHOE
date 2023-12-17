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
import { useCreateCartMutation, useGetAllProductCartsQuery, useQuantityPlusMutation } from "@/api/cart";
import { ICart } from "@/interface/cart";
import { notification } from "antd";
import { IColor } from "@/interface/color";
import { ISize } from "@/interface/size";
import { LiaShippingFastSolid } from "react-icons/lia";
import { Divider, Rating } from "@mui/material";
import { IProduct } from "@/interface/product";
import Similarproduct from "./Similarproduct";

type NotificationType = 'success' | 'info' | 'warning' | 'error';


const Inforproduct = () => {
  const { id } = useParams();

  const { data: sizeData } = useGetSizesQuery()
  const { data: colorData } = useGetColorsQuery()
  const { data: productData, isLoading } = useGetProductQuery(id || '');
  const [addCart] = useCreateCartMutation();
  const { data: cartData } = useGetAllProductCartsQuery()
  const [updateCart] = useQuantityPlusMutation()

  const [amount, setAmount] = useState(1);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [userData, setUserData] = useState(localStorage);
  const [selectedVariant, setSelectedVariant] = useState<{ color?: IColor, size?: ISize } | null>(null);

  const size = [...new Set(productData?.variants?.flatMap((item: IProduct['variants'][0]) => sizeData?.map(
    (sizeItem: ISize) => {
      if (item?.sizeId == sizeItem._id) {
        return sizeItem._id
      }
    }
  )))];

  const color = [...new Set(productData?.variants?.flatMap((item: IProduct['variants'][0]) => colorData?.map(
    (colorItem: IColor) => {
      if (item?.colorId == colorItem._id) {
        return colorItem._id
      }
    }
  )))];

  const price = [...new Set(productData?.variants.flatMap((variants: IProduct['variants'][0]) => {
    if (variants.discount) {
      return variants.discount
    } else return variants.price
  }))]

  const quantityColor = color.map(id => productData?.variants.find((variants: IProduct['variants'][0]) => variants.colorId == id && variants.quantity)).filter(item => item != undefined)
  const quantitySize = size.map(id => productData?.variants.find((variants: IProduct['variants'][0]) => variants.sizeId == id && variants.quantity)).filter(item => item != undefined)

  const totalAmountSold = productData?.variants.reduce((total, variant) => total + variant.amountSold, 0);

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

  const [variants, setVariants] = useState<IProduct['variants'][0] | undefined>();

  useEffect(() => {
    if (selectedVariant?.color?._id && selectedVariant?.size?._id) {
      const matchingVariant = productData?.variants?.find(
        (variant) =>
          variant.sizeId === selectedVariant?.size?._id &&
          variant.colorId === selectedVariant?.color?._id
      );
      setVariants(matchingVariant);
    } else {
      setVariants(undefined);
    }
  }, [productData?.variants, selectedVariant]);

  const navigate = useNavigate();
  const handleAddCar = async () => {
    if (!userData.username || !userData.email || !userData.address) {
      openNotification('warning', "Bạn chưa có tài khoản. Vui lòng đăng nhập hoặc đăng ký để thêm sản phẩm vào giỏ hàng.");
      setTimeout(() => {
        navigate("/signup");
      }, 1500);
      return;
    }
    if (!selectedVariant?.color?._id) {
      openNotification('warning', "Vui lòng chọn màu sắc trước khi thêm vào giỏ hàng");
      return;
    }
    if (!selectedVariant.size?._id) {
      openNotification('warning', "Vui lòng chọn size trước khi thêm vào giỏ hàng.");
      return;
    }
    if (productData && selectedVariant?.color?._id && selectedVariant?.size?._id) {
      const productToAdd: ICart = {
        userName: userData.fullname,
        userEmail: userData.email,
        userAddress: userData.address,
        productName: productData.name,
        quantity: amount,
        price: Number(variants?.discount),
        initialPrice: Number(variants?.price),
        size: selectedVariant.size.value,
        totalPrice: amount * Number(variants?.discount) || Number(variants?.price),
        category: productData.categoryId,
        image: String(productData.image),
        color: selectedVariant.color.value,
        status: String(productData.variants[0].status),
        productID: String(productData?._id),
        quantityStock: Number(variants?.quantity),
        variantsId: String(variants?._id),
        quantityAvailable: Number(variants?.quantity) || 0,
        amountSold: Number(variants?.amountSold)
      };

      const duplicateCart = cartData?.data?.find((cart) =>
        cart.productID == productData._id
        && cart.color == selectedVariant.color?.value
        && cart.size == selectedVariant.size?.value)

      if (duplicateCart?._id) {
        console.log(variants?.quantity);
        const quantityCart = (duplicateCart.quantity + amount > Number(variants?.quantity) ? Number(variants?.quantity) : (duplicateCart.quantity + amount))
        await updateCart({ ...duplicateCart, quantity: quantityCart })
        openNotification('success', "Đã thêm sản phẩm vào giỏ hàng thành công");
        return
      }
      const data = await addCart(productToAdd);
      data && openNotification('success', "Đã thêm sản phẩm vào giỏ hàng thành công");

    }
  };

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const listImage = [productData?.image, ...(productData?.thumbnail ? productData.thumbnail : [])].filter(Boolean);
    setImages(listImage.map(String));
  }, [productData]);

  const increaseAmount = () => {
    variants && amount < variants.quantity && setAmount(amount + 1);
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
            <div className="container m-auto">
              <div className="grid grid-cols-[40%,auto] gap-[30px]">
                <div className="">
                  <div className="image_one mb-2">
                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper select-none">
                      {images?.map((item, index: number) => (
                        <SwiperSlide key={index}>
                          <img
                            src={item}
                            className="max-h-[400px] w-full object-cover bg-center"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="">
                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper select-none" slidesPerView={4} spaceBetween={10}>
                      {images?.map((item, index: number) => (
                        <SwiperSlide key={index}>
                          <img
                            src={item}
                            className="max-h-[120px] object-cover bg-center"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
                <div className="w-full">
                  <div>
                    <div>
                      <h2 className="mt-2 text-xl line-clamp-3">{productData.name}</h2>
                      <div className="h-[50px] flex items-center text-base text-slate-700">
                        {<span className="pr-5 border-r border-r-slate-500 text-red-500 text-lg flex items-center gap-x-2 underline">
                          0.0 <Rating name="size-small" value={0} disabled size="medium" />
                        </span>}
                        <span className="px-5 border-r border-r-slate-500">Chưa có đánh giá</span>
                        <span className="px-5">Đã bán {totalAmountSold}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[27px] font-bold text-red-500 bg-orange-50 px-5">
                        {variants
                          ? <>
                            {variants.discount && <span> {variants?.discount?.toLocaleString("vi-VN")} VND</span>}
                            <span className={`${variants.discount && "ml-2 text-base font-normal text-gray-500 line-through"}`}>
                              {variants?.price.toLocaleString("vi-VN")} VND
                            </span>
                          </>
                          : <span>
                            {price.length > 1 ? ` ${Math.min(...price).toLocaleString("vi-VN")} VND - ${Math.max(...price).toLocaleString("vi-VN")} VND` : `${price[0].toLocaleString("vi-VN")} VND`}
                          </span>}
                      </div>
                    </div>
                    <div className="my-5">
                      <div className="mt-2">
                        <div className="flex flex-wrap items-center gap-x-2">
                          <span className="">
                            <LiaShippingFastSolid className="w-6 h-6 fill-[#30ae9e]" />
                          </span>
                          <h2 className="text-base font-semibold text-[#30ae9e]">Miễn phí vận chuyển</h2>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mb-5 mt-5">
                      <h2 className="w-20 mr-6 text-lg font-semibold">Màu Sắc : </h2>
                      <div className="flex flex-wrap -mx-2 -mb-2">
                        {
                          color.map((id) => {
                            const colorId = selectedVariant?.size?._id ? [...new Set(productData.variants.flatMap((variants: IProduct['variants'][0]) => {
                              if (variants.sizeId == selectedVariant?.size?._id && variants.quantity) {
                                return variants.colorId
                              }
                            }))] : color

                            return colorData?.map((item: IColor) => {
                              if (String(item._id) == String(id)) {
                                const existVariant = productData.variants.filter(variant => variant.colorId == id && variant.quantity)
                                return (
                                  <button
                                    disabled={existVariant.length && colorId.filter(colorId => colorId == id).length ? false : true}
                                    key={item?._id}
                                    className={`py-2 px-5 mb-2 mr-4 border border-gray-300 w-max ${existVariant.length && colorId.filter(colorId => colorId == id).length ? (selectedVariant?.color?._id === id ? '!border-red-500 text-red-500' : 'hover:border-red-500') : 'cursor-not-allowed !bg-gray-300 text-gray-500'}`}
                                    onClick={() => selectedVariant?.color?._id == id ? setSelectedVariant({ ...selectedVariant, color: undefined }) : setSelectedVariant({ ...selectedVariant, color: item })}
                                  >
                                    {item?.value}
                                  </button>
                                )
                              }
                            })
                          })
                        }
                      </div>
                    </div>
                    <div className="flex items-center mb-5">
                      <h2 className="w-20 mr-6 text-lg font-semibold">Kích Cỡ : </h2>
                      <div className="flex flex-wrap -mx-2 -mb-2">
                        {
                          size.map((id) => {
                            const sizeId = selectedVariant?.color?._id ? [...new Set(productData.variants.flatMap((variants: IProduct['variants'][0]) => {
                              if (variants.colorId == selectedVariant?.color?._id && variants.quantity) {
                                return variants.sizeId
                              }
                            }))] : size
                            return sizeData?.map((item: ISize) => {
                              if (String(item._id) == String(id)) {
                                const existVariant = productData.variants.filter(variant => variant.sizeId == id && variant.quantity)
                                return (
                                  <button
                                    disabled={existVariant.length && sizeId.filter(sizeId => sizeId == id).length ? false : true}
                                    key={item?._id}
                                    className={`py-2 px-5 mb-2 mr-4 border border-gray-300 w-max ${existVariant.length && sizeId.filter(sizeId => sizeId == id).length ? (selectedVariant?.size?._id === id ? '!border-red-500 text-red-500' : 'hover:border-red-500') : 'cursor-not-allowed !bg-gray-300 text-gray-500'}`}
                                    onClick={() => selectedVariant?.size?._id == id ? setSelectedVariant({ ...selectedVariant, size: undefined }) : setSelectedVariant({ ...selectedVariant, size: item })}
                                  >
                                    {item?.value}
                                  </button>
                                )
                              }
                            })
                          })
                        }
                      </div>
                    </div>
                    <div className="flex items-center mb-8">
                      <h2 className="w-18 mr-6 text-lg font-semibold">{!quantitySize.length && !quantityColor.length ? 'Sản phẩm đã hết hàng' : `Số lượng sản phẩm có sẵn : ${variants ? variants?.quantity : '...'}`}</h2>
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
                      <div className="w-[250px] px-4 mb-4 lg:mb-0">
                        <button
                          disabled={quantitySize.length && quantityColor.length ? false : true}
                          className={`flex items-center justify-center w-full p-3  text-red-500 border bg-[#ffeee8] ${quantitySize.length && quantityColor.length ? 'border-red-500' : 'cursor-not-allowed'} rounded-md hover:bg-orange-50`}
                          onClick={() => handleAddCar()}
                        >
                          Thêm vào giỏ hàng<AiOutlineShoppingCart className="w-5 h-5" />
                        </button>


                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full overflow-hidden">
                <Divider key={1} textAlign="center" className="!mt-[40px] text-[24px] font-semibold uppercase">Mô tả sản phẩm</Divider>
                <div dangerouslySetInnerHTML={{ __html: String(productData.desc) }} className="text-lg mt-[20px]" />
              </div>
            </div>
          )
        )}
      </section >
      <Similarproduct categoryId={productData ? productData.categoryId : ''} productId={productData ? String(productData._id) : ''} />
    </div >
  );
};

export default Inforproduct;


