
const Banner1 = () => {
  return (
    <div>
      {/* banner men */}
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden py-6">
        <div className="absolute inset-0">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/9cc687115782055.6054c8f8c76a9.jpg"
            alt="Background Image"
            className="object-cover object-center w-full h-full"
          />
          <div className="absolute inset-0" />
        </div>
        {/* <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Welcome to Our Awesome Website
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Discover amazing features and services that await you.
          </p>
          <a
            href="#"
            className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </a>
        </div> */}
      </div>
      {/* banner men */}
    </div>
  );
};

export default Banner1;
