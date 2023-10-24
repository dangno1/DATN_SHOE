import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IUser } from "../../../../interface/auth";
import { useSignupMutation } from "../../../../api/auth";

const Signup = () => {
  const { handleSubmit, register } = useForm<IUser>();
  const navigate = useNavigate();

  const [signup] = useSignupMutation();

  const onSubmit = (data: IUser) => {
    signup(data)
      .unwrap()
      .then((res) => {
        if (res?.data) {
            alert("Đăng ký thành công");
            console.log("Đăng ký thành công");
            navigate("/signin");
          } else {
            console.log("Đăng ký không thành công. Messages:", res.messages);
          }
      });
  };
  return (
    <>
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js"></script>
<style>@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')</style>

<div className="min-w-screen min-h-screen bg-white flex items-center justify-center px-5 py-5">
    <div className="bg-gray-100 text-black rounded-3xl shadow-xl w-full overflow-hidden" >
        <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-black py-10 px-10">
            <img src="https://bouncin.net/storage/posts/1345/YFyAqfIwqKJ1SVW9M11UqRRZjpnIdYLJQgYTzDpf.jpeg" className="" alt="" />

            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                <div className="text-center mb-10">
                    <h1 className="font-bold text-3xl text-gray-900 mb-5">REGISTER</h1>
                    <p>Enter your information to register</p>
                </div>
                <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex -mx-3">
                        <div className="w-1/2 px-3 mb-5">
                            <label htmlFor="" className="text-xs font-semibold px-1">Full Name</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                <input type="text" 
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Enter full name"
                                id="fullname"
                                {...register("fullname")}
                                />
                            </div>
                        </div>
                        <div className="w-1/2 px-3 mb-5">
                            <label htmlFor="" className="text-xs font-semibold px-1">User Name</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                <input type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Enter your login name"
                                id="username"
                                {...register("username")}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3">
                        <div className="w-1/2 px-3 mb-5">
                            <label htmlFor="" className="text-xs font-semibold px-1">Phone</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                <input type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Enter your phone number"
                                 id="phone"
                                 {...register("phone")}/>
                            </div>
                        </div>
                        <div className="w-1/2 px-3 mb-5">
                            <label htmlFor="" className="text-xs font-semibold px-1">Address</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                <input type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Enter the address"
                                  id="address"
                                  {...register("address")}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <label htmlFor="" className="text-xs font-semibold px-1">Email</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                <input type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="johnsmith@example.com"
                                id="email"
                                {...register("email")}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <label htmlFor="" className="text-xs font-semibold px-1">Password</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                <input type="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************"
                                 id="password"
                                 {...register("password")}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <label htmlFor="" className="text-xs font-semibold px-1">Confirm Password</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                <input type="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************"
                                 {...register("confirmPassword")}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                        <button
                      type="submit"
                      className="mt-5 tracking-wide font-semibold bg-slate-900 text-white w-full py-4 rounded-lg hover:bg-white hover:text-black transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                     Sign in
                    </button>                        
                    </div>
                    </div>
                    </form>
                    <div className="flex -mx-3 mt-3">
                        <div className="w-full px-3 mb-5 text-center text-black hover:text-blue-400">
                        <Link to="/signin">
                        Do you want to switch to the login page?  
                        </Link>
                        </div>
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
