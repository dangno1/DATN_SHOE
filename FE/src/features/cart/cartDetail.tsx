import {
  useCheckoutMutation,
  useGetOrdersQuery,
  useOrderedProductMutation,
  useUpdateQyMutation,
  useUpdateorderMutation,
} from "@/api/orderedProduct";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetAllCouponsQuery } from "@/api/coupons";
import { useDeleteProductCartMutation } from "@/api/cart";

const CartDetail = () => {
  // coupons

  const [discountCode, setDiscountCode] = useState<string>("");
  const { data: coupons = [] } = useGetAllCouponsQuery();
  const validCoupon = coupons.find((coupon) => coupon.code === discountCode);
  const [deleteProductCart] = useDeleteProductCartMutation();
  const [orderedProduct] = useOrderedProductMutation();
  const [updateQy] = useUpdateQyMutation();
  const { data: getOrders } = useGetOrdersQuery();
  const [updateOrder] = useUpdateorderMutation();
  const [checkOut] = useCheckoutMutation();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const checkedItems = location.state?.checkedItems || [];

  // console.log(checkedItems);

  console.log(parseFloat(checkedItems[0].amountSold) + parseFloat(checkedItems[0].quantity));
  

  let tolPrice = 0;
  for (let i = 0; i < checkedItems.length; i++) {
    tolPrice = tolPrice + checkedItems[i].totalPrice;
  }
  console.log(tolPrice);
  

  // user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const [errPaymenMethod, setErrPayMethod] = useState({});

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
  let discountedAmount = 0;

  checkedItems.forEach((element: { price: number }) => {
    totalPrice += element.price;
    if (validCoupon) {
      discountedAmount = totalPrice * (validCoupon.discountValue / 100);
      totalPrice = totalPrice - discountedAmount;
    }
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
    if (selectedPaymentMethod == "") {
      setErrPayMethod({ errPaymenMethod: "Phải chọn phương thức thanh toán" });
      return;
    } else {
      setErrPayMethod({});
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
        productID: unknown;
        quantityStock: unknown;
      }) => ({
        productName: item?.productName,
        productInitialPrice: item?.initialPrice,
        productPrice: item?.price,
        productImage: item?.image,
        productColor: item?.color,
        productSize: item?.size,
        productQuantity: item?.quantity,
        otp: item?.otp,
        productID: item?.productID,
        quantityStock: item?.quantityStock,
      })
    );
    const testQy = {
      productId: productsArray[0].productID,
      variantsId: checkedItems[0].variantsId,
      newQuantity: parseFloat(productsArray[0].quantityStock) - parseFloat(productsArray[0].productQuantity),
      amountSold: parseFloat(checkedItems[0].amountSold) + parseFloat(checkedItems[0].quantity),
    };    

    const orderData = {
      userName: name,
      userEmail: email,
      userPhone: phoneNumber,
      userAddress: address,
      products: productsArray,
      paymentMethod: selectedPaymentMethod,
      status: "Đã Xác Nhận",
      totalPrice: totalPrice,
      orderTime: new Date(),
    };
    updateQy(testQy);
    deleteProductCart(checkedItems[0]._id);
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
    // console.log(lastOrder);

    if (lastOrder && lastOrder.otp === otpValue) {
      updateOrder(lastOrder);
      window.location.href =
        "http://localhost:5173/oder&history?vnp_TransactionStatus=00";
    } else {
      alert("Mã OTP Không Hợp Lệ");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.href =
      "http://localhost:5173/oder&history?vnp_TransactionStatus=01";
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
              <option value={"Paymentondelivery"}>
                Thanh Toán Khi Nhận Hàng
              </option>
              <option value={"NCB"}>NCB</option>
              <option value={"VISA"}>VISA</option>
              <option value={"MasterCard"}>MasterCard</option>
              <option value={"JCB"}>JCB</option>
            </select>
          </div>
          <div className="text-red-500 pl-1">
            {errPaymenMethod?.errPaymenMethod}
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
                <span className="absolute bottom-16 left-2 bg-white">
                  1,050,000VND
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
                <span className="absolute bottom-16 left-2 bg-white">
                  1,050,000VND
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
                <span className="absolute bottom-16 left-2 bg-white">
                  1,050,000VND
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
                <span className="absolute bottom-16 left-2 bg-white">
                  1,050,000VND
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
                  Tên sản phẩm: {item?.productName}
                </div>
                <div className="text-gray-500 pb-3">
                  Giá: {item.price.toLocaleString("vi-VN")}VND
                </div>
                <div className="text-gray-500 pb-3">
                  Tổng giá: {item?.totalPrice.toLocaleString("vi-VN")}VND
                </div>
                <div className="text-gray-500">
                  Kích cỡ: {item?.size} / Color: {item?.color}
                </div>
                <div className="text-gray-500">Số lượng: {item?.quantity}</div>
              </div>
            </div>
          ))}

          <div className="text-2xl font-semibold font-sans leading-10 pt-10">
            TÓM TẮT THEO THỨ TỰ
          </div>
          <div className="flex justify-between items-center pt-5">
            <p className="text-gray-800"> Giá</p>
            <span className="text-gray-900">
              {tolPrice.toLocaleString("vi-VN")}VND
            </span>
          </div>
          <div className="flex justify-between items-center pt-5 border-b pb-2">
            <p className="text-gray-800">Vận chuyển</p>
            <p className="text-gray-900">Miễn Phí</p>
          </div>

          <div className="pt-5">
            <input
              className={`border w-full p-4 ${
                validCoupon ? "" : "border-red-500"
              }`}
              type="text"
              placeholder="Mã giảm giá"
              value={discountCode}
              onChange={(e) => {
                const enteredCode = e.target.value;
                const isValidCoupon = coupons.find(
                  (coupon) => coupon.code === enteredCode
                );

                setDiscountCode(enteredCode);

                setErrors((prevErrors) => ({
                  ...prevErrors,
                  discountCode: isValidCoupon ? "" : "Mã giảm giá không hợp lệ",
                }));
              }}
            />
            {errors?.discountCode && (
              <div className="text-red-500 pl-1">{errors?.discountCode}</div>
            )}
          </div>

          <div className="flex justify-between items-center pt-5">
            <p className="text-gray-800 text-lg font-semibold font-sans leading-10">
              Tổng Giá
            </p>
            <span className="text-gray-900">
              {" "}
              {totalPrice.toLocaleString("vi-VN")} VND
            </span>
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
          <div className="mt-10">
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
    </>
  );
};

export default CartDetail;
