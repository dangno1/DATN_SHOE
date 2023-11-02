/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import * as muiComponent from "../components/mui.component";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Alert, Stack } from "@mui/material";
import { useAddCouponsMutation } from "@/api/coupons";
import { ICoupons } from "@/interface/coupons";
import couponsSchema from "@/schemas/coupons";

const AddCoupons = () => {
  const [addCoupons, { isLoading, isSuccess }] = useAddCouponsMutation();
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  let closeAlertTimeout: ReturnType<typeof setTimeout>;
  useEffect(() => {
    isSuccess && setOpenAlert(isSuccess);
    closeAlertTimeout = setTimeout(() => {
      setOpenAlert(false);
    }, 3000);
    return () => clearTimeout(closeAlertTimeout);
  }, [isSuccess]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICoupons>({
    resolver: joiResolver(couponsSchema),
    // defaultValues: {
    //   discountType: "cố định",
    // }
  });

  const onSubmit = (data: ICoupons) => {
    console.log(onSubmit);
    addCoupons(data);
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
            Thêm Mới Coupons
          </Typography>
        </div>
        {openAlert && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">Thêm mới Coupons thành công</Alert>
          </Stack>
        )}
      </CardHeader>
      <CardBody className="w-[400px] px-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <muiComponent.TextField
            {...register("code")}
            type="text"
            label="code"
            size="small"
            className="w-full"
            placeholder="coupons"
          />
          {errors.code && (
            <p className="text-pink-600 text-[13px] font-[600]">
              {errors.code.message}
            </p>
          )}
          {/* <muiComponent.TextField
            {...register("discountType")}
            select
            label="discountType"
            size="small"
            className="w-full"
          >
            <MenuItem value="discountType">Phần trăm</MenuItem>
          </muiComponent.TextField>

          {errors.discountType && (
            <p className="text-pink-600 text-[13px] font-[600]">
              {errors.discountType.message}
            </p>
          )} */}

          <muiComponent.TextField
            {...register("discountValue")}
            type="number"
            label="discountValue"
            size="small"
            className="w-full"
            placeholder="giá trị giảm giá"
          />
          {errors.discountValue && (
            <p className="text-pink-600 text-[13px] font-[600]">
              {errors.discountValue.message}
            </p>
          )}
          <muiComponent.TextField
            {...register("quantity")}
            type="number"
            label="quantity"
            size="small"
            className="w-full"
            placeholder="40..."
          />
          {errors.quantity && (
            <p className="text-pink-600 text-[13px] font-[600]">
              {errors.quantity.message}
            </p>
          )}
          <div className="w-max grid grid-cols-2 items-center justify-items-start mt-[10px] gap-x-[10px] ">
            <Button
            
              type="submit"
              disabled={isLoading}
              className="capitalize bg-gradient-to-r from-[#6f89fb] to-[#5151ec] w-max px-3 py-2 font-medium text-white rounded-lg ">
              Thêm mới
            </Button>
            <Button
              onClick={() => navigate("/admin/coupons")}
              className="capitalize bg-gradient-to-r from-[#6f89fb] to-[#5151ec] w-max px-3 py-2 font-medium text-white rounded-lg ">
              Quay lại
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
export default AddCoupons;
