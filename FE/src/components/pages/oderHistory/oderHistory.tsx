import Banner from "../userinformation/banner";
import { useEffect, useState } from "react";
import { notification } from "antd";
import {
  useGetOrdersQuery,
  useUpdateOrderAdminMutation,
} from "@/api/orderedProduct";
import { Link } from "react-router-dom";
type NotificationType = "success" | "info" | "warning" | "error";

const OderHistory = () => {
  const { data: order } = useGetOrdersQuery();
  // console.log(order);
  const [updateOrder] = useUpdateOrderAdminMutation();

  const [userData, setUserData] = useState(localStorage);
  const [received, setReceived] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    const openNotification = (type: NotificationType, message: string) => {
      api[type]({
        message: "Thông báo",
        description: message,
      });
    };
    const params = new URLSearchParams(window.location.search);
    const vnp_TransactionStatus = params.get("vnp_TransactionStatus");
    const currentURL = window.location.href;
    if (currentURL !== "http://localhost:5174/oder&history") {
      if (vnp_TransactionStatus) {
        if (vnp_TransactionStatus == "00") {
          console.log("Thanh Toán Thành Công");
          openNotification("success", "Thanh Toán Thành Công");
        } else if (vnp_TransactionStatus != "00") {
          openNotification("error", "Bạn Đã Hủy Tanh Toán");
        }
      }
    }
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUserData(userData);
    }
  }, []);

  const orderCart = order?.filter((item) => item?.userEmail == userData.email);

  const reversedOrderCart = orderCart?.slice().reverse();
  console.log(reversedOrderCart);

  const handleReceive = (orderId) => {
    setReceived(true);
    api.success({
      message: "Thông báo",
      description: "Bạn đã xác nhận đã nhận được hàng.",
    });
  };

  const handleCancel = (orderId) => {
    console.log(orderId);
    updateOrder({ _id: orderId, status: "Hủy Đơn Hàng" });
    api.warning({
      message: "Thông báo",
      description: "Hủy Đơn Hàng",
    });
  };

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (index: any) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index: any) => {
    setRating(index);
  };

  const handleRatingSubmit = async (ProductID: string) => {
    try {
      if (rating === 0) {
        alert("Please select a rating.");
        return;
      }
      const newrate = {
        stars: rating,
        productID: ProductID,
        UserId: userData?._id,
      };

      await addReview(newrate)
        .unwrap()
        .then(() => alert("Đánh giá thành công"));

      setRating(0);

      console.log(`Rating ${rating} has been submitted.`);
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("An error occurred while submitting the rating. Please try again.");
    }
  };

  return (
    <>
      <Banner />
      {contextHolder}
      <div className="pt-20"></div>
      {reversedOrderCart?.map((orderItem: any) => (
        <div key={orderItem._id} className="pt-7 container mx-auto p-12">
          {orderItem?.products.map((product: any) => (
            <div key={product.productId}>
              <div className="shadow-slate-800 border rounded-xl gap-3 grid grid-cols-1 lg:grid-cols-[3fr,6fr,4fr,6fr,4fr]">
                <img
                  className="border rounded-xl w-full h-full"
                  alt=""
                  src={product.productImage}
                  width={"100%"}
                  height={"240px"}
                />
                <div className="p-5">
                  <div className="font-medium text-lg">
                    Mã đơn hàng: {orderItem?.orderCode}
                  </div>

                  <div className="font-medium text-lg">
                    Tên Sản Phẩm: {product.productName}
                  </div>
                  <div className="font-medium text-lg">
                    Giá sản phẩm:{" "}
                    <span className="text-red-500">
                      {product.productPrice?.toLocaleString("vi-VN")}VND
                    </span>
                  </div>
                  <div className="font-medium text-lg">
                    Màu Sản Phẩm:{" "}
                    <span className="pt-2 uppercase">
                      {product.productColor}
                    </span>
                  </div>
                  <div className="font-medium text-lg">
                    Kich Cỡ Sản Phẩm:{" "}
                    <span className="pt-5">{product.productSize}</span>
                  </div>
                  <div className="font-medium text-lg">
                    Số lượng Sản Phẩm:{" "}
                    <span className="pt-5">{product.productQuantity}</span>
                  </div>
                  <div className="font-medium text-lg">
                    Tổng giá Sản Phẩm:{" "}
                    <span className="pt-5 text-red-500">
                      {(
                        product?.productPrice * product?.productQuantity
                      )?.toLocaleString("vi-VN")}
                      VND
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  {orderItem.status !== "Hủy Đơn Hàng" && (
                    <>
                      <div className="pt-5 flex justify-center items-center font-medium text-lg">
                        Đánh giá sản phẩm
                      </div>
                      <div className="flex gap-5 justify-center pt-5 ">
                        {[...Array(5)].map((_, index) => (
                          <div
                            key={index}
                            onMouseOver={() => handleMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick(index + 1)}
                            style={{ cursor: "pointer" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill={
                                index + 1 <= (hoverRating || rating)
                                  ? "yellow"
                                  : "none"
                              }
                              stroke="black"
                              strokeWidth="1.5"
                            >
                              <path
                                d="M9.97183 1.70846C10.4382 0.933481 11.5618 0.933482 12.0282 1.70847L14.3586 5.58087C14.5262 5.85928 14.7995 6.05784 15.116 6.13116L19.5191 7.15091C20.4002 7.35499 20.7474 8.42356 20.1545 9.10661L17.1918 12.5196C16.9788 12.765 16.8744 13.0863 16.9025 13.41L17.2932 17.9127C17.3714 18.8138 16.4625 19.4742 15.6296 19.1214L11.4681 17.3583C11.1689 17.2316 10.8311 17.2316 10.5319 17.3583L6.37038 19.1214C5.53754 19.4742 4.62856 18.8138 4.70677 17.9127L5.09754 13.41C5.12563 13.0863 5.02124 12.765 4.80823 12.5196L1.8455 9.1066C1.25257 8.42356 1.59977 7.35499 2.48095 7.15091L6.88397 6.13116C7.20053 6.05784 7.47383 5.85928 7.64138 5.58087L9.97183 1.70846Z"
                                strokeWidth="1.5"
                              />
                            </svg>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => handleRatingSubmit(product.productID)}
                        className="mt-10 bg-blue-500 h-12 text-white rounded-xl hover:bg-blue-700"
                      >
                        Lưu Đánh Giá
                      </button>
                    </>
                  )}
                </div>

                <div>
                  <h3 className="flex justify-center pt-5 font-medium text-lg">
                    Trạng Thái Đơn Hàng
                  </h3>
                  <div className="flex gap-2">
                    <div className="border p-2 w-full text-center h-12 rounded-xl flex justify-center items-center mt-20">
                      {orderItem.status}
                    </div>
                    {orderItem.status === "Đơn Hàng Đã Giao Thành Công" &&
                      !received && (
                        <div
                          className="border w-full text-center h-12 rounded-xl flex justify-center items-center mt-20"
                          onClick={() => handleReceive(orderItem._id)}
                          style={{ cursor: "pointer" }}
                        >
                          Đã Nhận Được Hàng
                        </div>
                      )}
                    {orderItem.status === "Chưa Xác Nhận" && (
                      <div
                        className="border w-full text-center h-12 rounded-xl flex justify-center items-center mt-20 bg-red-500 text-white cursor-pointer"
                        onClick={() => handleCancel(orderItem._id)}
                      >
                        Hủy Đơn Hàng
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="flex justify-center pt-5 font-medium text-lg">
                    Thao Tác
                  </h3>
                  <div className="flex gap-10 justify-center">
                    <Link
                      to={{
                        pathname: "/cart",
                        state: {
                          category: product?.category,
                          color: product?.productColor,
                          image: product?.productImage,
                          initialPrice: product?.productInitialPrice,
                          price: product?.productPrice,
                          productID: product?.productId,
                          productName: product?.productName,
                          quantity: product?.productQuantity,
                          size: product?.productSize,
                          status: product?.status,
                          totalPrice: orderItem?.totalPrice,
                          userAddress: orderItem?.userAddress,
                          userEmail: orderItem?.userEmail,
                          userName: orderItem?.userName,
                        },
                      }}
                      className="mt-20 bg-blue-500 w-6/12 h-12 text-white rounded-xl hover:bg-blue-700"
                    >
                      <div className="flex mt-3 ml-8">Mua Lại</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default OderHistory;
