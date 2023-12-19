import { useEffect, useState } from "react";

function Slider() {
  const images = [
   "https://snobette.com/wp-content/uploads/2018/09/Adidas-JD-Sports-Hailey-Baldwin-London-Fashion-Week-1024x682.jpg",
    "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enSG/Images/Energy-SS20-GAA-Launch-1-HP-TC-d_tcm207-470133.png",
    "https://i.redd.it/frnq4zn1z3q31.png",
    "https://cdn.shopify.com/s/files/1/2959/1636/collections/BUTTON_TEMP_7f95f68c-c99b-4f26-bf66-71ee045cc567-420903.png?v=1655910032"

  ];
  const [currenSlide, setCurrenSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrenSlide((currenSlide + 1) % images.length);
    }, 5000); 

    return () => {
      clearInterval(interval);
    };
  }, [currenSlide]);
  return (
    <div className="relative h-screen text-white overflow-hidden">
       <div className="absolute inset-0 overflow-hidden">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Background Image"
              className={`object-cover object-center w-full h-full absolute transform ${
                index === currenSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              } transition-transform duration-500 ease-in-out`}
            />
          ))}
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-5xl font-bold leading-tight mb-4">
        Chào Mừng Bạn Tới Trang web Bán Giày Nữ
        </h1>
        <p className="text-lg text-gray-300 mb-8">
        Khám phá các tính năng và dịch vụ tuyệt vời đang chờ đợi bạn.
        </p>
        <a
            href="#"
            className="bg-black hover:bg-white hover:text-black py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            Bắt Đầu
          </a>
      </div>
    </div>
  );
}

export default Slider;
