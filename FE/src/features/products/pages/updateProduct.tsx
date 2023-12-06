/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress, Button } from "@mui/material";
import { useGetProductQuery, useGetProductsQuery, useRemoveThumbnailMutation, useUpdateProductMutation } from "@/api/product";
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
import { BsArrowLeftShort, BsImage, BsPencilSquare } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineTrash, HiPlus } from "react-icons/hi2";
import productSchema from "@/schemas/product";
import { IBrand } from "@/interface/brand";
import { useGetBrandsQuery } from "@/api/brand";

type NotificationType = 'success' | 'info' | 'warning' | 'error';
type ImageType = { files: File[], url: string[] } | null


const UpdateProduct = () => {
  const { id } = useParams()

  const [UpdateProduct, { isLoading }] = useUpdateProductMutation();
  const { data: categoryData } = useGetCategoryesQuery();
  const { data: brandDatas } = useGetBrandsQuery();
  const { data: sizeData } = useGetSizesQuery();
  const { data: colorData } = useGetColorsQuery();
  const { data: productData } = useGetProductQuery(String(id))
  const { data: productDatas } = useGetProductsQuery(false)
  const [removeThumbnail, { isLoading: isLoadingThumbnail }] = useRemoveThumbnailMutation()

  const [thumbnail, setThumbnail] = useState<ImageType>(null)
  const [image, setImage] = useState<ImageType>()
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, message: string) => {
    api[type]({
      message: 'Thông báo',
      description: message
    });
  };

  const handleInputThambnail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const thumbnails = event.target.files ? Array.from(event.target.files) : []
    const combineThumb = thumbnail ? [...thumbnail.files, ...thumbnails] : thumbnails
    const urls = combineThumb.map((file: File) => URL.createObjectURL(file))
    if (combineThumb.length > 20 - Number(productData?.thumbnail.length)) {
      openNotificationWithIcon("error", `Chọn tối đa ${20 - Number(productData?.thumbnail.length)} ảnh`)
      const newThumb = combineThumb.splice(0, 20 - Number(productData?.thumbnail.length))
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

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors }
  } = useForm<IProduct>({
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  useEffect(() => {
    productData && reset(productData)
  }, [productData, reset])

  const onSubmit = async (data: IProduct) => {
    console.log(data);

    try {
      const newThumbnail = thumbnail?.files as File[];
      const newImage = image?.files as File[];
      const newDesc = data.desc || "Đang cập nhật"
      const result = await UpdateProduct({
        ...data,
        _id: id,
        thumbnail: newThumbnail,
        image: newImage,
        desc: newDesc
      })
      "data" in result && "success" in result.data && result.data.success
        ? openNotificationWithIcon("success", "Cập nhật sản phẩm thành công")
        : openNotificationWithIcon("error", "Cập nhật sản phẩm thất bại, vui lòng thử lại sau")
      setThumbnail(null)
    } catch (error: unknown) {
      return error && error instanceof Error && error.message
    }
  };

  const handleRemoveThumbnail = async (id: string, publicId: string) => {
    try {
      await removeThumbnail({ id, publicId })
    } catch (error: unknown) {
      return error && error instanceof Error && error.message
    }
  }

  return (
    <>
      <div className="p-5">
        <h4 className="mb-8 font-bold text-3xl uppercase text-slate-700">Cập nhật sản phẩm</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-[20px] bg-white p-5 rounded-lg">
          {/* left */}
          <div className="col-span-2">
            <div className="h-max mb-[20px]">
              <label className="text-slate-600 font-semibold">Tên sản phẩm<span className="text-red-500">*</span></label>
              <input
                {...register("name", productSchema.name(productDatas, id))} type="text" placeholder="giày af1..."
                className={`w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500
                  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f]
                 placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full ${errors.name && 'border-red-500'}`} />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>
            <div className="h-max mb-[20px]">
              <label className="text-slate-600 font-semibold">Thương hiệu<span className="text-red-500">*</span></label>
              <select {...register("brandId", productSchema.brandId)}
                className={`w-full h-[48px] px-[10px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full ${errors.brandId && 'border-red-500'}`}>
                <option value="">Thương hiệu</option>
                {
                  brandDatas?.map((brand: IBrand) => <option key={brand._id} value={brand._id}>{brand.name}</option>)
                }
              </select>
              {errors.brandId && <span className="text-red-500">{errors.brandId.message}</span>}
            </div>
            <div className="h-max mb-[20px] col-span-2 space-y-[5px]">
              <label className="text-slate-600 font-semibold">Mô tả sản phẩm</label>
              <div className={`border ${errors.desc && 'border-red-500'}`}>
                <Controller
                  name="desc"
                  control={control}
                  rules={productSchema.desc}
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
              <label className="text-slate-600 font-semibold">Danh mục sản phẩm<span className="text-red-500">*</span></label>
              <select {...register("categoryId", productSchema.categoryId)}
                className={`w-full h-[48px] px-[10px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full ${errors.categoryId && 'border-red-500'}`}>
                <option value="" >Category</option>
                {
                  categoryData?.map((category: ICategory) => <option key={category._id} value={category._id}>{category.name}</option>)
                }
              </select>
              {errors.categoryId && <span className="text-red-500">{errors.categoryId.message}</span>}
            </div>
            <div className="mb-[20px]">
              <label className="text-slate-600 font-semibold block">Hình ảnh<span className="text-red-500">*</span></label>
              <div className={`min-h-[110px] max-h-[150px] border border-slate-300 rounded-md mt-[5px] p-4 ${errors.image && !image?.files.length && '!border-red-500'}`}>
                <label htmlFor="inputImage" className="h-[48px] grid items-center">
                  <div className="w-max h-full grid grid-cols-[max-content_max-content] gap-2 items-center">
                    <BsImage className="w-5 h-5" />
                    <div className="align-bottom grid grid-cols-[max-content_max-content] place-items-center w-max">
                      Chọn 1 ảnh
                    </div>
                  </div>
                </label>
                <div className="w-full h-max grid grid-cols-[90%_auto] rounded-md overflow-hidden border border-slate-300 mt-[10px] space-x-4">
                  <div className="w-full h-max min-h-[48px] grid grid-cols-[max-content_auto] items-center space-x-4">
                    <Image
                      key={image && image.url.length > 0 ? image?.url[0] : String(productData?.image)}
                      src={image && image.url.length > 0 ? image?.url[0] : String(productData?.image)} alt="image"
                      className="w-[50px] max-w-[50px] !h-full bg-center object-cover rounded-l-md" />
                    <div className="text-black max-w-[300px] truncate">
                      {image && image.url.length > 0 ? image?.files[0].name : String(productData?.image)}
                    </div>
                  </div>
                  <div className="grid items-center justify-items-center cursor-pointer">
                    {
                      image && image?.url.length > 0 && <AiOutlineClose
                        className="w-4 h-4 hover:fill-red-500"
                        onClick={() => {
                          image && setImage(() => handleRemoveImage(image as ImageType, 0))
                        }}
                      />
                    }
                  </div>
                </div>
                <input {...register("image", productSchema.image((!image && !productData?.image) ? true : false))} type="file" id="inputImage"
                  onChange={handleInputImage}
                  accept="image/jpeg, image/gif, image/png"
                  className="w-0 h-0 opacity-0" />
              </div>
              {errors.image && !image?.files.length && <span className="text-red-500">{errors.image.message}</span>}
            </div>
            <div className="mb-[20px]">
              <label className="text-slate-600 font-semibold block">Album ảnh<span className="text-red-500">*</span></label>
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
                  {
                    productData && productData.thumbnail.map((item: any) =>
                      <div key={item} className="w-full max-w-[300px] h-[50px] grid grid-cols-[85%_auto] border border-slate-300 rounded-md overflow-hidden">
                        <div className="w-max grid grid-cols-[max-content_max-content] gap-x-2 items-center">
                          <Image src={item} alt="image" className="w-[50px] max-w-[50px] !h-[50px] bg-center object-cover rounded-l-md" />
                          <div className="text-black max-w-[80px] truncate cursor-default pr-2" title={item}>{item}</div>
                        </div>
                        <div className="grid place-items-center cursor-pointer">
                          <AiOutlineClose className="fill-orange-700 w-4 h-4" onClick={() => {
                            const splitThumbnail = item.split("/");
                            const publicId = splitThumbnail[splitThumbnail.length - 1].split(".")[0];
                            handleRemoveThumbnail(String(id), publicId)
                          }} />
                        </div>
                      </div>)
                  }
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
              <input {...register("thumbnail", productSchema.thumbnail((!thumbnail && !productData?.thumbnail.length) ? true : false))} type="file" multiple id="inputThumbnail" onChange={handleInputThambnail} accept="image/jpeg, image/gif, image/png" className="hidden" />
              {errors.thumbnail && !thumbnail?.files.length && <span className="text-red-500">{errors.thumbnail.message}</span>}
            </div>
          </div >
          {/* biến thể */}
          <div className="h-max col-span-3 relative" >
            <label className="text-slate-600 font-semibold">Sản phẩm biến thể</label>
            <div className="before:w-full before:h-[1px] before:bg-slate-300 before:absolute mt-2">
              {fields.map((field, index) => (
                <div key={field.id} className="rounded-[5px] grid grid-cols-[95%_auto] gap-2 place-items-center p-2 pt-5 mb-[10px]">
                  <div className="w-full grid grid-cols-5 gap-4">
                    <div className="w-full h-max">
                      <label className="text-slate-600 font-semibold">Kích cỡ<span className="text-red-500">*</span></label>
                      <select {...register(`variants.${index}.sizeId`, productSchema.sizeId)}
                        className={`w-full h-[48px] px-[10px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 
                        focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 
                        focus:shadow-full ${errors?.variants?.[index]?.sizeId && "border-red-500"}`}
                      >
                        <option value="" >Size</option>
                        {
                          sizeData?.map((size: ISize) => <option key={size._id} value={size._id}>{size.value}</option>)
                        }
                      </select>
                      {errors?.variants?.[index]?.sizeId && <span className="text-red-500 text-[13px]">{errors?.variants?.[index]?.sizeId?.message}</span>}
                    </div>
                    <div className="w-full h-max">
                      <label className="text-slate-600 font-semibold">Màu sắc<span className="text-red-500">*</span></label>
                      <select {...register(`variants.${index}.colorId`, productSchema.colorId)}
                        className={`w-full h-[48px] px-[10px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 
                        focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 
                        focus:shadow-full ${errors?.variants?.[index]?.colorId && "border-red-500"}`}>
                        <option value="" >Color</option>
                        {
                          colorData?.map((color: IColor) => <option key={color._id} value={color._id}>{color.value}</option>)
                        }
                      </select>
                      {errors?.variants?.[index]?.colorId && <span className="text-red-500 text-[13px]">{errors?.variants?.[index]?.colorId?.message}</span>}
                    </div>
                    <div className="w-full h-max">
                      <label className="text-slate-600 font-semibold">Giá gốc<span className="text-red-500">*</span></label>
                      <input {...register(`variants.${index}.price`, productSchema.price)} type="number" placeholder="500..."
                        className={`w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 
                        focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 
                        px-[10px] focus:shadow-full ${errors?.variants?.[index]?.price?.message && "border-red-500"}`} />
                      {errors?.variants?.[index]?.price && <span className="text-red-500 text-[13px]">{errors?.variants?.[index]?.price?.message}</span>}
                    </div>
                    <div className="w-full h-max">
                      <label className="text-slate-600 font-semibold">Giá khuyến mãi</label>
                      <input {...register(`variants.${index}.discount`, productSchema.discount(getValues, index))} type="number" placeholder="500..."
                        className={`w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0
                       focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] 
                       focus:shadow-full ${errors?.variants?.[index]?.discount && "border-red-500"}`} />
                      {errors?.variants?.[index]?.discount && <span className="text-red-500 text-[13px]">{errors?.variants?.[index]?.discount?.message}</span>}
                    </div>
                    <div className="w-full h-max">
                      <label className="text-slate-600 font-semibold">Số lượng<span className="text-red-500">*</span></label>
                      <input {...register(`variants.${index}.quantity`, productSchema.quantity)} type="number" placeholder="500..."
                        className={`w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 
                        focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 
                        px-[10px] focus:shadow-full ${errors?.variants?.[index]?.quantity && "border-red-500"}`} />
                      {errors?.variants?.[index]?.quantity && <span className="text-red-500 text-[13px]">{errors?.variants?.[index]?.quantity?.message}</span>}
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
                  <div className="w-max min-h-full max-h-full grid place-items-center">
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
              startIcon={<BsPencilSquare className="w-4 h-4" />}
            >
              Cập nhật
            </Button>
            <Button
              onClick={() => navigate("/admin/product")}
              variant="contained"
              className="float-right !font-semibold !bg-[#df5e5e] !shadow-none"
              startIcon={<BsArrowLeftShort className="w-6 h-6 stroke-[0.5]" />}
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
          open={isLoading || isLoadingThumbnail}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    </>
  );
};

export default UpdateProduct;