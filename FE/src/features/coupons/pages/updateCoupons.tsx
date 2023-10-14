/* eslint-disable prefer-const */
import { useNavigate, useParams } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
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
import { useGetCouponsQuery, useUpdateCouponsMutation } from "@/api/coupons";
import { ICoupons } from "@/interface/coupons";
import couponsSchema from "@/schemas/coupons";

const UpdateCoupons = () => {
  const { id } = useParams();
  const { data } = useGetCouponsQuery<{ data: ICoupons }>(String(id));

  const [update, { isLoading, isSuccess }] = useUpdateCouponsMutation();
  useEffect(() => {
    isSuccess && setOpenAlert(isSuccess);
    let closeAlertTimeout: number;
    closeAlertTimeout = setTimeout(() => {
      setOpenAlert(false);
    }, 3000);
    return () => clearTimeout(closeAlertTimeout);
  }, [isSuccess]);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICoupons>({
    resolver: joiResolver(couponsSchema),
  });

  const onSubmit = (data: ICoupons) => {
    update({ ...data, _id: id });
    reset();
  };

  return (
    <Card className="h-full w-full px-[50px] ">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none space-y-[20px] ">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <Typography
            variant="h5"
            color="blue-gray"
            className="text-[30px] font-[600]">
            Cập nhật Coupons
          </Typography>
        </div>
        {openAlert && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">Cập Nhật Coupons thành công</Alert>
          </Stack>
        )}
      </CardHeader>
      {
        data && (
          <CardBody className="w-[400px] px-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full h-full relative">
                <label
                  className=" text-gray-500 text-sm px-2 bg-white absolute top-[0] left-[10px] translate-y-[-70%] "
                  htmlFor="value">
                  value
                </label>
                <input
                  className="mb-5 appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:outline-blue-400 focus:border-transparent "
                  type="number"
                  {...register("value")}
                  placeholder="1...100"
                  defaultValue={data?.value}
                  autoFocus
                />
                {errors.value && (
                  <p className="text-pink-600 text-[13px] font-[600]">
                    {errors.value.message}
                  </p>
                )}
              </div>
              <div className="w-full h-full relative">
                <label
                  className=" text-gray-500 text-sm px-2 bg-white absolute top-[0] left-[10px] translate-y-[-70%] "
                  htmlFor="value">
                  value
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline-blue-400 focus:border-transparent "
                  type="number"
                  {...register("quantity")}
                  placeholder="40..."
                  defaultValue={data?.quantity}
                />
                {errors.quantity && (
                  <p className="text-pink-600 text-[13px] font-[600]">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
              <div className="w-max grid grid-cols-2 items-center justify-items-start mt-[10px] gap-x-[10px] ">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="capitalize bg-gradient-to-r from-[#6f89fb] to-[#5151ec] w-max px-3 py-2 font-medium text-white rounded-lg ">
                  Cập nhật
                </Button>
                <Button
                  onClick={() => navigate("/admin/coupons")}
                  className="capitalize bg-gradient-to-r from-[#6f89fb] to-[#5151ec] w-max px-3 py-2 font-medium text-white rounded-lg ">
                  Quay lại
                </Button>
              </div>
            </form>
          </CardBody>
        )
      }
    </Card>
  );
};
export default UpdateCoupons;
