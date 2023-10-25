/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useGetProductQuery, useRemoveThumbnailMutation, useUpdateProductMutation } from "@/api/product";
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
import { Image, Popconfirm, notification } from "antd";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import { LuUploadCloud } from 'react-icons/lu'

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const UpdateProduct = () => {
  const [listThumbnail, setListThumbnail] = useState<any>([])
  const [image, setImage] = useState<string[]>([])
  const navigate = useNavigate();
  const { id } = useParams()
  const [UpdateProduct, { isLoading }] = useUpdateProductMutation();
  const { data: categoryData } = useGetCategoryesQuery();
  const { data: sizeData } = useGetSizesQuery();
  const { data: colorData } = useGetColorsQuery();
  const { data: productData } = useGetProductQuery(String(id))
  const [removeThumbnail, { isLoading: isLoadingThumbnail }] = useRemoveThumbnailMutation()

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

    if (listThumbnail.length > (20 - Number(productData?.thumbnail.length))) {
      openNotificationWithIcon("error", `Vui lòng chọn tối đa ${(20 - Number(productData?.thumbnail.length))} ảnh`)
      setListThumbnail(thumbailUrls.splice(0, (20 - Number(productData?.thumbnail.length))))
    }
  }

  const handleInputImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files ? Array.from(event.target.files) : []
    const imageUrls = image.map((file: any) => URL.createObjectURL(file))
    setImage(imageUrls)
  }

  const [requiredInput, setRequiredInput] = useState<boolean>(false)

  useEffect(() => {
    if (productData?.thumbnail.length === 0) {
      setRequiredInput(true)
    }
  }, [productData])

  const {
    register,
    handleSubmit,
    control,
    reset,
  } = useForm<IProduct>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  useEffect(() => {
    reset(productData)
  }, [productData])

  const onSubmit = async (data: IProduct) => {
    try {
      productData?.thumbnail.length === 0
      console.log(listThumbnail);
      await UpdateProduct({ ...data, _id: id })
      setListThumbnail([])
      openNotificationWithIcon("success", "Cập nhật sản phẩm thành công")
    } catch (error: any) {
      return error.message
    }
  };

  const handleRemoveThumbnail = async (id: string, publicId: string) => {
    try {
      await removeThumbnail({ id, publicId })
      openNotificationWithIcon("success", "Xóa ảnh thành công")
    } catch (error: any) {
      return error.message
    }
  }

  // const remoteAllThumbnail = (id: string) => {
  //   if (productData?.thumbnail.length === 0) return
  //   productData?.thumbnail.map(async (thumbnail: string) => {
  //     const splitThumbnail = thumbnail.split("/");
  //     const publicId = splitThumbnail[splitThumbnail.length - 1].split(".")[0];
  //     await removeThumbnail({ id, publicId })
  //   })
  //   openNotificationWithIcon("success", "Xóa ảnh thành công")
  // }

  return (
    <>
      {contextHolder}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading || isLoadingThumbnail}
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
              Update Product
            </Typography>
          </div>
        </CardHeader>
        {
          productData &&
          (<CardBody className="w-full px-0">
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
                <div className="border border-slate-400 p-[20px] border-dashed rounded-lg grid grid-cols-2 w-max">
                  <label htmlFor="inputImage" className="">
                    <div className="w-max m-auto h-full grid gap-3 place-items-center">
                      <BsImage className="w-[80px] h-[80px] " />
                      <div className="align-bottom grid grid-cols-[max-content_max-content] gap-[10px] place-items-center w-max"><LuUploadCloud className="w-[20px] h-[20px] " />upload image</div>
                    </div>
                  </label>
                  {image.length > 0 ? image.map((image: string) => <Image key={image} src={image} alt="image" className="w-[100px] max-w-[100px] rounded-lg" />) : <Image src={productData.image} alt="image" className="w-[100px] max-w-[100px] rounded-lg" />}
                  <input {...register("image")} type="file" id="inputImage" onChange={handleInputImage} accept="image/jpeg, image/gif, image/png" className="opacity-0 w-full h-[0] max-h-[0]  border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full " />
                </div>
              </div>
              <div className="h-max mb-[20px] col-span-2">
                <label className="text-slate-600 font-semibold block">Thumbnail*</label>
                <div className="w-full h-full border border-slate-400 border-dashed rounded-lg p-[20px] grid grid-cols-[20%_auto]">
                  <label htmlFor="inputThumbnail" className="grid items-center">
                    <div className="w-max m-auto h-full max-h-[120px] grid gap-3 place-items-center">
                      <BsImage className="w-[80px] h-[80px] " />
                      <div className="align-bottom grid grid-cols-[max-content_max-content] gap-[10px] place-items-center w-max"><LuUploadCloud className="w-[20px] h-[20px] " />upload image</div>
                    </div>
                  </label>
                  <div className="h-max grid grid-cols-10 place-items-center gap-4 mt-5">
                    {productData && productData.thumbnail.map((thumbnail: string) =>
                      <Popconfirm
                        key={thumbnail}
                        title
                        description="Xóa ảnh?"
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ className: "bg-red-500 hover:!bg-red-500 active:!bg-red-700" }}
                        cancelButtonProps={{ className: "border-slate-400" }}
                        onConfirm={() => {
                          const splitThumbnail = thumbnail.split("/");
                          const publicId = splitThumbnail[splitThumbnail.length - 1].split(".")[0];
                          handleRemoveThumbnail(String(id), publicId)
                        }}
                      >
                        <div className="relative w-full grid place-items-center h-max">
                          <Image src={thumbnail} preview={false} className="w-max rounded-lg" />
                          {(productData.thumbnail.length > 1 || listThumbnail.length >= 1) && <AiFillCloseCircle className="absolute top-1 right-1 cursor-pointer hover:fill-pink-600" />}
                        </div>
                      </Popconfirm>
                    )}
                    {listThumbnail && listThumbnail.map((thumbnail: string) => <Image key={thumbnail} src={thumbnail} className="w-full rounded-lg" />)}
                  </div>
                </div>
                <input {...register("thumbnail")} type="file" id="inputThumbnail" onChange={handleInputThambnail} required={requiredInput} multiple accept="image/jpeg, image/gif, image/png" className="opacity-0 w-full h-[0] max-h-[0 border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full " />
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
                </div></div>

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
                  className="capitalize bg-gradient-to-r from-[#6f89fb] to-[#5151ec] w-max px-3 py-2 font-medium text-white rounded-lg ">
                  Thêm biến thể
                </Button>
                <Button
                  type="submit"
                  className="w-full capitalize bg-gradient-to-r from-[#6f89fb] to-[#5151ec] px-3 py-2 font-medium text-white rounded-lg ">
                  Cập nhật
                </Button>
                <Button
                  onClick={() => navigate("/admin/product")}
                  className="w-full capitalize bg-gradient-to-r from-[#6f89fb] to-[#5151ec] px-3 py-2 font-medium text-white rounded-lg ">
                  Quay lại
                </Button>
              </div>
            </form>
          </CardBody>)
        }
      </Card ></>
  );
};

export default UpdateProduct;