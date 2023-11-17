// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable prefer-const */
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
import { joiResolver } from '@hookform/resolvers/joi'
import '../index.css'
import productSchema from "@/schemas/product";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type ImageType = { files: File[], url: string[] } | null


const AddProduct = () => {
  const [thumbnail, setThumbnail] = useState<ImageType>()
  const [image, setImage] = useState<ImageType>()
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type: NotificationType, message: string) => {
    api[type]({
      message: 'Thông báo',
      description: message
    });
  };

  const [AddProduct, { isLoading }] = useAddProductMutation();
  const { data: categoryData } = useGetCategoryesQuery();
  const { data: sizeData } = useGetSizesQuery();
  const { data: colorData } = useGetColorsQuery();


  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
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
        } as never,
      ],
    },
    resolver: joiResolver(productSchema)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const handleInputThambnail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const thumbnails = event.target.files ? Array.from(event.target.files) : []
    const combineThumb = thumbnail ? [...thumbnail.files, ...thumbnails] : thumbnails

    const urls = combineThumb.map((file: File) => URL.createObjectURL(file))

    if (combineThumb.length > 20) {
      openNotification("error", `Chọn tối đa 20 ảnh`)
      const newThumb = combineThumb.splice(0, 20)
      const newUrl = newThumb.map((file: File) => URL.createObjectURL(file))
      setThumbnail({
        files: newThumb,
        url: newUrl
      })
      return;
    }

    setThumbnail({
      files: combineThumb,
      url: urls,
    })

  }

  const handleInputImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files ? Array.from(event.target.files) : []

    const imageUrls = image.map((file: File) => URL.createObjectURL(file))
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

  const handleAddproduct = async (data: IProduct) => {
    try {
      const newThumbnail = thumbnail?.files as File[];
      const newImage = image?.files as File[];
      await AddProduct({ ...data, thumbnail: newThumbnail, image: newImage })
      openNotification("success", "Thêm sản phẩm thành công")
      reset()
      setImage(null)
      setThumbnail(null)
    } catch (error: unknown) {
      return error && error instanceof Error && error.message
    }
  };

  return (
    <>
      <div className="p-5">
        <h4 className="mb-8 font-bold text-3xl uppercase text-slate-700">Thêm mới sản phẩm</h4>
        <form onSubmit={handleSubmit(handleAddproduct)} className="grid grid-cols-3 gap-[20px] bg-white p-5 rounded-lg">
          {/* left */}
          <div className="col-span-2">
            <div className="h-max mb-[20px]">
              <label className="text-slate-600 font-semibold">Tên sản phẩm</label>
              <input
                {...register("name")} type="text" placeholder="giày af1..."
                className={`w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500
                  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f]
                 placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full ${errors.name && 'border-red-500'}`} />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>
            <div className="h-max mb-[20px]">
              <label className="text-slate-600 font-semibold">Thương hiệu</label>
              <input
                {...register("brand")} type="text" placeholder="Thương hiệu*..."
                className={`w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0
                focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px]
                focus:shadow-full ${errors.brand && 'border-red-500'}`} />
              {errors.brand && <span className="text-red-500">{errors.brand.message}</span>}
            </div>
            <div className="h-max mb-[20px] col-span-2 space-y-[5px]">
              <label className="text-slate-600 font-semibold">Mô tả</label>
              <div className={`border ${errors.desc && 'border-red-500'}`}>
                <Controller
                  name="desc"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CKEditor
                      editor={ClassicEditor}
                      data={value || ''}
                      onChange={(_event, editor) => {
                        const data = editor.getData();
                        onChange(data);
                      }}
                    />
                  )}
                />
              </div>
              {errors.desc && <span className="text-red-500">{errors.desc.message}</span>}
            </div>
          </div>
          {/* right */}
          <div className="">
            <div className="mb-[20px]">
              <label className="text-slate-600 font-semibold">Danh mục sản phẩm*</label>
              <select {...register("categoryId")}
                className={`w-full h-[48px] px-[10px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full ${errors.categoryId && 'border-red-500'}`}>
                <option value="" >Category</option>
                {
                  categoryData?.map((category: ICategory) => <option key={category._id} value={category._id}>{category.name}</option>)
                }
              </select>
              {errors.categoryId && <span className="text-red-500">{errors.categoryId.message}</span>}
            </div>
            <div className="mb-[20px]">
              <label className="text-slate-600 font-semibold block">Hình ảnh</label>
              <div className={`min-h-[110px] max-h-[150px] border border-slate-300 rounded-md mt-[5px] p-4 ${errors.image && !image?.files.length && '!border-red-500'}`}>
                <label htmlFor="inputImage" className="h-[48px] grid items-center">
                  <div className="w-max h-full grid grid-cols-[max-content_max-content] gap-2 items-center">
                    <BsImage className="w-5 h-5" />
                    <div className="align-bottom grid grid-cols-[max-content_max-content] place-items-center w-max">
                      Chọn 1 ảnh
                    </div>
                  </div>
                </label>
                {(image && image?.url.length > 0) &&
                  <div className="w-full h-max grid grid-cols-[90%_auto] rounded-md overflow-hidden border border-slate-300 mt-[10px]">
                    <div className="w-max h-max min-h-[48px] grid grid-cols-[max-content_max-content] gap-x-4 items-center">
                      <Image key={image.url[0]} src={image.url[0]} alt="image"
                        className="w-[50px] max-w-[50px] !h-full bg-center object-cover rounded-l-md" />
                      <div className="text-black w-max max-w-[200px] truncate">
                        {image.files[0]?.name}
                      </div>
                    </div>
                    <div className="grid items-center justify-items-end pr-2 cursor-pointer">
                      <AiOutlineClose className="w-4 h-4 hover:fill-red-500 "
                        onClick={() => setImage(() => handleRemoveImage(image, 0))} />
                    </div>
                  </div>}
                <input {...register("image")} type="file" id="inputImage"
                  onChange={handleInputImage}
                  accept="image/jpeg, image/gif, image/png"
                  className="w-0 h-0 opacity-0" />
              </div>
              {errors.image && !image?.files.length && <span className="text-red-500">Vui Lòng chọn 1 ảnh</span>}
            </div>
            <div className="mb-[20px]">
              <label className="text-slate-600 font-semibold block">Album ảnh</label>
              <div className={`min-h-[110px] h-max border border-slate-300 p-4 rounded-md mt-[5px] ${errors.thumbnail && !thumbnail?.files.length && '!border-red-500'}`}>
                <label htmlFor="inputThumbnail" className="h-[48px] grid items-center">
                  <div className="w-max h-full grid grid-cols-[max-content_max-content] gap-2 items-center">
                    <BsImage className="w-5 h-5" />
                    <div className="align-bottom grid grid-cols-[max-content_max-content] place-items-center w-max">
                      Chọn 1 hoặc nhiều ảnh
                    </div>
                  </div>
                </label>
                <div className="w-full max-h-[150px] grid grid-cols-2 gap-3 overflow-auto mt-[10px]">
                  {thumbnail && thumbnail.url.map((image: string, index: number) =>
                  (<div key={image} className="w-full max-w-[300px] h-[50px] grid grid-cols-[85%_auto] border border-slate-300 rounded-md overflow-hidden">
                    <div className="w-max grid grid-cols-[max-content_max-content] gap-x-2 items-center">
                      <Image src={image} alt="image" className="w-[50px] max-w-[50px] !h-[50px] bg-center object-cover rounded-l-md" />
                      <div className="text-black max-w-[80px] truncate cursor-default" title={thumbnail?.files[index]?.name}>{thumbnail?.files[index]?.name}</div>
                    </div>
                    <div className="grid place-items-center cursor-pointer">
                      <AiOutlineClose className="fill-orange-700 w-4 h-4" onClick={() => setThumbnail(() => handleRemoveImage(thumbnail, index))} />
                    </div>
                  </div>))}
                </div>
              </div>
              <input {...register("thumbnail")} type="file" multiple id="inputThumbnail" onChange={handleInputThambnail} accept="image/jpeg, image/gif, image/png" className="hidden" />
              {errors.image && !thumbnail?.files.length && <span className="text-red-500">Vui Lòng tối thiểu 1 ảnh</span>}
            </div>
          </div>
          {/* biến thể */}
          <div className="h-max col-span-3 relative">
            <label className="text-slate-600 font-semibold">Sản phẩm biến thể</label>
            <div className="before:w-full before:h-[1px] before:bg-slate-300 before:absolute mt-2">
              {fields.map((field, index) => (
                <div key={field.id} className="rounded-[5px] grid grid-cols-[95%_auto] gap-2 place-items-center p-2 pt-5 mb-[10px]">
                  <div className="w-full grid grid-cols-5 gap-4">
                    <div className="w-full h-max">
                      <label className="text-slate-600 font-semibold">Kích cỡ</label>
                      <select {...register(`variants.${index}.sizeId`)} className={`w-full h-[48px] px-[10px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full ${errors?.variants?.[index]?.sizeId?.message && "border-red-500"}`}>
                        <option value="" >Size</option>
                        {
                          sizeData?.map((size: ISize) => <option key={size._id} value={size._id}>{size.value}</option>)
                        }
                      </select>
                      {errors?.variants?.[index]?.colorId && <span className="text-red-500 text-[13px] capitalize">{errors?.variants?.[index]?.colorId?.message}</span>}
                    </div>
                    <div className="w-full h-max">
                      <label className="text-slate-600 font-semibold">Màu sắc</label>
                      <select {...register(`variants.${index}.colorId`)} className={`w-full h-[48px] px-[10px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full ${errors?.variants?.[index]?.colorId?.message && "border-red-500"}`}>
                        <option value="" >Color</option>
                        {
                          colorData?.map((color: IColor) => <option key={color._id} value={color._id}>{color.value}</option>)
                        }
                      </select>
                      {errors?.variants?.[index]?.colorId && <span className="text-red-500 text-[13px] capitalize">{errors?.variants?.[index]?.colorId?.message}</span>}
                    </div>
                    <div className="w-full h-max">
                      <label className="text-slate-600 font-semibold">Giá gốc</label>
                      <input {...register(`variants.${index}.price`)} type="number" placeholder="500..." className={`w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full ${errors?.variants?.[index]?.sizeId?.message && "border-red-500"}`} />
                      {errors?.variants?.[index]?.price && <span className="text-red-500 text-[13px] capitalize">{errors?.variants?.[index]?.price?.message}</span>}
                    </div>
                    <div className="w-full h-max">
                      <label className="text-slate-600 font-semibold">Giá khuyến mãi</label>
                      <input {...register(`variants.${index}.discount`)} type="number" placeholder="500..." className={`w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full ${errors?.variants?.[index]?.sizeId?.message && "border-red-500"}`} />
                      {errors?.variants?.[index]?.discount && <span className="text-red-500 text-[13px] capitalize">{errors?.variants?.[index]?.discount?.message}</span>}
                    </div>
                    <div className="w-full h-max">
                      <label className="text-slate-600 font-semibold">Số lượng</label>
                      <input {...register(`variants.${index}.quantity`)} type="number" placeholder="500..." className={`w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full ${errors?.variants?.[index]?.sizeId?.message && "border-red-500"}`} />
                      {errors?.variants?.[index]?.quantity && <span className="text-red-500 text-[13px] capitalize">{errors?.variants?.[index]?.quantity?.message}</span>}
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
                </div >
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
                      } as never)
                    }
                    className="w-4 h-4 cursor-pointer"
                  />
                </div>
              </Tooltip>
            </div >
          </div >
          {/* button */}
          <div className="w-max grid grid-cols-[max-content_max-content_max-content] gap-x-2 place-items-center col-span-2" >
            <Button
              type="submit"
              variant="contained"
              className="float-right !font-semibold !bg-[#58b4ff] !shadow-none"
              startIcon={<HiPlus className="stroke-1" />}
            >
              Thêm mới
            </Button>
            <Button
              onClick={() => navigate("/admin/product")}
              variant="contained"
              className="float-right !font-semibold !bg-[#df5e5e] !shadow-none"
              startIcon={<BsArrowLeftShort className="stroke-[0.5]" />}
            >
              Quay lại
            </Button>
          </div >
        </form >
      </div >
      <>
        {contextHolder}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading || isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    </>
  );
};

export default AddProduct;