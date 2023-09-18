import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../../interface/auth";
import { useSignupMutation } from "../../../../api/auth";
// import { useState } from "react";

const Signup = () => {
    const { handleSubmit,register} = useForm<IUser>();
    const navigate = useNavigate();
    // const [signup] = useSignupMutation();
    const onSubmit = async (data:IUser) => {
      try {
        const response = await axios.post('http://localhost:8000/api/auth/signup', data);
        console.log('Phản hồi từ API:', response.data);
   // Gửi dữ liệu đăng ký đến API

        if (response.data.success) {
          alert('Đăng ký thành công');
          navigate('/signin'); // Chuyển hướng sau khi đăng ký thành công
        } else {
          alert('Đăng ký thất bại');
        }
      } catch (error) {
        console.error('Lỗi đăng ký:', error);
        console.log(data)
        alert('Đã xảy ra lỗi khi đăng ký');
      }
    };
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<IUser>();
  // const [serverErrors, setServerErrors] = useState([]);
  // const navigate = useNavigate();
  // const onSubmit = async (data: IUser) => {
  //   // Kiểm tra dữ liệu ở phía client trước khi gửi lên server
  //   const clientErrors = [];

  //   if (!data.fullname || data.fullname.length < 5) {
  //     clientErrors.push("Fullname phải có ít nhất 5 ký tự");
  //   }

  //   if (
  //     !data.username ||
  //     data.username.length < 5 ||
  //     !/^[a-zA-Z0-9]+$/.test(data.username)
  //   ) {
  //     clientErrors.push(
  //       "Username phải có ít nhất 5 ký tự và chỉ được chứa các ký tự chữ cái, số Và viết liền không dấu"
  //     );
  //   }

  //   if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
  //     clientErrors.push("Email không hợp lệ, email phải có @ và .");
  //   }

  //   if (!data.phone || !/^[0-9]{10}$/.test(data.phone)) {
  //     clientErrors.push("Số điện thoại phải có đúng 10 chữ số");
  //   }

  //   if (!data.password || data.password.length < 5) {
  //     clientErrors.push("Password phải có ít nhất 5 ký tự");
  //   }

  //   if (!data.confirmPassword || data.confirmPassword !== data.password) {
  //     clientErrors.push("Mật khẩu không trùng khớp, hãy nhập lại");
  //   }

  //   if (!data.address || data.address.length < 5) {
  //     clientErrors.push("Address phải có ít nhất 5 ký tự");
  //   }

  //   if (clientErrors.length > 0) {
  //     setServerErrors(clientErrors );
  //     return;
  //   }

  //   // Gửi dữ liệu đăng ký đến API nếu không có lỗi phía client
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/api/auth/signup",
  //       data
  //     );
  //      console.log("Phản hồi từ API:", response.data);
  //     if (response.data) {
  //       alert("Đăng ký thành công");
  //       navigate("/signin"); // Chuyển hướng sau khi đăng ký thành công
  //     } else {
  //       alert('Đăng ký thất bại');
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       if (error.response) {
  //         console.error('Lỗi Axios:', error.response.status);
  //         console.error('Thông điệp lỗi:', error.response.data);
  //       } else {
  //         console.error('Phản hồi không tồn tại');
  //       }
  //     } else {
  //       console.error('Lỗi không phải từ Axios:', error);
  //     }
  //     alert('Đã xảy ra lỗi khi đăng ký');
  //   }
  // };

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-2">
          <div className="flex-1 bg-black text-center hidden lg:flex">
            <div
              className="m-8 xl:m-10 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTJ8fHxlbnwwfHx8fHw%3D&w=1000&q=80")',
              }}
            ></div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <img
                src="https://inkythuatso.com/uploads/thumbnails/800/2021/09/logo-adidas-vector-inkythuatso-01-29-09-08-58.jpg"
                className="w-mx-auto"
              />
            </div>
            <div className="mt-12 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">
                  <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                      <svg className="w-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">Sign In with Google</span>
                  </button>
                </div>
                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"></div>
                </div>
                <div className="mx-auto max-w-xs">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="inputForm">
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder="FullName"
                        id="fullname"
                        {...register("fullname")}
                      />
                      {errors.fullname && <p>{errors.fullname.message}</p>}
                    </div>
                    <div className="mb-4">
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder="UserName"
                        id="username"
                        {...register("username")}
                      />
                    {errors.username && <p>{errors.username.message}</p>}
                    </div>
                    <div className="mb-4">
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="email"
                        placeholder="Email"
                        id="email"
                        {...register("email")}
                      />
                      {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div className="inputForm">
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="phone"
                        placeholder="Phone Number"
                        id="phone"
                        {...register("phone")}
                      />
                      {errors.phone && <p>{errors.phone.message}</p>}
                    </div>
                    <div className="inputForm">
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder="address"
                        id="address"
                        {...register("address")}
                      />
                      {errors.address && <p>{errors.address.message}</p>}
                    </div>
                    <div className="inputForm">
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="password"
                        placeholder="Password"
                        id="password"
                        {...register("password")}
                      />
                      {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <div className="inputForm">
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="password"
                        placeholder="Cofirm Password"
                        {...register("confirmPassword")}
                      />
                      {errors.confirmPassword && (
                        <p>{errors.confirmPassword.message}</p>
                      )}
                    </div>
                    {serverErrors.length > 0 && (
                      <div>
                        {serverErrors.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                      </div>
                    )}
                    <button
                      type="submit"
                      className="mt-5 tracking-wide font-semibold bg-slate-900 text-white-500 w-full py-4 rounded-lg hover:bg-black transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <span className="ml- text-white	">Sign Up</span>
                    </button>
                  </form>
                  <a href="/signin" className="text-white">
                    <button className="mt-5 tracking-wide font-semibold bg-slate-900 text-white-500 w-full py-4 rounded-lg hover:bg-black transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      Sign in
                    </button>
                  </a>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by Cartesian Kinetics
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>
                    and its
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
