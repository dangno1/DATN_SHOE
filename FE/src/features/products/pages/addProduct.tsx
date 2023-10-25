/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useNavigate } from "react-router-dom";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useAddProductMutation } from "@/api/product";
import { IProduct } from "@/interface/product";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useGetCategoryesQuery } from "@/api/category";
import { ICategory } from "@/interface/category";
import { useGetSizesQuery } from "@/api/size";
import { useGetColorsQuery } from "@/api/color";
import { ISize } from "@/interface/size";
import { IColor } from "@/interface/color";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Image, notification } from "antd";
import { BsArrowLeftShort, BsImage } from "react-icons/bs";
import { useState } from "react";
import { LuUploadCloud } from "react-icons/lu";
import { HiPlus } from "react-icons/hi2";

type NotificationType = 'success' | 'info' | 'warning' | 'error';


const AddProduct = () => {
  const [listThumbnail, setListThumbnail] = useState<any>([])
  const [image, setImage] = useState<string[]>([])
  const navigate = useNavigate();
  const [AddProduct, { isLoading }] = useAddProductMutation();
  const { data: categoryData } = useGetCategoryesQuery();
  const { data: sizeData } = useGetSizesQuery();
  const { data: colorData } = useGetColorsQuery();


  const {
    register,
    handleSubmit,
    control,
  } = useForm<IProduct>({
    defaultValues: {
      variants: [
        {
          sizeId: "",
          colorId: "",
          price: null,
          quantity: null,
          discount: null,
          amountSold: 0,
          status: 1,
        } as any,
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, message: string) => {
    api[type]({
      message: 'Thông báo',
      description: message
    });
  };

  const handleInputThambnail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const listThumbnail = event.target.files ? Array.from(event.target.files) : []
    const thumbailUrls = listThumbnail.map((file: any) => URL.createObjectURL(file))
    setListThumbnail(thumbailUrls)

    if (listThumbnail.length > 20) {
      openNotificationWithIcon("error", `Vui lòng chọn tối đa 20 ảnh`)
      setListThumbnail(thumbailUrls.splice(0, 20))
    }
  }

  const handleInputImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files ? Array.from(event.target.files) : []
    const imageUrls = image.map((file: any) => URL.createObjectURL(file))
    setImage(imageUrls)
  }


  const onSubmit = async (data: IProduct) => {
    try {
      await AddProduct(data)
      notification.success({
        message: "Thêm sản phẩm thành công",
        placement: "topRight",
      });
    } catch (error: any) {
      return error.message
    }
  };

  return (
    <>
      {contextHolder}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading || isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
              Thêm mới Product
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="w-full px-0">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 items-center gap-[20px]">
            <div className="h-max mb-[20px] col-span-2">
              <label className="text-slate-600 font-semibold">Tên sản phẩm*</label>
              <input {...register("name")} type="text" minLength={3} required placeholder="giày af1..." className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full " />
            </div>
            <div className="h-max mb-[20px]">
              <label className="text-slate-600 font-semibold">Thương hiệu*</label>
              <input {...register("brand")} type="text" minLength={3} required placeholder="Thương hiệu*..." className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 font-môn focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full " />
            </div>
            <div className="h-max ">
              <label className="text-slate-600 font-semibold">Category*</label>
              <select required {...register("categoryId")} className="w-full h-[48px] px-[10px] mt-[5px] border mb-[20px] border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full ">
                <option value="" >Category</option>
                {
                  categoryData?.map((category: ICategory) => <option key={category._id} value={category._id}>{category.name}</option>)
                }
              </select>
            </div>
            <div className="h-max mb-[20px] col-span-2">
              <label className="text-slate-600 font-semibold">Mô tả*</label>
              <Controller
                name="desc"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CKEditor
                    editor={ClassicEditor}
                    data={value}
                    onChange={(_event, editor) => {
                      const data = editor.getData();
                      onChange(data);
                    }}

                  />
                )}
              />
            </div>
            <div className="h-max mb-[20px] col-span-2 ">
              <label className="text-slate-600 font-semibold block">Ảnh nền*</label>
              <div className="border border-slate-400 p-[20px] border-dashed rounded-lg grid grid-cols-[250px_auto] w-max">
                <label htmlFor="inputImage" className="">
                  <div className="w-max m-auto h-full grid gap-3 place-items-center">
                    <BsImage className="w-[80px] h-[80px] " />
                    <div className="align-bottom grid grid-cols-[max-content_max-content] gap-[10px] place-items-center w-max"><LuUploadCloud className="w-[20px] h-[20px] " />upload image</div>
                  </div>
                </label>
                {image.length > 0 && image.map((image: string) => <Image key={image} src={image} alt="image" className="w-[100px] max-w-[100px] rounded-lg" />)}
                <input {...register("image")} type="file" id="inputImage" required onChange={handleInputImage} accept="image/jpeg, image/gif, image/png" className="opacity-0 w-full h-[0] max-h-[0]  border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full " />
              </div>
            </div>
            <div className="h-max mb-[20px] col-span-2">
              <label className="text-slate-600 font-semibold block">Thumbnail*</label>
              <div className="w-full h-full border border-slate-400 border-dashed rounded-lg p-[20px] grid grid-cols-[250px_auto]">
                <label htmlFor="inputThumbnail" className="">
                  <div className="w-max m-auto h-full max-h-[120px] grid gap-3 place-items-center">
                    <BsImage className="w-[80px] h-[80px] " />
                    <div className="align-bottom grid grid-cols-[max-content_max-content] gap-[10px] place-items-center w-max"><LuUploadCloud className="w-[20px] h-[20px] " />upload image</div>
                  </div>
                </label>
                <div className="h-max grid grid-cols-10 place-items-center gap-4 mt-5">
                  {listThumbnail && listThumbnail.map((thumbnail: string) => <Image key={thumbnail} src={thumbnail} className="w-full rounded-lg" />)}
                </div>
              </div>
              <input {...register("thumbnail")} type="file" id="inputThumbnail" onChange={handleInputThambnail} required multiple accept="image/jpeg, image/gif, image/png" className="opacity-0 w-full h-[0] max-h-[0 border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full " />
              <div className="h-max col-span-2">
                <label className="text-slate-600 font-semibold">Biến thể*</label>
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
                      <label className="text-slate-600 font-semibold">Giá*</label>
                      <input {...register(`variants.${index}.price`)} type="number" required placeholder="500..." className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full " />
                    </div>
                    <div className="h-max">
                      <label className="text-slate-600 font-semibold">Giảm giá*</label>
                      <input {...register(`variants.${index}.discount`)} type="number" required placeholder="500..." className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full " />
                    </div>
                    <div className="h-max">
                      <label className="text-slate-600 font-semibold">Số lượng*</label>
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
            </div>

            <div className="w-max grid grid-cols-[max-content_max-content_max-content] gap-x-2 place-items-center col-span-2">
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
                variant="contained"
                className="float-right !font-semibold"
                startIcon={<HiPlus className="stroke-1" />}
              >
                Thêm biến thể
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="float-right !font-semibold"
                startIcon={<HiPlus className="stroke-1" />}
              >
                Thêm sản phẩm
              </Button>
              <Button
                onClick={() => navigate("/admin/product")}
                variant="contained"
                className="float-right !font-semibold"
                startIcon={<BsArrowLeftShort className="stroke-[0.5]" />}
              >
                Quay lại
              </Button>
            </div>
          </form>
        </CardBody>
      </Card >
    </>
  );
};

export default AddProduct;