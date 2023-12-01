import { useForm } from "react-hook-form";
import { useAddUserMutation } from "@/api/auth";
import { IUser } from "@/interface/auth";
import { Link } from "react-router-dom";
import { notification } from "antd";
import { userSchema } from "@/schemas/user";
type NotificationType = "success" | "info" | "warning" | "error";
const AddAdmin = () => {
  const { register, handleSubmit, setError, formState } = useForm<IUser>();
  const [addUser, { isLoading }] = useAddUserMutation();

  const openNotification = (type: NotificationType, message: string) => {
    notification[type]({
      message: "Thông báo",
      description: message,
    });
  };

  const onSubmit = async (data: IUser) => {
    try {
      await userSchema.validateAsync(data, { abortEarly: false });

      const res = await addUser(data).unwrap();

      if (res?.data) {
        console.log("ok");
        openNotification("success", "Đăng ký thành công");
      } else {
        console.log("Messages:", res.data);
        openNotification("success", "Đăng ký thành công");
        console.log(res);
      }
    } catch (error) {
      if (error.details) {
        error.details.forEach((detail: any) => {
          setError(detail.path[0], {
            type: "manual",
            message: detail.message,
          });
        });
      }
    }
  };
  return (
    <div className="flex justify-center items-center ">
      <div className="lg:w-3/5 md:w-1/2 w-2/3">
        <form className="bg-white p-10 " onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center text-2xl mb-4 text-gray-600 font-bold font-sans">
            Thêm Admin
          </h1>
          <div>
            <label
              className="text-gray-800 font-semibold block my-2 text-md"
              htmlFor="username"
            >
              Họ và tên
            </label>
            <input
              {...register("fullname")}
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Nhập họ và tên"
            />
          </div>
          {formState.errors.fullname && (
            <p className="text-red-500">{formState.errors.fullname.message}</p>
          )}
          <div>
            <label
              className="text-gray-800 font-semibold block my-2 text-md"
              htmlFor="username"
            >
              Tên tài khoản
            </label>
            <input
              {...register("username")}
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="text"
              name="username"
              id="username"
              placeholder="Nhập tên tài khoản"
            />
          </div>
          {formState.errors.username && (
            <p className="text-red-500">{formState.errors.username.message}</p>
          )}
          <div>
            <label
              className="text-gray-800 font-semibold block my-2 text-md"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email")}
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="text"
              name="email"
              id="email"
              placeholder="Nhập email"
            />
          </div>
          {formState.errors.email && (
            <p className="text-red-500">{formState.errors.email.message}</p>
          )}
          <div>
            <label
              className="text-gray-800 font-semibold block my-2 text-md"
              htmlFor="phone"
            >
              Số điện thoại
            </label>
            <input
              {...register("phone")}
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="text"
              name="phone"
              id="phone"
              placeholder="Nhập số điện thoại"
            />
          </div>
          {formState.errors.phone && (
            <p className="text-red-500">{formState.errors.phone.message}</p>
          )}
          <div>
            <label
              className="text-gray-800 font-semibold block my-2 text-md"
              htmlFor="address"
            >
              Địa chỉ
            </label>
            <input
              {...register("address")}
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="text"
              name="address"
              id="address"
              placeholder="Nhập địa chỉ"
            />
          </div>
          {formState.errors.address && (
            <p className="text-red-500">{formState.errors.address.message}</p>
          )}
          <div>
            <label
              className="text-gray-800 font-semibold block my-2 text-md"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <input
              {...register("password")}
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="text"
              name="password"
              id="password"
              placeholder="Nhập mật khẩu"
            />
          </div>
          {formState.errors.password && (
            <p className="text-red-500">{formState.errors.password.message}</p>
          )}
          <div>
            <label
              className="text-gray-800 font-semibold block my-2 text-md"
              htmlFor="confirm"
            >
              Nhập lại mật khẩu
            </label>
            <input
              {...register("confirmPassword")}
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="text"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Xác thực lại mật khẩu"
            />
          </div>
          {formState.errors.confirmPassword && (
            <p className="text-red-500">
              {formState.errors.confirmPassword.message}
            </p>
          )}
          <div className="buttons flex mt-6">
            <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto rounded-2xl">
              <Link to="/admin/users">Quay Lại</Link>
            </div>
            <div className="btn border border-black  p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-black rounded-2xl">
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Đang thêm..." : "Thêm"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
