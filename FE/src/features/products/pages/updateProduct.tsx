/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useNavigate, useParams } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Alert, Stack } from "@mui/material";
import { useGetProductQuery, useUpdateProductMutation } from "@/api/product";
import { IProduct } from "@/interface/product";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useGetCategoryesQuery } from "@/api/category";
import { ICategory } from "@/interface/category";
import { useGetSizesQuery } from "@/api/size";
import { useGetColorsQuery } from "@/api/color";
import { ISize } from "@/interface/size";
import { IColor } from "@/interface/color";

const UpdateProduct = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams()
  const [UpdateProduct, { isLoading, isSuccess }] = useUpdateProductMutation();
  const { data: categoryData } = useGetCategoryesQuery();
  const { data: sizeData } = useGetSizesQuery();
  const { data: colorData } = useGetColorsQuery();
  const { data: productData } = useGetProductQuery(String(id))

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
    control,
    reset,
  } = useForm<IProduct>(
      // {
      //   defaultValues: {
      //     _id: "6527b992f04bc5a8412c47e6",
      //     name: "ưert",
      //     desc: "ưert",
      //     brand: "qưert",
      //     categoryId: "65227994a27a4572bcfffc2a",
      //     variants: [
      //       {
      //         sizeId: "6523c14649044835ba9055d0",
      //         colorId: "6522b41321a876466f653c7f",
      //         price: 400,
      //         discount: 100,
      //         amountSold: 0,
      //         quantity: 1000,
      //         status: 1
      //       },
      //       {
      //         sizeId: "6523c14649044835ba9055d0",
      //         colorId: "6522b41321a876466f653c7f",
      //         price: 400,
      //         discount: 100,
      //         amountSold: 0,
      //         quantity: 1000,
      //         status: 1
      //       }
      //     ],
      //   }
      // }

    )

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  useEffect(() => {
    productData && reset(productData)
  }, [productData])

  const onSubmit = (data: IProduct) => {
    // console.log(data);

    UpdateProduct({ ...data, _id: id })
  };

  return (
    <>
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
              Update Product
            </Typography>
          </div>
          {openAlert && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="success">Thêm mới Product thành công</Alert>
            </Stack>
          )}
        </CardHeader>
        {
          productData && (<CardBody className="w-full px-0"><form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 items-center gap-[20px]">
            <div className="h-max mb-[20px]">
              <label className="text-gray-500">Tên sản phẩm*</label>
              <input {...register("name")} type="text" minLength={3} required placeholder="giày af1..." className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full " />
            </div>
            <div className="h-max mb-[20px]">
              <label className="text-gray-500">Thương hiệu*</label>
              <input {...register("brand")} type="text" minLength={3} required placeholder="Thương hiệu*..." className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 font-môn focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full " />
            </div>
            <div className="h-max mb-[20px]">
              <label className="text-gray-500">Mô tả*</label>
              <textarea {...register("desc")} minLength={3} required placeholder="Mô tả*..." className="w-full h-[48px] mt-[5px] pt-[12px] border border-[#d0dbf0] hover:border-gray-500 font-môn focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full " />
            </div>
            <div className="h-max mb-[20px]">
              <label className="text-gray-500">Image*</label>
              <input {...register("image")} type="file" minLength={3} required accept="image/jpeg, image/gif, image/png" className="w-full h-[48px] mt-[5px] px-[10px] pt-[10px] border border-[#d0dbf0] hover:border-gray-500 font-môn focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full " />
            </div>
            <div className="h-max mb-[20px]">
              <label className="text-gray-500">Thumbnail*</label>
              <input {...register("thumbnail")} type="file" minLength={3} required multiple accept="image/jpeg, image/gif, image/png" className="w-full h-[48px] mt-[5px] px-[10px] pt-[10px] border border-[#d0dbf0] hover:border-gray-500 font-môn focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full " />
            </div>
            <div className="h-max ">
              <label className="text-gray-500">Category*</label>
              <select required {...register("categoryId")} className="w-full h-[48px] px-[10px] mt-[5px] border mb-[20px] border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full ">
                <option value="" >Category</option>
                {
                  categoryData?.map((category: ICategory) => <option key={category._id} value={category._id}>{category.name}</option>)
                }
              </select>
            </div>
            <div className="h-max col-span-2">
              <label className="text-gray-500">Biến thể*</label>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="rounded-[5px] border border-[#d0dbf0] grid grid-cols-6 items-center gap-x-[10px] p-2 mb-[10px]">
                  <div className="h-max">
                    <label className="text-gray-500 pl-[4px]">Size*</label>
                    <select required {...register(`variants.${index}.sizeId`)} className="w-full h-[48px] px-[10px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full ">
                      <option value="" >Size</option>
                      {
                        sizeData?.map((size: ISize) => <option key={size._id} value={size._id}>{size.value}</option>)
                      }
                    </select>
                  </div>
                  <div className="h-max">
                    <label className="text-gray-500 pl-[4px]">Color*</label>
                    <select required {...register(`variants.${index}.colorId`)} className="w-full h-[48px] px-[10px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full ">
                      <option value="" >Color</option>
                      {
                        colorData?.map((color: IColor) => <option key={color._id} value={color._id}>{color.value}</option>)
                      }
                    </select>
                  </div>
                  <div className="h-max">
                    <label className="text-gray-500">Giá*</label>
                    <input {...register(`variants.${index}.price`)} type="number" required placeholder="500..." className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full " />
                  </div>
                  <div className="h-max">
                    <label className="text-gray-500">Giảm giá*</label>
                    <input {...register(`variants.${index}.discount`)} type="number" required placeholder="500..." className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full " />
                  </div>
                  <div className="h-max">
                    <label className="text-gray-500">Số lượng*</label>
                    <input {...register(`variants.${index}.quantity`)} type="number" required placeholder="500..." className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full " />
                  </div>
                  <div className="hidden">
                    <input
                      type="number"
                      {...register(`variants.${index}.amountSold`)}
                    />
                  </div>
                  <div className="hidden">
                    <input
                      type="number"
                      {...register(`variants.${index}.status`)}
                    />
                  </div>
                  <div className="h-max">
                    {fields.length > 1 && (
                      <div className="grid place-items-center">
                        <label className="text-gray-500 ">Action</label>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="bg-red-500 mt-[5px] py-2 px-3 text-white rounded flex items-center space-x-1">
                          <RiDeleteBin6Line />
                          <span>Xóa</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-max grid grid-cols-3 place-items-center gap-x-[10px] col-span-2">
              <Button
                onClick={() =>
                  append({
                    sizeId: "",
                    colorId: "",
                    price: null,
                    quantity: null,
                    discount: null,
                    amountSold: 0,
                    status: 1,
                  } as any)
                }
                disabled={isLoading}
                className="capitalize bg-gradient-to-r from-[#6f89fb] to-[#5151ec] w-max px-3 py-2 font-medium text-white rounded-lg ">
                Thêm biến thể
              </Button>
              <Button
                type="submit"
                // disabled={isLoading}
                className="w-full capitalize bg-gradient-to-r from-[#6f89fb] to-[#5151ec] px-3 py-2 font-medium text-white rounded-lg ">
                Thêm mới
              </Button>
              <Button
                onClick={() => navigate("/admin/product")}
                className="w-full capitalize bg-gradient-to-r from-[#6f89fb] to-[#5151ec] px-3 py-2 font-medium text-white rounded-lg ">
                Quay lại
              </Button>
            </div>
          </form></CardBody>)
        }
      </Card ></>
  );
};

export default UpdateProduct;