import { useState } from "react";
import { useGetAllProductCartsQuery } from "../../api/cart";

const BodyCart = () => {
  const { data: carts } = useGetAllProductCartsQuery();
  console.log(carts?.data);

  const [totalPrice, setTotalPrice] = useState(0); // State để theo dõi tổng giá trị

  const handleCheckboxChange = (productId: any, price: number) => {
    // Tạo một bản sao của danh sách sản phẩm
    const updatedProducts = [...carts?.data];

    // Tìm sản phẩm theo productId trong danh sách
    const productIndex = updatedProducts.findIndex(
      (product: any) => product._id === productId
    );

    if (productIndex !== -1) {
      // Tìm thấy sản phẩm, thực hiện toggle checked
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        checked: !updatedProducts[productIndex].checked,
      };

      // Tính tổng giá trị mới
      const newTotalPrice = updatedProducts.reduce(
        (total: any, product: any) => {
          if (product.checked) {
            total += product.price * product.quantity;
          }
          return total;
        },
        0
      );

      // Cập nhật tổng giá trị
      setTotalPrice(newTotalPrice);
    }
  };

  return (
    <>
      <div className="container mx-auto lg:grid lg:grid-cols-[2fr,1fr] gap-10 pb-32">
        <div className="pt-20 lg:pl-36">
          <h2 className="text-4xl font-semibold font-sans leading-10">
            YOUR BAG
          </h2>
          <p className="pt-5 text-base leading-3 text-gray-800">
            TOTAL (2 items){" "}
            <span className="font-semibold pl-2"> 2,250,000₫</span>
          </p>
          <p className="pt-5 pb-5 text-base leading-3 text-gray-800">
            Items in your bag are not reserved — check out now to make them
            yours.
          </p>
          <div className="bg-slate-100 p-4">
            <div className="font-medium text-lg">
              Mid Season Sale is on: Up to 50% off
            </div>
            <div className="text-gray-700 pt-1">
              Terms & Conditions and Exclusions apply.
            </div>
            <div className="pt-4 tracking-wide border-black border-b w-24">
              SHOP NOW
            </div>
          </div>

          {carts?.data.map((item: any) => (
            <div className="pt-7" key={item._id}>
              <div className="border border-black gap-3 grid grid-cols-1 lg:grid-cols-[5fr,10fr,1fr]">
                <img
                  src="https://assets.adidas.com/images/w_280,h_280,f_auto,q_auto:sensitive/315c0690b9e24b4ba66bae60012b1921_9366/HA4314_220_HA4314_21_model.jpg.jpg?sh=364&strip=false&sw=364"
                  alt=""
                  width={"100%"}
                  height={"240px"}
                />
                <div className="p-5">
                  <div className="flex justify-between">
                    <p>{item?.productName}</p>
                    <span className="text-red-500">{item?.price}₫</span>
                  </div>
                  <div className="pt-2 uppercase">
                    SOLAR GOLD / CORE BLACK / {item?.color}
                  </div>
                  <div className="pt-5">Product Size</div>
                  <div className="pt-2">
                    Quantity still in stock:
                    <span className="font-medium text-lg">1000</span>
                  </div>
                  <div className="flex items-center pt-14">
                    <button
                      className="border border-gray-400 text-black px-2"
                      id="decrement"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="w-10 text-center border border-gray-400"
                      id="quantity"
                      value={item?.quantity}
                    />
                    <button
                      className="border border-gray-400 text-black px-2"
                      id="increment"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="pt-5">
                  <a className="pl-2">X</a>
                  <div className="pt-5">
                    <svg
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
                  </div>
                  <input
                    className="w-4 h-4 mt-32 ml-2"
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheckboxChange(item?._id, item.price)}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="text-3xl font-semibold font-sans leading-10 pt-20">
            TOP PICKS FOR YOU
          </div>
          <div className="flex gap-2">
            <div className="pt-10">
              <div className="relative border border-black">
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
              <div className="relative border border-black">
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
              <div className="relative border border-black">
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
              <div className="relative border border-black">
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
          <div className="border border-black">
            <a href="/cartDetail">
              <div className="bg-black flex justify-between items-center p-1 pl-3 pr-3 mr-1 mb-1">
                <div className="text-white text-base font-semibold font-sans leading-10">
                  CHECKOUT
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="12"
                    viewBox="0 0 22 12"
                    fill="none"
                  >
                    <path
                      d="M0.859347 6.85938L19.0591 6.85938L16.0443 9.85963C15.7079 10.1944 15.7066 10.7386 16.0414 11.075C16.3762 11.4114 16.9203 11.4126 17.2567 11.0779L21.7472 6.60913C21.7475 6.60888 21.7477 6.60858 21.7479 6.60832C22.0835 6.27351 22.0845 5.72763 21.748 5.3917C21.7477 5.39144 21.7475 5.39114 21.7472 5.39089L17.2568 0.922143C16.9205 0.587416 16.3763 0.588576 16.0415 0.925064C15.7066 1.26147 15.7079 1.80558 16.0443 2.14039L19.0591 5.14064L0.859347 5.14064C0.384715 5.14064 -2.81029e-05 5.52538 -2.81444e-05 6.00001C-2.81859e-05 6.47464 0.384715 6.85938 0.859347 6.85938Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </a>
          </div>
          <div className="pt-10 text-xl font-semibold font-sans leading-10">
            ORDER SUMMARY
          </div>
          <div>
            <div className="flex justify-between items-center pt-5">
              <p className="text-gray-800">2 items</p>
              <span className="text-gray-900">2,250,000₫</span>
            </div>
            <div className="flex justify-between items-center pt-5 border-b pb-2">
              <p className="text-gray-800">Delivery</p>
              <p className="text-gray-900">Free</p>
            </div>
            <div className="flex justify-between items-center pt-5">
              <p className="text-gray-800 text-lg font-semibold font-sans leading-10">
                Total ({carts?.data.length} items){" "}
              </p>
              <span className="text-gray-900">{totalPrice}₫</span>
            </div>
            <div className="pt-10">
              <div className="font-semibold font-sans leading-10">
                ACCEPTED PAYMENT METHODS
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
