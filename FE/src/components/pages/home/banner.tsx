import { useEffect, useState } from "react";

function Slider() {
  const images = [
    "https://file.hstatic.net/1000008082/file/adidas_da_banh_4_c2fd2f6075824ba7bf36e660a915e9d8.jpg",
    "https://the-post-assets.sgp1.digitaloceanspaces.com/2021/01/Ultraboost-1896x800.jpg",
    "https://www.premierpress.com/wp-content/uploads/2019/03/Adidas-Cookies-and-Cream-Website-Banner-Image-with-Fade.jpg",
    "https://vietads.net.vn/image/news/14-12-2020/anh-dai-di9en-10.jpg"
  ];
  const [currenSlide, setCurrenSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrenSlide((currenSlide + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currenSlide, images.length]);
  return (
    <div>
      <div className="relative h-screen text-white overflow-hidden py-6">
        <div className="absolute inset-0 overflow-hidden">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Background Image"
              className={`object-cover object-center w-full h-full absolute transform ${index === currenSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                } transition-transform duration-500 ease-in-out`}
            />
          ))}
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
          <h1 className="text-5xl font-[700] uppercase mb-4 max-w-[1000px] leading-[70px]">
            Chào Mừng Bạn Đến Với Trang Web Tuyệt Vời Của Chúng Tôi
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Ở đây chúng tôi có những sản phẩm tuyệt vời.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Slider;
