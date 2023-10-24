/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Alert, Stack } from "@mui/material";
import { IUser } from "@/interface/auth";
import { useGetUserByIdQuery, useUpdateUserMutation } from "@/api/auth";


const UpdateUser = () => {
  const { id } = useParams();
  const { data } = useGetUserByIdQuery<{ data: IUser }>(String(id));
  const [update, { isLoading, isSuccess }] = useUpdateUserMutation();
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<IUser>();

  let closeAlertTimeout: ReturnType<typeof setTimeout>;
  useEffect(() => {
    isSuccess && setOpenAlert(isSuccess);
    closeAlertTimeout = setTimeout(() => {
      setOpenAlert(false);
    }, 3000);
    return () => clearTimeout(closeAlertTimeout);
  }, [isSuccess]);

  const onSubmit = (data: IUser) => {
    update({...data, _id:id})
    reset()
  };

  return (
    <Card className="h-full w-full px-[50px] m-auto">
      <CardHeader floated={false} shadow={false} className="rounded-none space-y-[20px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <Typography variant="h5" color="blue-gray" className="text-[30px] font-[600] mx-auto">
            Update User
          </Typography>
        </div>
      </CardHeader>
      {data && (
        <CardBody className="w-[400px] px-0 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full h-full relative">
            <label className="text-gray-800 font-semibold block my-2 text-md" htmlFor="address">Fullname</label>
              <input
                type="text"
                {...register("fullname")}
                placeholder="fullname"
                defaultValue={data?.fullname}
                autoFocus
                className="focus:lable-[none] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:outline-blue-400 focus:border-transparent "
              />
            </div>
            <div className="w-full h-full relative">
            <label className="text-gray-800 font-semibold block my-2 text-md" htmlFor="address">Username</label>
              <input
                type="text"
                {...register("username")}
                placeholder="username"
                defaultValue={data?.username}
                autoFocus
               className="focus:lable-[none] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:outline-blue-400 focus:border-transparent "
              />
            </div>
            <div className="w-full h-full relative">
            <label className="text-gray-800 font-semibold block my-2 text-md" htmlFor="address">Phone</label>
              <input
                type="text"
                {...register("phone")}
                placeholder="phone"
                defaultValue={data?.phone}
                autoFocus
               className="focus:lable-[none] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:outline-blue-400 focus:border-transparent "
              />
            </div>
            <div className="w-full h-full relative">
            <label className="text-gray-800 font-semibold block my-2 text-md" htmlFor="address">Address</label>
              <input
                type="text"
                {...register("address")}
                placeholder="address"
                defaultValue={data?.address}
                autoFocus
               className="focus:lable-[none] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:outline-blue-400 focus:border-transparent "
              />
            </div>
            <div className="h-12 mt-3">
            {openAlert && (
            <Stack className="mb-2"  sx={{ width: "100%" }} spacing={2}>
                <Alert severity="success">The user has successfully updated</Alert>
            </Stack>
             )}
             </div>
            <div className="w-max grid grid-cols-2 items-center justify-items-start mt-[10px] gap-x-[10px]">
              <Button
                type="submit"
                disabled={isLoading}
                className="capitalize bg-gradient-to-r bg-black from-[black] to-[#black] w-max px-3 py-2 font-medium text-white rounded-lg"
              >
                Update
              </Button>
              <Button
                onClick={() => navigate("/user")}
                className="capitalize bg-gradient-to-r from-[black] to-[black] w-max px-3 py-2 font-medium text-white rounded-lg"
              >
                Go Back
              </Button>
            </div>
          </form>

        </CardBody>
      )}
    </Card>
  );
};

export default UpdateUser;
