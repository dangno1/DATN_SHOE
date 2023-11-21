import {
  useCheckoutMutation,
  useGetOrdersQuery,
  useOrderedProductMutation,
  useUpdateorderMutation,
} from "@/api/orderedProduct";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CartDetail = () => {
  const [orderedProduct] = useOrderedProductMutation();
  const { data: getOrders } = useGetOrdersQuery();
  const [updateOrder] = useUpdateorderMutation();
  const [checkOut] = useCheckoutMutation();
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const checkedItems = location.state.checkedItems;

  // user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  useEffect(() => {
    if (checkedItems && checkedItems.length > 0) {
      const firstItem = checkedItems[0];
      setName(firstItem.userName);
      setEmail(firstItem.userEmail);
      setPhoneNumber(firstItem.phoneNumber);
      setAddress(firstItem.userAddress);
    }
  }, [checkedItems]);
  let totalPrice = 0;
  checkedItems.forEach((element: { price: number }) => {
    totalPrice += element.price;
  });

  const handleOrder = async () => {
    setErrors({});
    setIsModalOpen(false);
    if (!name || !email || !phoneNumber || !address) {
      const newErrors = {
        name: !name ? "Tên không được bỏ trống" : null,
        email: !email ? "Email không được bỏ trống" : null,
        phoneNumber: !phoneNumber ? "Số điện thoại không được bỏ trống" : null,
        address: !address ? "Địa chỉ không được bỏ trống" : null,
      };

      if (name) {
        if (/\d/.test(name)) {
          newErrors.name = "Tên Không Được Chứa Số";
        }
        if (!name.replace(/\s/g, "").length) {
          newErrors.name = "Tên không được toàn khoảng trắng";
        }
        if (name.length < 6) {
          newErrors.name = "Tên phải dài ít nhất 6 ký tự";
        }
      }

      if (email) {
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailPattern.test(email)) {
          newErrors.email = "Email không có định dạng hợp lệ";
        }
      }

      if (phoneNumber) {
        const phoneNumberPattern = /^\d{10}$/;
        if (phoneNumber.length < 10) {
          newErrors.phoneNumber = "Số điện thoại Phải đúng 10 số";
        }
        if (
          !phoneNumberPattern.test(phoneNumber) ||
          phoneNumber.includes(" ")
        ) {
          newErrors.phoneNumber = "Số điện thoại không ở định dạng hợp lệ";
        }
      }

      setErrors(newErrors);
      return;
    }

    const productsArray = checkedItems.map(
      (item: {
        productName: unknown;
        initialPrice: unknown;
        price: unknown;
        image: unknown;
        color: unknown;
        size: unknown;
        quantity: unknown;
        otp: unknown;
      }) => ({
        productName: item?.productName,
        productInitialPrice: item?.initialPrice,
        productPrice: item?.price,
        productImage: item?.image,
        productColor: item?.color,
        productSize: item?.size,
        productQuantity: item?.quantity,
        otp: item?.otp,
      })
    );

    const orderData = {
      userName: name,
      userEmail: email,
      userPhone: phoneNumber,
      userAddress: address,
      products: productsArray,
      paymentMethod: selectedPaymentMethod,
      status: "Chờ Xác Nhận",
    };

    console.log(orderData.paymentMethod);
    // return
    

    if (orderData.paymentMethod == "Paymentondelivery") {
      orderedProduct(orderData);
      openModal();
      return;
    } else {
      orderedProduct(orderData);
      checkOut(orderData)
        .then((orderData) => {
          window.location.href = orderData.data;
        })
        .catch((error) => {
          console.error("Checkout failed:", error);
        });
    }
  };

  const checOTP = () => {
    const orders = getOrders || [];
    const lastOrder = orders[orders.length - 1];
    console.log(lastOrder);

    if (lastOrder && lastOrder.otp === otpValue) {
      updateOrder(lastOrder);
      window.location.href = "http://localhost:5173/oder&history?vnp_TransactionStatus=00"
    } else {
      alert("Mã OTP Không Hợp Lệ");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.href = "http://localhost:5173/oder&history?vnp_TransactionStatus=01"
  };
  return (
    <>
      <div className="container mx-auto lg:grid lg:grid-cols-[2fr,1fr]  lg:gap-20 pb-32">
        <div className="pt-20 lg:pl-36">
          <div className="text-2xl font-semibold font-sans leading-10">
            THỔNG TIN ĐỊA CHỈ GIAO HÀNG
          </div>
          <div className="pt-5">
            <input
              className="border w-full p-4"
              type="text"
              placeholder="Họ Và Tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="text-red-500 pl-1">{errors?.name}</div>
          <div className="pt-5">
            <input
              className="border w-full p-4"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="text-red-500 pl-1">{errors?.email}</div>
          <div className="pt-5">
            <input
              className="border w-full p-4"
              type="text"
              placeholder="Số điện thoại"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="text-red-500 pl-1">{errors?.phoneNumber}</div>
          <div className="pt-5">
            <input
              className="border w-full p-4"
              type="text"
              placeholder="Địa Chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="text-red-500 pl-1">{errors?.address}</div>
          <div className="pt-5">
            <select
              className="border w-full p-4"
              name="paymentMethod"
              id="paymentMethod"
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            >
               <option value={""}>-Chọn một phương thức thanh toán-</option>
              <option value={"Paymentondelivery"}>Thanh Toán Khi Nhận Hàng</option>
              <option value={"NCB"}>NCB</option>
              <option value={"VISA"}>VISA</option>
              <option value={"MasterCard"}>MasterCard</option>
              <option value={"JCB"}>JCB</option>
            </select>
          </div>
          <div className="text-3xl font-semibold font-sans leading-10 pt-20">
            LỰA CHỌN HÀNG ĐẦU DÀNH CHO BẠN
          </div>

          <div className="flex gap-2">
            <div className="pt-10">
              <div className="relative shadow-slate-800 border rounded-x">
                <img
                  src="https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/d24a194891044c1fb0a17d049d19b86a_9366/IE9704_01_standard.jpg"
                  alt=""
                  width={"100%"}
                />
                <svg
                  className="absolute top-4 right-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  viewBox="0 0 37 37"
                  fill="none"
                >
                  <path
                    d="M25.7266 4.625C22.742 4.625 20.1289 5.90844 18.5 8.07785C16.8711 5.90844 14.258 4.625 11.2734 4.625C8.89767 4.62768 6.61998 5.57263 4.94006 7.25256C3.26013 8.93248 2.31518 11.2102 2.3125 13.5859C2.3125 23.7031 17.3134 31.8923 17.9522 32.2305C18.1206 32.321 18.3088 32.3685 18.5 32.3685C18.6912 32.3685 18.8794 32.321 19.0478 32.2305C19.6866 31.8923 34.6875 23.7031 34.6875 13.5859C34.6848 11.2102 33.7399 8.93248 32.0599 7.25256C30.38 5.57263 28.1023 4.62768 25.7266 4.625ZM18.5 29.8891C15.8609 28.3512 4.625 21.3458 4.625 13.5859C4.62729 11.8234 5.32849 10.1336 6.57482 8.88732C7.82114 7.64099 9.51087 6.93979 11.2734 6.9375C14.0846 6.9375 16.4448 8.43484 17.4305 10.8398C17.5176 11.0519 17.6658 11.2333 17.8562 11.3609C18.0466 11.4886 18.2707 11.5568 18.5 11.5568C18.7293 11.5568 18.9534 11.4886 19.1438 11.3609C19.3342 11.2333 19.4824 11.0519 19.5695 10.8398C20.5552 8.43051 22.9154 6.9375 25.7266 6.9375C27.4891 6.93979 29.1789 7.64099 30.4252 8.88732C31.6715 10.1336 32.3727 11.8234 32.375 13.5859C32.375 21.3343 21.1362 28.3498 18.5 29.8891Z"
                    fill="black"
                  ></path>
                </svg>
                <span className="absolute bottom-16 left-2 bg-white">
                  1,050,000₫
                </span>
                <div className="pt-6 pb-5 pl-2">Alphaboost V1 Shoes</div>
              </div>
            </div>
            <div className="pt-10">
              <div className="relative shadow-slate-800 border rounded-x">
                <img
                  src="https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/c6875e65e704417daeccb1d414cb5e21_9366/IG8980_01_standard.jpg"
                  alt=""
                  width={"100%"}
                />
                <svg
                  className="absolute top-4 right-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  viewBox="0 0 37 37"
                  fill="none"
                >
                  <path
                    d="M25.7266 4.625C22.742 4.625 20.1289 5.90844 18.5 8.07785C16.8711 5.90844 14.258 4.625 11.2734 4.625C8.89767 4.62768 6.61998 5.57263 4.94006 7.25256C3.26013 8.93248 2.31518 11.2102 2.3125 13.5859C2.3125 23.7031 17.3134 31.8923 17.9522 32.2305C18.1206 32.321 18.3088 32.3685 18.5 32.3685C18.6912 32.3685 18.8794 32.321 19.0478 32.2305C19.6866 31.8923 34.6875 23.7031 34.6875 13.5859C34.6848 11.2102 33.7399 8.93248 32.0599 7.25256C30.38 5.57263 28.1023 4.62768 25.7266 4.625ZM18.5 29.8891C15.8609 28.3512 4.625 21.3458 4.625 13.5859C4.62729 11.8234 5.32849 10.1336 6.57482 8.88732C7.82114 7.64099 9.51087 6.93979 11.2734 6.9375C14.0846 6.9375 16.4448 8.43484 17.4305 10.8398C17.5176 11.0519 17.6658 11.2333 17.8562 11.3609C18.0466 11.4886 18.2707 11.5568 18.5 11.5568C18.7293 11.5568 18.9534 11.4886 19.1438 11.3609C19.3342 11.2333 19.4824 11.0519 19.5695 10.8398C20.5552 8.43051 22.9154 6.9375 25.7266 6.9375C27.4891 6.93979 29.1789 7.64099 30.4252 8.88732C31.6715 10.1336 32.3727 11.8234 32.375 13.5859C32.375 21.3343 21.1362 28.3498 18.5 29.8891Z"
                    fill="black"
                  ></path>
                </svg>
                <span className="absolute bottom-16 left-2 bg-white">
                  1,050,000₫
                </span>
                <div className="pt-6 pb-5 pl-2">Alphaboost V1 Shoes</div>
              </div>
            </div>
            <div className="pt-10">
              <div className="relative shadow-slate-800 border rounded-x">
                <img
                  src="https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/27a43e53d1dc43c29df7eebc35869087_9366/IG9841_01_standard.jpg"
                  alt=""
                  width={"100%"}
                />
                <svg
                  className="absolute top-4 right-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  viewBox="0 0 37 37"
                  fill="none"
                >
                  <path
                    d="M25.7266 4.625C22.742 4.625 20.1289 5.90844 18.5 8.07785C16.8711 5.90844 14.258 4.625 11.2734 4.625C8.89767 4.62768 6.61998 5.57263 4.94006 7.25256C3.26013 8.93248 2.31518 11.2102 2.3125 13.5859C2.3125 23.7031 17.3134 31.8923 17.9522 32.2305C18.1206 32.321 18.3088 32.3685 18.5 32.3685C18.6912 32.3685 18.8794 32.321 19.0478 32.2305C19.6866 31.8923 34.6875 23.7031 34.6875 13.5859C34.6848 11.2102 33.7399 8.93248 32.0599 7.25256C30.38 5.57263 28.1023 4.62768 25.7266 4.625ZM18.5 29.8891C15.8609 28.3512 4.625 21.3458 4.625 13.5859C4.62729 11.8234 5.32849 10.1336 6.57482 8.88732C7.82114 7.64099 9.51087 6.93979 11.2734 6.9375C14.0846 6.9375 16.4448 8.43484 17.4305 10.8398C17.5176 11.0519 17.6658 11.2333 17.8562 11.3609C18.0466 11.4886 18.2707 11.5568 18.5 11.5568C18.7293 11.5568 18.9534 11.4886 19.1438 11.3609C19.3342 11.2333 19.4824 11.0519 19.5695 10.8398C20.5552 8.43051 22.9154 6.9375 25.7266 6.9375C27.4891 6.93979 29.1789 7.64099 30.4252 8.88732C31.6715 10.1336 32.3727 11.8234 32.375 13.5859C32.375 21.3343 21.1362 28.3498 18.5 29.8891Z"
                    fill="black"
                  ></path>
                </svg>
                <span className="absolute bottom-16 left-2 bg-white">
                  1,050,000₫
                </span>
                <div className="pt-6 pb-5 pl-2">Alphaboost V1 Shoes</div>
              </div>
            </div>
            <div className="pt-10">
              <div className="relative shadow-slate-800 border rounded-x">
                <img
                  src="https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/ba9ded80550147deb919ae6f01380bb3_9366/GX4285_01_standard.jpg"
                  alt=""
                  width={"100%"}
                />
                <svg
                  className="absolute top-4 right-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  viewBox="0 0 37 37"
                  fill="none"
                >
                  <path
                    d="M25.7266 4.625C22.742 4.625 20.1289 5.90844 18.5 8.07785C16.8711 5.90844 14.258 4.625 11.2734 4.625C8.89767 4.62768 6.61998 5.57263 4.94006 7.25256C3.26013 8.93248 2.31518 11.2102 2.3125 13.5859C2.3125 23.7031 17.3134 31.8923 17.9522 32.2305C18.1206 32.321 18.3088 32.3685 18.5 32.3685C18.6912 32.3685 18.8794 32.321 19.0478 32.2305C19.6866 31.8923 34.6875 23.7031 34.6875 13.5859C34.6848 11.2102 33.7399 8.93248 32.0599 7.25256C30.38 5.57263 28.1023 4.62768 25.7266 4.625ZM18.5 29.8891C15.8609 28.3512 4.625 21.3458 4.625 13.5859C4.62729 11.8234 5.32849 10.1336 6.57482 8.88732C7.82114 7.64099 9.51087 6.93979 11.2734 6.9375C14.0846 6.9375 16.4448 8.43484 17.4305 10.8398C17.5176 11.0519 17.6658 11.2333 17.8562 11.3609C18.0466 11.4886 18.2707 11.5568 18.5 11.5568C18.7293 11.5568 18.9534 11.4886 19.1438 11.3609C19.3342 11.2333 19.4824 11.0519 19.5695 10.8398C20.5552 8.43051 22.9154 6.9375 25.7266 6.9375C27.4891 6.93979 29.1789 7.64099 30.4252 8.88732C31.6715 10.1336 32.3727 11.8234 32.375 13.5859C32.375 21.3343 21.1362 28.3498 18.5 29.8891Z"
                    fill="black"
                  ></path>
                </svg>
                <span className="absolute bottom-16 left-2 bg-white">
                  1,050,000₫
                </span>
                <div className="pt-6 pb-5 pl-2">Alphaboost V1 Shoes</div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-20 lg:pr-24">
          <div className="text-2xl font-semibold font-sans leading-10 pb-5">
            CHI TIẾT ĐẶT HÀNG
          </div>
          {checkedItems.map((item: any, index: number) => (
            <div
              key={index}
              className="gap-5 grid grid-cols-[1.5fr,1.5fr] border-b border-gray-500 pb-5 mt-2"
            >
              <img src={item?.image} />
              <div>
                <div className="text-gray-800 pb-3">
                  Product Name: {item?.productName}
                </div>
                <div className="text-gray-500 pb-3">
                  Price: ${item.initialPrice}
                </div>
                <div className="text-gray-500 pb-3">
                  Total Price: ${item?.price}
                </div>
                <div className="text-gray-500">
                  Size: {item?.size} / Color: {item?.color}
                </div>
                <div className="text-gray-500">Quantity: {item?.quantity}</div>
              </div>
            </div>
          ))}

          <div className="text-2xl font-semibold font-sans leading-10 pt-10">
            TÓM TẮT THEO THỨ TỰ
          </div>
          <div className="flex justify-between items-center pt-5">
            <p className="text-gray-800">2 Sản phẩm</p>
            <span className="text-gray-900">${totalPrice}</span>
          </div>
          <div className="flex justify-between items-center pt-5 border-b pb-2">
            <p className="text-gray-800">Vận chuyển</p>
            <p className="text-gray-900">Miễn Phí</p>
          </div>

          <div className="flex justify-between items-center pt-5">
            <p className="text-gray-800 text-lg font-semibold font-sans leading-10">
              Tổng Giá
            </p>
            <span className="text-gray-900">${totalPrice}</span>
          </div>

          <div className="mt-10">
            <div className="font-semibold font-sans leading-10">
              PHƯƠNG THỨC THANH TOÁN ĐƯỢC CHẤP NHẬN
            </div>
          </div>
          <button
            onClick={() => {
              handleOrder();
            }}
            className="rounded-md  mt-10 border w-full p-2 bg-white text-black hover:text-white hover:bg-black"
          >
            Mua
          </button>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="modal-container bg-yellow-50 w-96 h-56 p-8 rounded-lg shadow-lg">
                <p className="text-lg mb-4">Nhập mã OTP (6 chữ số):</p>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  maxlength="6"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                />
                <div className="flex mt-10 gap-4">
                  <button
                    onClick={closeModal}
                    className="bg-red-500 hover:bg-red-600 text-white rounded p-2"
                  >
                    Close
                  </button>

                  <button
                    onClick={checOTP}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
          <button className="rounded-md  mt-10 border w-full p-2 bg-white text-black hover:text-white hover:bg-black">
            Đăng Nhập
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDetail;
