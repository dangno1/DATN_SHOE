// import { Button } from 'antd';
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useChangePasswordMutation, useUpdateUserMutation } from "@/api/auth";
import { IUser } from "@/interface/auth";
import { changePasswordSchema, updateUserSchema } from "@/schemas/user";
import { notification } from "antd";
type NotificationType = "success" | "info" | "warning" | "error";
const Account = () => {
  const [updateUser] = useUpdateUserMutation();
  const [changePassword] = useChangePasswordMutation();
  const [userData, setUserData] = useState<IUser>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDialogs, setOpenDialogs] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<string>("");
  const [openForms, setOpenForms] = useState<string>("");
  // const openNotification = (type: NotificationType, message: string) => {
  //   notification[type]({
  //     message: "Thông báo",
  //     description: message,
  //   });
  // };
  const openNotification = (type: NotificationType, message: string, field?: string) => {
    if (field) {
      setError(field, {
        type: 'manual',
        message: message,
      });
    } else {
      notification[type]({
        message: "Thông báo",
        description: message,
      });
    }
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUserData(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const { register, handleSubmit, reset, setError, formState } = useForm<{
    fullname: string;
    email?: string;
    username: string;
    phone: string;
    address: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>();

  useEffect(() => {
    userData &&
      reset({
        fullname: userData.fullname,
        username: userData.username,
        phone: userData.phone,
        address: userData.address,
        email: userData.email,
      });
  }, [reset, userData]);

  // const onSubmit = async (data : {
  //   _id:string,
  //   email?: string,
  //   fullname:string,
  //   username:string,
  //   phone:string,
  //   address:string,
  // })=>{
  //   await updateUser({...data, _id: String(userData?._id)})
  // }
  const onSubmit = async (data: IUser) => {
    try {
      await updateUserSchema.validateAsync(data, { abortEarly: false });
      await updateUser({ ...data, _id: String(userData?._id) });
      setUserData((prevUserData) => ({ ...prevUserData, ...data }));
      localStorage.setItem("user", JSON.stringify({ ...userData, ...data }));
      openNotification("success", "Cập nhật thành công");
    } catch (validationError) {
      validationError.details.forEach((detail) => {
        setError(detail.context.key, {
          type: "manual",
          message: detail.message,
        });
      });
    }
  };

  // const onSubmits =async(data:{
  //   _id:string,
  //   newPassword:string,
  //   oldPassword:string,
  //   confirmPassword:string
  // })=>{await changePassword({...data, _id: String(userData?._id)})
  // }

  const onSubmits = async (data) => {
    try {
      const passwordData = {
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
        confirmPassword: data.confirmPassword,
      };
      await changePasswordSchema.validateAsync(passwordData, { abortEarly: false });
      await changePassword({ ...passwordData, _id: String(userData?._id) });
      openNotification('success', 'Cập nhật mật khẩu thành công');
    } catch (validationErrors) {
      validationErrors.details.forEach((error) => {
        console.log(validationErrors);
        const key = error.path[0];
        setError(key, {
          type: 'manual',
          message: error.message,
        });
      });
    }
  };
  

  return (
    <>
      <div>
        <div className="max-w-screen-2xl mx-auto p-14 ">
          <h4 className="font-bold text-2xl align-items-center pb-5">
            THÔNG TIN CỦA TÔI
          </h4>
          <p className="col-s-12">
            Hãy chỉnh sửa bất kỳ thông tin chi tiết nào bên dưới để tài khoản
            của bạn luôn được cập nhật.
          </p>
          <br />
          <hr />
          <div className="col-s-12">
            <h4 className="customSpacing___7RI69 gl-heading-font-set-standard-14___1p8HS font-bold text-xl pb-5 pt-3">
              THÔNG TIN CHI TIẾT
            </h4>
            {userData ? (
              <div className="info-item align-items-center">
                {/* <label>Fullname</label> */}
                <div>{userData.fullname}</div>
                {/* <label>Username</label> */}
                <div>{userData.username}</div>
                {/* <label>Phone</label> */}
                <div>{userData.phone}</div>
                {/* <label>Address</label> */}
                <div>{userData.address}</div>
                <Button
                  className="text-blue-500 cursor-pointer"
                  onClick={() => {
                    setOpenDialog(true);
                    setOpenForm("infor");
                  }}
                >
                  Chỉnh sửa
                </Button>
              </div>
            ) : (
              <p>Không có thông tin người dùng để hiển thị.</p>
            )}
            <br />
            <hr />
            <div>
              <h4 className="font-bold text-xl pt-5 pb-3">
                CHI TIẾT ĐĂNG NHẬP
              </h4>
              <h5>Email</h5>
              <div>{userData?.email}</div>
              <div>
                <Button
                  className="text-blue-500 cursor-pointer"
                  onClick={() => {
                    setOpenDialog(true);
                    setOpenForm("email");
                  }}
                >
                  Chỉnh sửa
                </Button>
              </div>
            </div>
            <br />
            <hr />
            <div>
              <h5 className="font-bold text-xl pt-5 pb-3">Mật khẩu</h5>
              <div>{userData?.password}*****************</div>
              <div>
                <Button
                  className="text-blue-500 cursor-pointer"
                  onClick={() => {
                    setOpenDialogs(true);
                    setOpenForms("password");
                  }}
                >
                  Chỉnh sửa
                </Button>
              </div>
            </div>
            <br /> <br />
            <hr />
            <div>
              <h5 className="font-bold text-xl pt-5 pb-3">
                Đăng xuất khỏi tất cả trình duyệt web
              </h5>
              <span>
                Thao tác này sẽ giúp bạn đăng xuất khỏi tất cả các trình duyệt
                web mà bạn đã sử dụng để truy cập vào trang web của
              </span>
              <span>adidas</span>
              <span>
                . Để đăng nhập lại, bạn sẽ phải nhập thông tin đăng nhập của
                mình.
              </span>
            </div>
            <button className="col-s-12 col-m-6">
              <span
                onClick={handleLogout}
                className="gl-icon__wrapper text-red-500 cursor-pointer"
              >
                Đăng xuất
              </span>
            </button>
          </div>
        </div>
        <br /> <br />
        <br />
        <div className="max-w-screen-2xl mx-auto p-14 ">
          <h1 className="max-w-screen-2xl mx-auto text-2xl align-items-center font-bold pb-5">
            Bạn Cần Trợ Giúp?
          </h1>
          <div className="d-flex justify-between">
            <div>Sản phẩm</div>
            <div>Chương Trình Khuyến Mãi Thông Tin Công Ty</div>
            <div>Đặt Hàng & Thanh Toán</div>
            <div>Trả Lại Hàng & Hoàn Tiền</div>
          </div>
        </div>
      </div>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        scroll="body"
      >
        <DialogTitle>Thông tin người dùng</DialogTitle>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {openForm === "infor" ? (
              <div>
                <label className="text-lg font-medium ">Họ và tên</label>
                <TextField
                  autoFocus
                  margin="dense"
                  id="fullname"
                  type="text"
                  fullWidth
                  variant="standard"
                  {...register("fullname")}
                />
                {formState.errors.fullname && (
                  <p className="text-red-500">
                    {formState.errors.fullname.message}
                  </p>
                )}
                <label className="text-lg font-medium">Tên tài khoản</label>
                <TextField
                  autoFocus
                  margin="dense"
                  id="username"
                  type="text"
                  fullWidth
                  variant="standard"
                  {...register("username")}
                />
                {formState.errors.username && (
                  <p className="text-red-500">
                    {formState.errors.username.message}
                  </p>
                )}
                <label className="text-lg font-medium">Số điện thoại</label>
                <TextField
                  autoFocus
                  margin="dense"
                  id="phone"
                  type="text"
                  fullWidth
                  variant="standard"
                  {...register("phone")}
                />
                {formState.errors.phone && (
                  <p className="text-red-500">
                    {formState.errors.phone.message}
                  </p>
                )}
                <label className="text-lg font-medium">Địa chỉ</label>
                <TextField
                  autoFocus
                  margin="dense"
                  id="address"
                  type="text"
                  fullWidth
                  variant="standard"
                  {...register("address")}
                />
                {formState.errors.address && (
                  <p className="text-red-500">
                    {formState.errors.address.message}
                  </p>
                )}
              </div>
            ) : openForm === "email" ? (
              <div>
                <label>Email</label>
                <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  type="text"
                  fullWidth
                  variant="standard"
                  {...register("email")}
                />
                {formState.errors.email && (
                  <p className="text-red-500">
                    {formState.errors.email.message}
                  </p>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenDialog(false)}
              className="capitalize  from-[black] to-[black] w-max px-3 py-2 font-medium text-white rounded-lg"
            >
              Thoát
            </Button>
            <Button
              type="submit"
              className="capitalize  bg-black from-[black] to-[#black] w-max px-3 py-2 font-medium text-white rounded-lg"
            >
              Lưu
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        open={openDialogs}
        onClose={() => setOpenDialogs(false)}
        fullWidth
        scroll="body"
      >
        <DialogTitle>Đổi mật khẩu</DialogTitle>
        <form action="" onSubmit={handleSubmit(onSubmits)}>
          <DialogContent>
            {openForms === "password" ? (
              <div>
                <label className="text-lg font-medium ">Mật khẩu cũ</label>
                <TextField
                  autoFocus
                  margin="dense"
                  id="oldPassword"
                  type="text"
                  fullWidth
                  variant="standard"
                  {...register("oldPassword")}
                />
                {formState.errors.oldPassword && (
                  <p className="text-red-500">
                    {formState.errors.oldPassword.message}
                  </p>
                )}
                <label className="text-lg font-medium">Mật khẩu mới</label>
                <TextField
                  autoFocus
                  margin="dense"
                  id="newPassword"
                  type="text"
                  fullWidth
                  variant="standard"
                  {...register("newPassword")}
                />
                {formState.errors.newPassword && (
                  <p className="text-red-500">
                    {formState.errors.newPassword.message}
                  </p>
                )}
                <label className="text-lg font-medium">
                  Xác nhận mật khẩu mới
                </label>
                <TextField
                  autoFocus
                  margin="dense"
                  id="confirmPassword"
                  type="text"
                  fullWidth
                  variant="standard"
                  {...register("confirmPassword")}
                />
                {formState.errors.confirmPassword && (
                  <p className="text-red-500">
                    {formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenDialogs(false)}
              className="capitalize  from-[black] to-[black] w-max px-3 py-2 font-medium text-white rounded-lg"
            >
              Thoát
            </Button>
            <Button
              type="submit"
              className="capitalize  bg-black from-[black] to-[#black] w-max px-3 py-2 font-medium text-white rounded-lg"
            >
              Lưu
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Account;
