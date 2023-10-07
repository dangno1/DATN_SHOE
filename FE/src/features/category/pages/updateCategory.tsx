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
import { useGetCategoryQuery, useUpdateCategoryMutation } from "@/api/category";
import { ICategory } from "@/interface/category";
import categorySchema from "@/schemas/category";

const AddSize = () => {
  const { id } = useParams();
  const { data } = useGetCategoryQuery<{ data: ICategory }>(String(id));
  const [update, { isLoading, isSuccess }] = useUpdateCategoryMutation();
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
  } = useForm<ICategory>({
    resolver: joiResolver(categorySchema),
  });

  const onSubmit = (data: ICategory) => {
    const trimValue = data.name.trim()
    update({ ...data, name: trimValue, _id: id })
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
            Cập nhật Category
          </Typography>
        </div>
        {openAlert && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">Cập nhật Category thành công</Alert>
          </Stack>
        )}
      </CardHeader>
      <CardBody className="w-[400px] px-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full h-full relative">
            <label
              className=" text-gray-500 text-sm px-2 bg-white absolute top-[0] left-[10px] translate-y-[-70%] "
              htmlFor="value">
              category
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="giày nam..."
              defaultValue={data?.name}
              autoFocus
              className="focus:lable-[none] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:outline-blue-400 focus:border-transparent "
            />
          </div>
          {errors.name && (
            <p className="text-pink-600 text-[13px] font-[600]">
              {errors.name.message}
            </p>
          )}
          <div className="w-max grid grid-cols-2 items-center justify-items-start mt-[10px] gap-x-[10px] ">
            <Button
              type="submit"
              disabled={isLoading}
              className="capitalize bg-gradient-to-r from-[#6f89fb] to-[#5151ec] w-max px-3 py-2 font-medium text-white rounded-lg ">
              Cập nhật
            </Button>
            <Button
              onClick={() => navigate("/admin/categoryes")}
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
