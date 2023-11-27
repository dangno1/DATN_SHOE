import { useGetOrdersQuery } from "@/api/orderedProduct";
import { useParams } from "react-router-dom";

const Test002 = () => {
  const { data: orders } = useGetOrdersQuery();
  const { id } = useParams();

  const data = orders?.filter((item) => item?._id == id);
  const product = data?.[0]?.products;

  return (
    <>
      <div className="p-5">
        <h3 className="mb-8 font-bold text-3xl uppercase text-slate-700">
          Chi Tiết Đơn Hàng
        </h3>
        <div className="grid grid-cols-2 gap-[50px] bg-white p-5 rounded-lg">
          <div>
            <h3 className="mb-8 font-bold text-3xl uppercase text-slate-700">
              Sản Phẩm
            </h3>
            <div>
              <label className="text-slate-600 font-semibold">
                Mã Đơn Hàng
              </label>
              <input
                readOnly
                className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  ocus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full"
                type="text"
                placeholder="Mã Đơn Hàng"
                value={data?.[0]?.orderCode}
              />
            </div>

            <div className="pt-5">
              <label className="text-slate-600 font-semibold">
                Tên Sản Phẩm
              </label>
              <input
                readOnly
                className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  ocus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full"
                type="text"
                placeholder="Tên Sản Phẩm"
                value={product?.[0]?.productName}
              />
            </div>

            <div className="pt-5">
              <label className="text-slate-600 font-semibold">
                Kích Cỡ Sản Phẩm
              </label>
              <input
                readOnly
                className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  ocus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full"
                type="text"
                placeholder="Kích Cỡ Sản Phẩm"
                value={product?.[0]?.productSize}
              />
            </div>
            <div className="pt-5">
              <label className="text-slate-600 font-semibold block">
                Hình ảnh
              </label>
              <div className="min-h-[110px] max-h-[150px] border border-slate-300 rounded-md mt-[5px] p-4">
                <img
                  className="border border-slate-300 rounded-md"
                  src={product?.[0]?.productImage}
                  alt=""
                  width={"100px"}
                  height={"100px"}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="pt-20">
              <label className="text-slate-600 font-semibold">
                Màu Sản Phẩm
              </label>
              <input
                readOnly
                className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  ocus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full"
                type="text"
                placeholder="Màu Sản Phẩm"
                value={product?.[0]?.productColor}
              />
            </div>

            <div className="pt-5">
              <label className="text-slate-600 font-semibold">
                Giá Sản Phẩm
              </label>
              <input
                readOnly
                type="text"
                placeholder="Giá Sản Phẩm"
                className={`w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0
                focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px]
                focus:shadow-full`}
                value={product?.[0]?.productInitialPrice}
              />
            </div>

            <div className="pt-5">
              <label className="text-slate-600 font-semibold">
                Số Lượng Sản Phẩm
              </label>
              <input
                readOnly
                type="text"
                placeholder="Số Lượng Sản Phẩm"
                className={`w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0
                focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px]
                focus:shadow-full`}
                value={product?.[0]?.productQuantity}
              />
            </div>

            <div className="pt-5">
              <label className="text-slate-600 font-semibold">
                Tổng Giá Sản Phẩm
              </label>
              <input
                readOnly
                type="text"
                placeholder="Tổng Giá Sản Phẩm"
                className={`w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0
                focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px]
                focus:shadow-full`}
                value={product?.[0]?.productPrice}
              />
            </div>

            <div className="pt-5">
              <label className="text-slate-600 font-semibold">
                Trạng Thái Đơn Hàng
              </label>
              <input
                readOnly
                type="text"
                placeholder="Trạng Thái Đơn Hàng"
                className={`w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0
                focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px]
                focus:shadow-full`}
                value={data?.[0]?.status}
              />
            </div>
          </div>

          <div>
            <h3 className="mb-8 font-bold text-3xl uppercase text-slate-700">
              Khách Hàng
            </h3>
            <div>
              <label className="text-slate-600 font-semibold">
                Tên Khách Hàng
              </label>
              <input
                readOnly
                className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  ocus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full"
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
                className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  ocus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full"
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
                className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  ocus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full"
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
                className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  ocus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full"
                type="text"
                placeholder="Địa Chỉ Khách Hàng"
                value={data?.[0]?.userAddress}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Test002;
