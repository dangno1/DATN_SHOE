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
    updateOrder({ _id: orderId, status: "Đã Nhận Được Hàng" });
  };

  const handleCancel = (orderId) => {
    console.log(orderId);
    updateOrder({ _id: orderId, status: "Hủy Đơn Hàng" });
    api.warning({
      message: "Thông báo",
      description: "Hủy Đơn Hàng",
    });
  };

  // const [rating, setRating] = useState(0);
  // const [hoverRating, setHoverRating] = useState(0);

  // const handleMouseOver = (index: any) => {
  //   setHoverRating(index);
  // };

  // const handleMouseLeave = () => {
  //   setHoverRating(0);
  // };

  // const handleClick = (index: any) => {
  //   setRating(index);
  // };

  // const handleRatingSubmit = async (ProductID: string) => {
  //   try {
  //     if (rating === 0) {
  //       alert("Please select a rating.");
  //       return;
  //     }
  //     const newrate = {
  //       stars: rating,
  //       productID: ProductID,
  //       UserId: userData?._id,
  //     };

  //     await addReview(newrate)
  //       .unwrap()
  //       .then(() => alert("Đánh giá thành công"));

  //     setRating(0);

  //     console.log(`Rating ${rating} has been submitted.`);
  //   } catch (error) {
  //     console.error("Error submitting rating:", error);
  //     alert("An error occurred while submitting the rating. Please try again.");
  //   }
  // };

  return (
    <>
      <Banner />
      {contextHolder}
      <div className="pt-20"></div>
      {reversedOrderCart?.map((orderItem: any) => (
        <div key={orderItem._id} className="pt-7 container mx-auto p-12">
          {orderItem?.products.map((product: any) => (
            <div key={product.productId}>
              <div className="shadow-slate-800 border rounded-xl gap-3 grid grid-cols-1 lg:grid-cols-[3fr,4fr,6fr,4fr]">
                <Link to={`/detail/${product?.productID}`}>
                  <img
                    className="border rounded-xl w-full h-full"
                    alt=""
                    src={product.productImage}
                    width={"100%"}
                    height={"240px"}
                  />
                </Link>
                <Link to={`/detail/${product?.productID}`}>
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
                </Link>
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
                          productID: product?.productId,
                        },
                      }}
                      className="mt-20 bg-blue-500 w-6/12 h-12 text-white rounded-xl hover:bg-blue-700"
                    >
                      <div className="flex mt-3 ml-12">Mua Lại</div>
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
