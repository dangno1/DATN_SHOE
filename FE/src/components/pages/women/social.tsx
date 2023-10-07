const Social = () => {
  return (
    <div className=" 2xl:container 2xl:mx-auto  lg:px-20 md:px-6 py-9 px-4">
      <section className="container mx-auto  md:py-4 px-0 md:p-10 md:px-0">
        <section className="relative px-10 md:p-0 transform duration-500 hover:shadow-2xl cursor-pointer hover:-translate-y-1 ">
          <img
            className="xl:max-w-6xl"
            src="https://preview.thenewsmarket.com/Previews/ADID/StillAssets/920x690/496109.jpg"
            alt=""
          />
          <div className="content bg-white bg-opacity-80 p-2 pt-4 md:p-12 pb-12 lg:max-w-lg w-full lg:absolute top-48 right-5">
            <div className="flex justify-between font-bold text-sm">
              <p>Introduce</p>
              <p className="text-gray-400">17th March, 2023</p>
            </div>
            <h2 className="text-3xl font-semibold mt-4 md:mt-10">
              ADIDAS WOMEN’S SHOES
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

      <div className=" text-center">
        {/* <h2 className=" font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-gray-800 md:w-full w-9/12 mx-auto">
          Top 4 Best Sellers{" "}
        </h2> */}
      </div>
      {/* <div className=" grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:grap-8 md:gap-6 gap-4 mt-10">
        <div className="relative group">
          <img
            src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c8aba848adba4eeebf89ae2e00ba47dd_9366/Grand_Court_Court_Elastic_Lace_and_Top_Strap_Shoes_White_GW6521_01_standard.jpg"
            alt="A picture of a sitting dog"
            className=" lg:block hidden w-full "
          />
          <img
            src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c8aba848adba4eeebf89ae2e00ba47dd_9366/Grand_Court_Court_Elastic_Lace_and_Top_Strap_Shoes_White_GW6521_01_standard.jpg"
            alt="A picture of a sitting dog"
            className="lg:hidden block w-full "
          />
          <div className=" flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full" />
          <div className=" absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100"></div>
        </div>
        <div className="relative group">
          <img
            src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/38f51c82cca64840b90d6a074ed58d16_9366/Court_Platform_Shoes_White_IE9987_01_standard.jpg"
            alt="Smiling Girl"
            className=" lg:block hidden w-full "
          />
          <img
            src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/38f51c82cca64840b90d6a074ed58d16_9366/Court_Platform_Shoes_White_IE9987_01_standard.jpg"
            alt="Smiling Girl"
            className="lg:hidden block w-full "
          />
          <div className="opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full" />
          <div className=" absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100"></div>
        </div>
        <div className="relative group">
          <img
            src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c4429297761549cb8ebaaf3401496ba5_9366/Nizza_Platform_Shoes_White_HQ1902_01_standard.jpg"
            alt="Men Posing"
            className=" lg:block hidden w-full "
          />
          <img
            src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c4429297761549cb8ebaaf3401496ba5_9366/Nizza_Platform_Shoes_White_HQ1902_01_standard.jpg"
            alt="Men Posing"
            className="lg:hidden block w-full "
          />
          <div className="opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full" />
          <div className=" absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100"></div>
        </div>
        <div className="relative group">
          <img
            src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b9024954fc7c4b7492664e133a9284cb_9366/Cloudfoam_Pure_Shoes_White_IG7376_01_standard.jpg"
            alt="2 puppies"
            className=" lg:block hidden w-full "
          />
          <img
            src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b9024954fc7c4b7492664e133a9284cb_9366/Cloudfoam_Pure_Shoes_White_IG7376_01_standard.jpg"
            alt="2 puppies"
            className="lg:hidden block w-full "
          />
          <div className="opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full" />
          <div className=" absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100"></div>
        </div>
      </div> */}
    </div>
  );
};

export default Social;
