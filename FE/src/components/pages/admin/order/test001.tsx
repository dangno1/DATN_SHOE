import {
  useGetOrdersQuery,
  useSendEmailMutation,
  useUpdateOrderAdminMutation,
} from "@/api/orderedProduct";
import { SetStateAction, useState } from "react";
import { useParams } from "react-router-dom";
import { notification } from "antd";
type NotificationType = "success" | "info" | "warning" | "error";

const Test001 = () => {
  const [sendEmail] = useSendEmailMutation();
  const { data: orders } = useGetOrdersQuery();
  const { id } = useParams();
  const [updateOrder] = useUpdateOrderAdminMutation();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [statusHistory, setStatusHistory] = useState<string[]>([]);

  const data = orders?.filter((item) => item?._id == id);
  // console.log(data?.[0].status);
  // console.log(data?.[0].products);

  const handleStatusChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedStatus(e.target.value);
  };

  console.log(selectedStatus);

  const handleUpdate = async () => {
    const openNotification = (type: NotificationType, message: string) => {
      api[type]({
        message: "Thông báo",
        description: message,
      });
    };
    if (selectedStatus == data?.[0].status) {
      openNotification("error", "Bạn Chưa Thay Đổi Trạng Thái");
    } else {
      // try {
      await updateOrder({
        _id: id,
        status: selectedStatus,
        userName: data?.[0]?.userName,
        userEmail: data?.[0]?.userEmail,
        userAddress: data?.[0]?.userAddress,
        productName: "",
        quantity: 0,
        price: 0,
        initialPrice: 0,
        totalPrice: 0,
        category: "",
        image: "",
        color: "",
      });

      await sendEmail({
        userEmail: data?.[0].userEmail,
        status: selectedStatus,
      }).unwrap();
      setStatusHistory((prevHistory) => [...prevHistory, selectedStatus]);
      openNotification("success", "Thanh Đổi Trạng Thái Thành Công");
    }
  };

  return (
    <>
      {contextHolder}
      <div className="p-5">
        <h3 className="mb-8 font-bold text-3xl uppercase text-slate-700">
          Chi Tiết Đơn Hàng
        </h3>
        <div className="bg-white p-5 rounded-lg">
          <div className="flex justify-between flex-wrap">
            {data?.[0].products?.map((item: any) => (
              <div className="flex mt-2 border rounded-xl" key={item._id}>
                <img
                  className="border rounded-xl"
                  alt=""
                  src={item.productImage}
                  width={"215px"}
                  height={"215px"}
                />
                <div className="p-5">
                  <div className="font-medium text-lg">
                    Mã đơn hàng: {data?.[0].orderCode}
                  </div>

                  <div className="font-medium text-lg">
                    Tên Sản Phẩm: {item?.productName}
                  </div>
                  <div className="font-medium text-lg">
                    Giá Sản phẩm:{" "}
                    <span className="text-red-500">
                      {item.productPrice?.toLocaleString("vi-VN")}VND
                    </span>
                  </div>
                  <div className="font-medium text-lg">
                    Màu Sản Phẩm:{" "}
                    <span className="pt-2">{item?.productColor}</span>
                  </div>

                  <div className="font-medium text-lg">
                    Khích cỡ Sản Phẩm:{" "}
                    <span className="pt-5">{item?.productSize}</span>
                  </div>
                  <div className="font-medium text-lg">
                    Số lượng Sản Phẩm:{" "}
                    <span className="pt-5">{item?.productQuantity}</span>
                  </div>
                  <div className="font-medium text-lg">
                    Tổng giá Sản Phẩm:{" "}
                    <span className="pt-5 text-red-500">
                      {(
                        item?.productPrice * item?.productQuantity
                      )?.toLocaleString("vi-VN")}
                      VND
                    </span>
                  </div>
                  <div className="font-medium text-lg">
                    Trạng thái đơn hàng:{" "}
                    <span className="pt-5">{data?.[0].status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div></div>
          <div className="flex gap-10 mt-10 w-full justify-between">
            <div className="w-6/12">
              <h3 className="mb-8 font-bold text-3xl uppercase text-slate-700">
                Khách Hàng
              </h3>
              <div>
                <label className="text-slate-600 font-semibold">
                  Tên Khách Hàng
                </label>
                <input
                  readOnly
                  className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] bg-slate-200 outline-white focus:outline-0
                font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px]
               focus:shadow-full"
                  type="text"
                  placeholder="Tên Khách Hàng"
                  value={data?.[0]?.userName}
                />
              </div>

              <div className="pt-5">
                <label className="text-slate-600 font-semibold">
                  Email Khách Hàng
                </label>
                <input
                  readOnly
                  className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] bg-slate-200 outline-white focus:outline-0
                font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px]
               focus:shadow-full"
                  type="text"
                  placeholder="Email Khách Hàng"
                  value={data?.[0]?.userEmail}
                />
              </div>

              <div className="pt-5">
                <label className="text-slate-600 font-semibold">
                  Số Điện Thoại Khách Hàng
                </label>
                <input
                  readOnly
                  className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] bg-slate-200 outline-white focus:outline-0
                font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px]
               focus:shadow-full"
                  type="text"
                  placeholder="Số  Điện Thoại Khách Hàng"
                  value={data?.[0]?.userPhone}
                />
              </div>

              <div className="pt-5">
                <label className="text-slate-600 font-semibold">
                  Địa Chỉ Khách Hàng
                </label>
                <input
                  readOnly
                  className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] bg-slate-200 outline-white focus:outline-0
                font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px]
               focus:shadow-full"
                  type="text"
                  placeholder="Địa Chỉ Khách Hàng"
                  value={data?.[0]?.userAddress}
                />
              </div>
            </div>
            <div className="w-6/12">
              <h3 className="mb-12 font-bold text-3xl uppercase text-slate-700">
                Thay Đổi Trạng Thái
              </h3>
              <select
                onChange={handleStatusChange}
                className="mt-2 w-full h-[48px] mt-[5px] ocus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full"
              >
                <option value="Chưa Xác Nhận">Chưa Xác Nhận</option>
                <option value="Đã Xác Nhận">Đã Xác Nhận</option>
                <option value="Đơn Hàng Đang Giao Đến Bạn">
                  Đơn Hàng Đang Giao Đến Bạn
                </option>
                <option value="Đơn Hàng Đã Giao Thành Công">
                  Đơn Hàng Đã Giao Thành Công
                </option>
                <option value="Hủy Đơn Hàng">Hủy Đơn Hàng</option>
              </select>
              <button
                onClick={handleUpdate}
                type="submit"
                className="mt-5 !bg-[#58b4ff] !shadow-none p-4 pl-10 pr-10 text-white hover:bg-blue-700 rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full"
              >
                Cập Nhật
              </button>
              <div className="mt-10">
                <h3 className="mb-8 font-bold text-3xl uppercase text-slate-700">
                  Lịch Sử Thay Đổi Trạng Thái Đơn Hàng
                </h3>
                <div className="timeline flex">
                  {statusHistory.map((status, index) => (
                    <div key={index} className="flex items-center">
                      <div className="bg-blue-500 text-white px-4 py-2 rounded mr-4">
                        {status}
                      </div>
                      <div className="mr-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="15"
                          viewBox="0 0 17 10"
                          fill="none"
                        >
                          <path
                            d="M12 9L15.2929 5.70711C15.6834 5.31658 15.6834 4.68342 15.2929 4.29289L12 1M15 5L1 5"
                            stroke="#2B3F6C"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Test001;
