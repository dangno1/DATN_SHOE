/* eslint-disable prefer-const */
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateSizeMutation, useGetSizeQuery } from "@/api/size";
import { ISize } from "@/interface/size";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import sizeSchema from "@/schemas/size";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Alert, Stack } from "@mui/material";

const AddSize = () => {
  const { id } = useParams();
  const { data } = useGetSizeQuery<{ data: ISize }>(String(id));

  const [update, { isLoading, isSuccess }] = useUpdateSizeMutation();
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
  } = useForm<ISize>({
    resolver: joiResolver(sizeSchema),
  });

  const onSubmit = (data: ISize) => {
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
            Cập mới Size
          </Typography>
        </div>
        {openAlert && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">Cập nhật Size thành công</Alert>
          </Stack>
        )}
      </CardHeader>
      <CardBody className="w-[400px] px-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            className="block text-gray-700 text-sm font-bold mb-2 capitalize"
            htmlFor="value">
            Product size
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline-blue-400 focus:border-transparent "
            type="number"
            {...register("value")}
            placeholder="40..."
            defaultValue={data?.value}
          />
          {errors.value && (
            <p className="text-pink-600 text-[13px] font-[600]">
              {errors.value.message}
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
              onClick={() => navigate("/admin/size")}
              className="capitalize bg-gradient-to-r from-[#6f89fb] to-[#5151ec] w-max px-3 py-2 font-medium text-white rounded-lg ">
              Quay lại
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
export default AddSize;
