const Socials = () => {
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
              <p>Giới Thiệu</p>
              <p className="text-gray-400">Ngày 17 Tháng 3 Năm 2023</p>
            </div>
            <h2 className="text-3xl font-semibold mt-4 md:mt-10">
            GIÀY NỮ ADIDAS
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

      <div className=" text-center">
        {/* <h2 className=" font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-gray-800 md:w-full w-9/12 mx-auto">
          Top 4 Best Sellers{" "}
        </h2> */}
      </div>
    </div>
  );
};

export default Socials;
