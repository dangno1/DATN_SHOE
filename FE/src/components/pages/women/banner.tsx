function Slider() {
  return (
    <div className="sliderAx h-auto ">
      {/* Điều chỉnh tương ứng với code jQuery */}
      <div
        //  id="slider-1"
        className={`container mx-auto transition duration-400`}
      >
        {/* Điều chỉnh tương ứng với code jQuery */}
        <div
          className="bg-cover bg-center w-full h-[400px] text-white py-24 px-10 object-fill"
          style={{
            backgroundImage:
              "url(https://www.urbanathletics.com.ph/cdn/shop/collections/Banner-Women.jpg?v=1600747695)",
          }}
        >
          <div className="md:w-1/2 p-10">
            <p className="text-3xl font-bold">Hello Adidas Women</p>
            <p className="text-2xl mb-10 mt-4 leading-none">
              New Styles on Sale: Up to 40% Off Shop All Our New Markdowns
            </p>
            <a
              href="#"
              className="bg-white py-4 px-8 text-black font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800"
            >
              Mua ngay
            </a>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
}

export default Slider;
