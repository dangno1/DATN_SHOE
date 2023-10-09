import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Carousel } from 'antd';

const Inforproduct = () => {
  const [images, setImages] = useState({
    img1: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ca49d2fd-e179-43ac-b948-0d3ed61cc9a5/air-jordan-1-low-older-shoes-xLzJc6.png",
    img2: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/f8f6477c-9cf6-4406-a841-afdf4bc572d4/air-jordan-1-low-older-shoes-xLzJc6.png",
    img3: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/0d08b0fc-9a72-47f1-992e-c273720daba9/air-jordan-1-low-older-shoes-xLzJc6.png",
    img4: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/eb24f5da-179f-40f2-9e9d-901ed72e5412/air-jordan-1-low-older-shoes-xLzJc6.png",
  });
  const [activeImg, setActiveImage] = useState(images.img1);
  const [amount, setAmount] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const availableSizes = [
    "VN 40",
    "VN 41",
    "VN 42",
    "VN 43",
    "VN 44",
    "VN 45",
    "VN 46",
  ];

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <div>
      <div className="max-w-screen-xl mx-auto flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
        <div className="flex flex-col gap-6 lg:w-2/4 ">
          <Carousel afterChange={onChange} >

            {[1, 2, 3, 4, 5]?.map((_) => (
              <div>
                <img
                  src={activeImg}
                  alt=""
                  className="w-full h-full aspect-square object-cover rounded-xl "

                />
              </div>
            ))}

          </Carousel>
          <div className="flex flex-row p-3 justify-between h-24">
            <img
              src={images.img1}
              alt=""
              className="w-24 h-24  rounded-md cursor-pointer"
              onClick={() => setActiveImage(images.img1)}
            />
            <img
              src={images.img2}
              alt=""
              className="w-24 h-24 rounded-md cursor-pointer"
              onClick={() => setActiveImage(images.img2)}
            />
            <img
              src={images.img3}
              alt=""
              className="w-24 h-24 rounded-md cursor-pointer"
              onClick={() => setActiveImage(images.img3)}
            />
            <img
              src={images.img4}
              alt=""
              className="w-24 h-24 rounded-md cursor-pointer"
              onClick={() => setActiveImage(images.img4)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:w-2/4">
          <div>
            <span className=" text-violet-600 font-semibold">
              Sneaker Shoe
            </span>
            <h1 className="text-3xl font-bold">Nike Invincible 3</h1>
          </div>
          <p className="text-gray-700">
            With incredible cushioning to support you in every
            your kilometers, the Invincible 3 offers maximum comfort under the table
            legs to help you perform your best today, tomorrow and beyond.
            This shoe model, with its excellent elasticity and support, is designed to
            delivers the best performance on your favorite routes
            and full of energy after each run, waiting for the next run.
          </p>
          <h6 className="text-2xl font-semibold">$ 199.00</h6>
          <div className="flex flex-col gap-2">
            <span className="text-gray-600 font-semibold">Size:</span>
            <div className="flex flex-row ">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  className={`w-16 h-10 text-sm mr-3 rounded-md border ${selectedSize === size ? "bg-gray-200" : "bg-white"
                    }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gray-600 font-semibold">Color:</span>
            <div className="flex flex-row space-x-3">
              <button className="w-8 h-8 bg-red-500 rounded-full shadow-xl color-button"></button>
              <button className="w-8 h-8 bg-white border rounded-full shadow-xl color-button"></button>
              <button className="w-8 h-8 bg-black rounded-full shadow-xl color-button"></button>
              <button className="w-8 h-8 bg-blue-400 rounded-full shadow-xl color-button"></button>
            </div>
          </div>

          <div className="flex flex-row items-center gap-12">
            <div className="flex flex-row items-center">
              <button
                className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                onClick={() => setAmount((prev) => prev - 1)}
              >
                -
              </button>
              <span className="py-4 px-6 rounded-lg">{amount}</span>
              <button
                className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                onClick={() => setAmount((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div>
            <button className="bg-black hover:bg-white hover:text-gray-950 text-white font-semibold py-3 px-12 rounded-full h-full flex items-center space-x-2">
              <span>
                <AiOutlineShoppingCart />{" "}
              </span>
              <span>add to cart</span>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inforproduct;
