import { ICart } from "@/interface/cart";
import {
  useDeleteProductCartMutation,
  useGetAllProductCartsQuery,
  useQuantityPlusMutation,
} from "../../api/cart";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Empty, notification } from "antd";
import { MdClear } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";

type NotificationType = "success" | "info" | "warning" | "error";

const BodyCart = () => {
  const { data: carts } = useGetAllProductCartsQuery();
  const [deleteProductCart] = useDeleteProductCartMutation();
  const [updateQuantityPlus] = useQuantityPlusMutation();

  const [checkedItems, setCheckedItems] = useState<ICart[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const [userData, setUserData] = useState(localStorage);

  const totalPrice = checkedItems ? checkedItems?.reduce((total, item) => total + item.totalPrice, 0) : 0;

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUserData(userData);
    }
  }, []);

  const dataCart = carts?.data.filter(
    (item) => item?.userEmail == userData.email
  );

  const openNotification = (type: NotificationType, message: string) => {
    api[type]({
      message: "Thông báo",
      description: message,
    });
  };

  const updateQuantityPlusHandler = async (item: ICart) => {
    if (item.quantity < item.quantityStock) {
      await updateQuantityPlus({ ...item, quantity: item.quantity + 1 });
    } else {
      openNotification("warning", "Số lượng đã lớn nhất không thể thêm");
    }
  };

  const updateQuantityMinusHandler = async (item: ICart) => {
    if (item.quantity > 1) {
      await updateQuantityPlus({ ...item, quantity: item.quantity - 1 });
    } else {
      deleteProductCart(String(item._id));
      openNotification("success", "Xóa thành công");
    }
  };

  const handleCheckboxChange = (checked: boolean, item: ICart) => {
    if (checked) {
      setCheckedItems([...checkedItems, item]);
    } else {
      setCheckedItems(
        checkedItems.filter((checkedItem) => checkedItem !== item)
      );
    }
  };

  const deleteCart = (id: string) => {
    deleteProductCart(id);
    openNotification("success", "Xóa thành công");
  };

  return (
    <>
      {contextHolder}
      <div className="container mx-auto lg:grid lg:grid-cols-[2fr,1fr] gap-10 pb-32">
        <div className="pt-20 lg:pl-36">
          <h2 className="text-4xl text-center font-semibold font-sans leading-10 pb-5 text-slate-700">
            GIỎ HÀNG CỦA BẠN
          </h2>
          {dataCart?.length
            ? dataCart?.reverse().map((item: ICart) => (
              <div className="pt-7" key={item._id}>
                <div className="shadow-slate-800 border rounded-xl gap-3 grid grid-cols-1 lg:grid-cols-[5fr,10fr,1fr] overflow-hidden">
                  <img
                    className="w-full h-full object-cover bg-center"
                    src={item?.image}
                    alt=""
                  />
                  <div className="py-3 flex flex-col justify-between">
                    <Link to={`/detail/${item.productID}`}>
                      <p className="line-clamp-2 hover:underline hover:text-red-500">{item?.productName}</p>
                    </Link>
                    <div className="">
                      <div className="text-base font-semibold text-slate-600">Màu: <span className="text-orange-600">{item?.color}</span>, Kích cỡ: <span className="text-orange-600">{item.size}</span></div>
                      <div className="text-base font-semibold text-slate-600">Giá sản phẩm: <span className="text-base font-semibold text-red-500">{item.totalPrice.toLocaleString("vi-VN")}đ</span></div>
                      <div className="pb-2 text-slate-600 text-base font-semibold">
                        Số lượng có sẵn: {item?.quantityStock}
                      </div>
                      <div className="flex items-center">
                        <button
                          className="border border-gray-400 text-black px-2"
                          id="decrement"
                          onClick={() => updateQuantityMinusHandler(item)}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="w-10 text-center border border-gray-400"
                          id="quantity"
                          readOnly={true}
                          value={item && item.quantity}
                        />
                        <button
                          className="border border-gray-400 text-black px-2"
                          id="increment"
                          onClick={() => updateQuantityPlusHandler(item)}
                        >
                          +
                        </button>
                      </div>

                    </div>
                  </div>
                  <div className="py-3 flex flex-col justify-between items-center">
                    <MdClear className="w-6 h-6 cursor-pointer hover:fill-pink-500" onClick={() => deleteCart(String(item?._id))} />
                    <input
                      className="w-5 h-5 accent-blue-500"
                      type="checkbox"
                      onChange={(e) =>
                        handleCheckboxChange(e.target.checked, item)
                      }
                    />
                  </div>
                </div>
              </div>
            ))
            : <Empty className="mt-5" description={<span className="text-slate-600">Giỏ hàng của bạn đang trống</span>} image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        </div>
        <div className="pt-20 lg:pr-24">
          <div className="shadow-slate-800 rounded-md">
            <Link to={checkedItems.length ? "/cartDetail" : "/cart"} state={{ checkedItems }}>
              <div className={`${checkedItems.length ? "bg-black" : "bg-gray-500 cursor-not-allowed"} flex rounded-md justify-between items-center p-1 pl-3 pr-3 mr-1 mb-1`}>
                <div className="text-white text-base font-semibold font-sans leading-10">
                  THANH TOÁN
                </div>
                <IoIosArrowRoundForward className="w-10 h-10 fill-white" />
              </div>
            </Link>
          </div>
          <div className="pt-10 text-xl font-semibold font-sans leading-10 uppercase">
            TÓM TẮT hóa đơn
          </div>
          <div>
            <div className="flex justify-between items-center pt-5">
              <p className="text-gray-800">Giá sản phẩm </p>
              <span className="text-gray-900">
                {totalPrice.toLocaleString("vi-VN")}₫
              </span>
            </div>
            <div className="flex justify-between items-center pt-5 border-b pb-2">
              <p className="text-gray-800">Phí vận chuyển</p>
              <p className="text-gray-900">Miễn phí</p>
            </div>
            <div className="flex justify-between items-center pt-5">
              <p className="text-gray-800 text-lg font-semibold font-sans leading-10">
                Tổng Giá
              </p>
              <span className="text-gray-900">
                {totalPrice.toLocaleString("vi-VN")}₫
              </span>
            </div>
            <div className="pt-10">
              <div className="font-semibold font-sans leading-10">
                PHƯƠNG THỨC THANH TOÁN ĐƯỢC CHẤP NHẬN
              </div>
              <div className="flex pt-2 gap-2">
                <img
                  src="https://www.adidas.com.vn/static/checkout/react/e941f98/assets/img/payment-methods/icon-adidas-visa.svg"
                  alt=""
                />
                <img
                  src="https://www.adidas.com.vn/static/checkout/react/e941f98/assets/img/payment-methods/icon-adidas-master-card.svg"
                  alt=""
                />
                <img
                  src="https://www.adidas.com.vn/static/checkout/react/e941f98/assets/img/payment-methods/icon-adidas-cash-on-delivery.svg"
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

export default BodyCart;
