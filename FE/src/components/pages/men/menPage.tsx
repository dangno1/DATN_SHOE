import { BsBagPlus } from "react-icons/bs";

const Men = () => {
  
  return (
    <>
    
    {/* banner men */}
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/42fb93102185111.5f322d7589019.jpg" alt="Background Image" className="object-cover object-center w-full h-full" />
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
          <h1 className="text-5xl font-bold leading-tight mb-4">Welcome to Our Awesome Website</h1>
          <p className="text-lg text-gray-300 mb-8">Discover amazing features and services that await you.</p>
          <a href="#" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">Get Started</a>
        </div>
      </div>
    {/* banner men */}
    {/* title */}
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
            <button className="mt-2 md:mt-5 p-3 px-5 bg-black text-white font-bold text-sm hover:bg-purple-800">
              Read More
            </button>
          </div>
        </section>
      </section>
    {/* title */}
    {/* product Men */}
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4 uppercase">
           men's shoes
        </h1>
        <h1 className="text-3xl">ELEVATE YOUR STYLE</h1>
      </div>

      {/* ✅ Grid Section - Starts Here 👇 */}
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {/*   ✅ Product card 1 - Starts Here 👇 */}
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img
              src="https://assets.adidas.com/images/w_600,f_auto,q_auto/5bd92667564d40328e9e9511bac0bc48_9366/Giay_Campus_00s_Mau_tim_ID7038_01_standard.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Giày Campus 00s
              </p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">
                  $149
                </p>
                <del>
                  <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                </del>
                <div className="ml-auto font-bold text-2xl">
                  <BsBagPlus />
                </div>
              </div>
            </div>
          </a>
        </div>
        {/*   🛑 Product card 1 - Ends Here  */}
        {/*   ✅ Product card 2 - Starts Here 👇 */}
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img
              src="https://assets.adidas.com/images/w_600,f_auto,q_auto/e8190bda50a44a9cbcbbe4937a1949ff_9366/Giay_Gazelle_trang_IE0546_01_standard.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Giày Gazelle
              </p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">
                  $149
                </p>
                <del>
                  <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                </del>
                <div className="ml-auto font-bold text-2xl">
                  <BsBagPlus />
                </div>
              </div>
            </div>
          </a>
        </div>
        {/*   🛑 Product card 2- Ends Here  */}
        {/*   ✅ Product card 3 - Starts Here 👇 */}
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img
              src="https://assets.adidas.com/images/w_600,f_auto,q_auto/2d85dc90ba68498f9be8efe7eceb9d6f_9366/Giay_LG2_SPZL_trang_IF8358_01_standard.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Giày LG2 SPZL
              </p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">
                  $149
                </p>
                <del>
                  <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                </del>
                <div className="ml-auto font-bold text-2xl">
                  <BsBagPlus />
                </div>
              </div>
            </div>
          </a>
        </div>
        {/*   🛑 Product card 3 - Ends Here  */}
        {/*   ✅ Product card 4 - Starts Here 👇 */}
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img
              src="https://assets.adidas.com/images/w_600,f_auto,q_auto/a02d4f03dc7945159ef2c04f49841aca_9366/Giay_Adizero_Prime_X_2.0_STRUNG_trang_HP9709_HM1.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Giày Adizero Prime X 2.0 STRUNG
              </p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">
                  $149
                </p>
                <del>
                  <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                </del>
                <div className="ml-auto font-bold text-2xl">
                  <BsBagPlus />
                </div>
              </div>
            </div>
          </a>
        </div>
        {/*   🛑 Product card 4 - Ends Here  */}
        {/*   ✅ Product card 5 - Starts Here 👇 */}
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img
              src="https://assets.adidas.com/images/w_600,f_auto,q_auto/e8f76f593c804f90bdcefd57033aff3e_9366/HANDBALL_SPEZIAL_mau_xanh_la_IF8913_01_standard.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                HANDBALL SPEZIAL
              </p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">
                  $149
                </p>
                <del>
                  <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                </del>
                <div className="ml-auto font-bold text-2xl">
                  <BsBagPlus />
                </div>
              </div>
            </div>
          </a>
        </div>
        {/*   🛑 Product card 5 - Ends Here  */}
        {/*   ✅ Product card 6 - Starts Here 👇 */}
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img
              src="https://assets.adidas.com/images/w_600,f_auto,q_auto/8d31b512d08b4c90b8e6529be333918b_9366/Giay_Samba_OG_trang_ID2055_01_standard.jpg"
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                GIÀY SAMBA OG
              </p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">
                  $149
                </p>
                <del>
                  <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                </del>
                <div className="ml-auto font-bold text-2xl">
                  <BsBagPlus />
                </div>
              </div>
            </div>
          </a>
        </div>
        {/*   🛑 Product card 6 - Ends Here  */}
      </section>
      {/* 🛑 Grid Section - Ends Here */}
    {/* product Men */}
   
    </>
  );
};

export default Men;
