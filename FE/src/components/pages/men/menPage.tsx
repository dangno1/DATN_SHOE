import { useGetCategoryQuery } from "@/api/category";
import { IProduct } from "@/interface/product";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Blog from "../home/Blog/index";
import { Link } from "react-router-dom";
const Men = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const { data } = useGetCategoryQuery(id || "");
  console.log(data);
  
  const images = [
    "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2018%2F03%2Fsneakersnstuff-adidas-originals-eqt-adv-pack-3.jpg",
    "https://images.complex.com/complex/images/c_crop,h_1661,w_2952,x_0,y_241/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/ykecu4gwvrpyc5ylrdhf/jalen-green-eric-emanuel-adidas",
    "https://www.tonyvalentine.com/content/images/thumbs/0016242.jpeg",
    "https://www.mcarthurglen.com/globalassets/ochtrup/ochtrup--stores/adidas/adi_fo_campaignblockbanner_1120x510px_ber_wm.jpg",
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
    <>
      <div className="relative h-screen text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Background Image"
              className={`object-cover object-center w-full h-full absolute transform ${
                index === currenSlide
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-full"
              } transition-transform duration-500 ease-in-out`}
            />
          ))}
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Chào Mừng Bạn Tới Trang web Bán Giày Nam
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
      <section className="container mx-auto  md:py-4 px-0 md:p-10 md:px-0">
        <section className="relative px-10 md:p-0 transform duration-500 hover:shadow-2xl cursor-pointer hover:-translate-y-1 ">
          <img
            className="xl:max-w-6xl"
            src="https://dosi-in.com/images/news_content/18411/2020/11/26/lieu-se-co-su-ket-hop-giua-nike-va-adidas-trong-tuong-lai-khong-xa_2020_11_26_0.jpg"
            alt=""
          />
          <div className="content bg-white bg-opacity-80 p-2 pt-4 md:p-12 pb-12 lg:max-w-lg w-full lg:absolute top-48 right-5">
            <div className="flex justify-between font-bold text-sm">
              <p>Giới Thiệu</p>
              <p className="text-gray-400">Ngày 17 Tháng 3 Năm 2023</p>
            </div>
            <h2 className="text-3xl font-semibold mt-4 md:mt-10">
              GIÀY NAM ADIDAS
            </h2>
            <p className="my-3 text-justify font-medium text-gray-700 leading-relaxed">
              Chiến thắng của chúng ta là của chúng ta để đạt được. giày adidas
              không phá vỡ PB của chúng tôi. Chúng tôi làm vậy. Đó là dặm thêm.
              Hơn một đại diện. Chân ngày, chạy trốn hoặc nằm dài cả ngày. Tìm
              thứ gì đó phù hợp với bạn. Áo thi đấu cho cầu thủ hoặc người hâm
              mộ. Giày chạy bộ để chạy hoặc đi bộ. Dụng cụ tập luyện để luyện
              tập các ngày trong tuần hoặc thư giãn vào Chủ nhật. Một đôi giày
              thể thao màu trắng đi cùng… về cơ bản là bất cứ thứ gì. Tất cả
              những gì chúng tôi cần là chúng tôi. Tất cả những gì chúng tôi
              muốn đều có ở đây, quần áo và giày dép dành cho nam giới.
            </p>
            <button className="mt-2 md:mt-5 p-3 px-5 bg-black text-white hover:bg-white hover:text-black font-bold text-sm hover:bg-purple-800">
              Đọc Thêm
            </button>
          </div>
        </section>
      </section>

      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4 uppercase">Giày Nam</h1>
        <h1 className="text-3xl">NÂNG CAO PHONG CÁCH CỦA BẠN</h1>
      </div>
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {data?.products.map((product: IProduct) => (
          <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <Link to={`/detail/${product._id}`}>
              <img
                src={product?.image}
                alt="Product"
                className="h-80 w-72 object-cover rounded-t-xl"
              />
              <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">
                  {product?.brand}
                </span>
                <p className="text-lg font-bold text-black truncate block hover:underline uppercase">
                  {product?.name}
                </p>
                <div className="flex items-center">
                <p className="text-lg font-semibold cursor-auto my-3 text-red-500">
                  {product?.variants[0].discount.toLocaleString('vi-VN')} VND
                  </p>
                  <del>
                    <p className="text-sm text-gray-600 cursor-auto ml-2">
                    {product?.variants[0].price.toLocaleString('vi-VN')} VND
                    </p>
                  </del>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
      <Blog/>
    </>
  );
};

export default Men;
