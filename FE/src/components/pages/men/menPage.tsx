import { useGetCategoryQuery } from "@/api/category";
import { IProduct } from "@/interface/product";
import { BsBagPlus } from "react-icons/bs";
import { useParams } from "react-router-dom";

const Men = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  
  const { data } = useGetCategoryQuery(id || "");
  console.log(data);
  

  return (
    <>
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/42fb93102185111.5f322d7589019.jpg"
            alt="Background Image"
            className="object-cover object-center w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Welcome to Our Awesome Website
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Discover amazing features and services that await you.
          </p>
          <a
            href="#"
            className="bg-black hover:bg-white hover:text-black py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            Get Started
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
              <p>Introduce</p>
              <p className="text-gray-400">17th March, 2023</p>
            </div>
            <h2 className="text-3xl font-semibold mt-4 md:mt-10">
              ADIDAS MEN’S SHOES
            </h2>
            <p className="my-3 text-justify font-medium text-gray-700 leading-relaxed">
              Our wins are ours to gain. adidas shoes don’t break our PB. We do.
              That extra mile. One more rep. Leg day, run away or lounge all
              day. Find something to match you. Jerseys for the player, or the
              fan. Running shoes to run on, or to walk in. Training gear for
              weekday practise, or Sunday chill. A pair of white trainers to go
              with… basically anything. All we need is us. All we want is here,
              in men’s apparel and footwear.
            </p>
            <button className="mt-2 md:mt-5 p-3 px-5 bg-black text-white hover:bg-white hover:text-black font-bold text-sm hover:bg-purple-800">
              Read More
            </button>
          </div>
        </section>
      </section>
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4 uppercase">men's shoes</h1>
        <h1 className="text-3xl">ELEVATE YOUR STYLE</h1>
      </div>
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {data?.products.map((product: IProduct) => (
          <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <a href="#">
              <img
                src={product?.image}
                alt="Product"
                className="h-80 w-72 object-cover rounded-t-xl"
              />
              <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">
                  {product?.brand}
                </span>
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {product?.name}
                </p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                   ${product?.variants[0].price}
                  </p>
                  <del>
                    <p className="text-sm text-gray-600 cursor-auto ml-2">
                      $1000
                    </p>
                  </del>
                  <div className="ml-auto font-bold text-2xl">
                    <BsBagPlus />
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </section>
    </>
  );
};

export default Men;
