/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useNavigate } from "react-router-dom";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useAddProductMutation } from "@/api/product";
import { IProduct } from "@/interface/product";
import { useGetCategoryesQuery } from "@/api/category";
import { ICategory } from "@/interface/category";
import { useGetSizesQuery } from "@/api/size";
import { useGetColorsQuery } from "@/api/color";
import { ISize } from "@/interface/size";
import { IColor } from "@/interface/color";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Image, Popconfirm, Tooltip, notification } from "antd";
import { BsArrowLeftShort, BsImage } from "react-icons/bs";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineTrash, HiPlus } from "react-icons/hi2";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

type ImageType = { files: File[], url: string[] } | null


const AddProduct = () => {
  const [thumbnail, setThumbnail] = useState<ImageType>(null)
  const [image, setImage] = useState<ImageType>(null)

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
    const thumbnails = event.target.files ? Array.from(event.target.files) : []
    const urls = thumbnails.map((file: File) => URL.createObjectURL(file))

    if (thumbnails.length > 20) {
      openNotificationWithIcon("error", `Vui lòng chọn tối đa 20 ảnh`)
      const newThumbnails = thumbnails.splice(0, 20)

      const newUrl = newThumbnails.map((file: File) => URL.createObjectURL(file))
      setThumbnail({
        files: newThumbnails,
        url: newUrl
      })
      return;
    }

    setThumbnail({
      files: thumbnails,
      url: urls,
    })

  }


  const handleInputImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files ? Array.from(event.target.files) : []

    const imageUrls = image.map((file: any) => URL.createObjectURL(file))
    setImage({
      files: image,
      url: imageUrls
    })
  }


  const handleRemoveImage = (objects: ImageType, index: number): ImageType | null => {
    const files = objects?.files.filter((_item: File, indexItem: number) => indexItem !== index) as File[]
    const url = objects?.url.filter((_item: string, indexItem: number) => indexItem !== index) as string[]
    return ({
      files,
      url
    })
  }


  const onSubmit = async (data: IProduct) => {
    try {
      const newThumbnail = thumbnail?.files as File[];
      const newImage = image?.files as File[];
      await AddProduct({ ...data, thumbnail: newThumbnail, image: newImage })
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
      <div className="m-5 bg-white p-5 rounded-lg">
        <h4 className="mb-8 font-semibold text-3xl">Thêm mới sản phẩm</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-[20px]">
          {/* left */}
          <div className="col-span-2">
            <div className="h-max mb-[20px]">
              <label className="text-slate-600 font-semibold">Tên sản phẩm*</label>
              <input {...register("name")} type="text" minLength={3} required placeholder="giày af1..." className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full " />
            </div>
            <div className="h-max mb-[20px]">
              <label className="text-slate-600 font-semibold">Thương hiệu*</label>
              <input {...register("brand")} type="text" minLength={3} required placeholder="Thương hiệu*..." className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 font-môn focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full " />
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
            {/* biến thể */}
            <div className="h-max col-span-2">
              <label className="text-slate-600 font-semibold">Biến thể*</label>
              <div className="border border-slate-300">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="rounded-[5px] flex gap-2 p-2 mb-[10px]">
                    <div className="w-[150px] h-max">
                      <label className="text-slate-600 font-semibold">Size*</label>
                      <select required {...register(`variants.${index}.sizeId`)} className="w-full h-[48px] px-[10px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full ">
                        <option value="" >Size</option>
                        {
                          sizeData?.map((size: ISize) => <option key={size._id} value={size._id}>{size.value}</option>)
                        }
                      </select>
                    </div>
                    <div className="w-[150px] h-max">
                      <label className="text-slate-600 font-semibold">Color*</label>
                      <select required {...register(`variants.${index}.colorId`)} className="w-full h-[48px] px-[10px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full ">
                        <option value="" >Color</option>
                        {
                          colorData?.map((color: IColor) => <option key={color._id} value={color._id}>{color.value}</option>)
                        }
                      </select>
                    </div>
                    <div className="w-[150px] h-max">
                      <label className="text-slate-600 font-semibold">Giá*</label>
                      <input {...register(`variants.${index}.price`)} type="number" required placeholder="500..." className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full " />
                    </div>
                    <div className="w-[150px] h-max">
                      <label className="text-slate-600 font-semibold">Giảm giá*</label>
                      <input {...register(`variants.${index}.discount`)} type="number" required placeholder="500..." className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full " />
                    </div>
                    <div className="w-[150px] h-max">
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
                    <div className="w-max min-h-full max-h-full grid place-items-center mt-[23px]">
                      {fields.length > 1 && (
                        <Popconfirm
                          title
                          description="Xóa biến thể?"
                          okText="Yes"
                          cancelText="No"
                          okButtonProps={{ className: "bg-red-500 hover:!bg-red-500 active:!bg-red-700" }}
                          cancelButtonProps={{ className: "border-slate-400" }}
                          onConfirm={() => remove(index)}
                        >
                          <Tooltip title="Xóa biến thể" placement="right">
                            <HiOutlineTrash className="stroke-red-600 w-5 h-5 cursor-pointer" />
                          </Tooltip>
                        </Popconfirm>
                      )}
                    </div>
                  </div>
                ))}
                <Tooltip title="Thêm biến thể" className="m-auto grid place-items-center mb-[18px]">
                  <div className="w-8 h-8 rounded-[50%] bg-gray-300">
                    <HiPlus
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
                      className="w-4 h-4 cursor-pointer"
                    />
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="">
            <div className="mb-[20px]">
              <label className="text-slate-600 font-semibold">Category*</label>
              <select required {...register("categoryId")} className="w-full h-[48px] px-[10px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full ">
                <option value="" >Category</option>
                {
                  categoryData?.map((category: ICategory) => <option key={category._id} value={category._id}>{category.name}</option>)
                }
              </select>
            </div>
            <div className="mb-[20px]">
              <label className="text-slate-600 font-semibold block">Hình ảnh</label>
              <div className="h-max max-h-[48px] grid grid-cols-[max-content_auto] gap-x-4 place-items-center border border-slate-300 rounded-md mt-[5px]">
                <label htmlFor="inputImage" className="min-h-[48px] grid place-items-center">
                  <div className="w-max m-auto h-full grid grid-cols-[max-content_max-content] gap-2 place-items-center pl-6">
                    <BsImage className="w-5 h-5" />
                    <div className="align-bottom grid grid-cols-[max-content_max-content] place-items-center w-max">
                      upload
                    </div>
                  </div>
                </label>
                {(image && image?.url.length > 0) &&
                  <div className="w-full h-max grid grid-cols-[90%_auto] rounded-md overflow-hidden">
                    <div className="w-max h-max min-h-[48px] grid grid-cols-[max-content_max-content] gap-x-4 items-center ">
                      <Image key={image.url[0]} src={image.url[0]} alt="image" className="w-[50px] max-w-[50px] !h-[45px] bg-center object-cover rounded-md" />
                      <div className="text-black">{image.files[0]?.name}</div>
                    </div>
                    <div className="grid items-center justify-items-end pr-2 cursor-pointer">
                      <AiOutlineClose className="w-4 h-4 hover:fill-red-500" onClick={() => setImage(() => handleRemoveImage(image, 0))} />
                    </div>
                  </div>}
                <input {...register("image")} type="file" id="inputImage" required onChange={handleInputImage} accept="image/jpeg, image/gif, image/png" className="w-0 h-0 opacity-0" />
              </div>
            </div>
            <div className="mb-[20px]">
              <label className="text-slate-600 font-semibold block">Album ảnh</label>
              <div className="h-max max-h-full border border-slate-300 px-4 rounded-md">
                <label htmlFor="inputThumbnail" className="h-[48px] grid items-center">
                  <div className="w-max h-full grid grid-cols-[max-content_max-content] gap-2 items-center pl-2">
                    <BsImage className="w-5 h-5" />
                    <div className="align-bottom grid grid-cols-[max-content_max-content] place-items-center w-max">
                      upload
                    </div>
                  </div>
                </label>
                {thumbnail && <div className="w-full max-h-[150px] grid grid-cols-2 gap-3 overflow-auto mt-[10px]">
                  {thumbnail.url.map((image: string, index: number) => (
                    <div key={image} className="w-full max-w-[300px] h-[50px] grid grid-cols-[85%_auto] border border-slate-300 rounded-md overflow-hidden">
                      <div className="w-max grid grid-cols-[max-content_max-content] gap-x-2 items-center">
                        <Image src={image} alt="image" className="w-[50px] max-w-[50px] !h-[50px] bg-center object-cover rounded-md" />
                        <div className="text-black w-[90px] max-w-[90px] truncate cursor-default" title={thumbnail?.files[index]?.name}>{thumbnail?.files[index]?.name}</div>
                      </div>
                      <div className="grid place-items-center cursor-pointer">
                        <AiOutlineClose className="w-4 h-4 hover:fill-red-500" onClick={() => setThumbnail(() => handleRemoveImage(thumbnail, index))} />
                      </div>
                    </div>
                  ))}
                </div>}
              </div>
              <input {...register("thumbnail")} type="file" multiple id="inputThumbnail" required onChange={handleInputThambnail} accept="image/jpeg, image/gif, image/png" className="hidden" />
            </div>
          </div>
          <div className="w-max grid grid-cols-[max-content_max-content_max-content] gap-x-2 place-items-center col-span-2">
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
        </form >
      </div >
    </>
  );
};

export default AddProduct;