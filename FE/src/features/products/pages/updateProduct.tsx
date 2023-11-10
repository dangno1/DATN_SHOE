/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress, Button } from "@mui/material";
import { useGetProductQuery, useRemoveThumbnailMutation, useUpdateProductMutation } from "@/api/product";
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

type NotificationType = 'success' | 'info' | 'warning' | 'error';
type ImageType = { files: File[], url: string[] } | null


const UpdateProduct = () => {
  const { id } = useParams()

  const [UpdateProduct, { isLoading }] = useUpdateProductMutation();
  const { data: categoryData } = useGetCategoryesQuery();
  const { data: sizeData } = useGetSizesQuery();
  const { data: colorData } = useGetColorsQuery();
  const { data: productData } = useGetProductQuery(String(id))
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


    if (combineThumb.length > 20) {
      openNotificationWithIcon("error", `Chọn tối đa 20 ảnh`)
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
      const newThumbnail = thumbnail?.files as File[];
      const newImage = image?.files as File[];

      await UpdateProduct({ ...data, thumbnail: newThumbnail, image: newImage, _id: id })
      openNotificationWithIcon("success", "Cập nhật sản phẩm thành công")
      reset()
    } catch (error: any) {
      return error.message
    }
  };

  const handleRemoveThumbnail = async (id: string, publicId: string) => {
    try {
      await removeThumbnail({ id, publicId })
    } catch (error: any) {
      return error.message
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
              <label className="text-slate-600 font-semibold">Tên sản phẩm</label>
              <input {...register("name")} type="text" minLength={3} required placeholder="giày af1..." className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full " />
            </div>
            <div className="h-max mb-[20px]">
              <label className="text-slate-600 font-semibold">Thương hiệu</label>
              <input {...register("brand")} type="text" minLength={3} required placeholder="Thương hiệu*..." className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 font-môn focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full " />
            </div>
            <div className="h-max mb-[20px] col-span-2 space-y-[5px]">
              <label className="text-slate-600 font-semibold">Mô tả</label>
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
          </div>
          {/* right */}
          <div className="">
            <div className="mb-[20px]">
              <label className="text-slate-600 font-semibold">Danh mục sản phẩm*</label>
              <select required {...register("categoryId")}
                className="w-full h-[48px] px-[10px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full ">
                <option value="" >Category</option>
                {
                  categoryData?.map((category: ICategory) => <option key={category._id} value={category._id}>{category.name}</option>)
                }
              </select>
            </div>
            <div className="mb-[20px]">
              <label className="text-slate-600 font-semibold block">Hình ảnh</label>
              <div className="min-h-[110px] max-h-[150px] border border-slate-300 rounded-md mt-[5px] p-4">
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
                <input {...register("image")} type="file" id="inputImage"
                  onChange={handleInputImage}
                  accept="image/jpeg, image/gif, image/png"
                  className="w-0 h-0 opacity-0" />
              </div>
            </div>
            <div className="mb-[20px]">
              <label className="text-slate-600 font-semibold block">Album ảnh</label>
              <div className="min-h-[110px] h-max border border-slate-300 p-4 rounded-md mt-[5px]">
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
                  {thumbnail && thumbnail.url.map((image: string, index: number) => (
                    <div key={image} className="w-full max-w-[300px] h-[50px] grid grid-cols-[85%_auto] border border-slate-300 rounded-md overflow-hidden">
                      <div className="w-max grid grid-cols-[max-content_max-content] gap-x-2 items-center">
                        <Image src={image} alt="image" className="w-[50px] max-w-[50px] !h-[50px] bg-center object-cover rounded-l-md" />
                        <div className="text-black max-w-[80px] truncate cursor-default  pr-2" title={thumbnail?.files[index]?.name}>{thumbnail?.files[index]?.name}</div>
                      </div>
                      <div className="grid place-items-center cursor-pointer">
                        <AiOutlineClose className="fill-orange-700 w-4 h-4" onClick={() => setThumbnail(() => handleRemoveImage(thumbnail, index))} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <input {...register("thumbnail")} type="file" multiple id="inputThumbnail" required={requiredInput} onChange={handleInputThambnail} accept="image/jpeg, image/gif, image/png" className="w-0 h-0 opacity-0" />
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
                      <select required {...register(`variants.${index}.sizeId`)} className="w-full h-[48px] px-[10px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full ">
                        <option value="" >Size</option>
                        {
                          sizeData?.map((size: ISize) => <option key={size._id} value={size._id}>{size.value}</option>)
                        }
                      </select>
                    </div>
                    <div className="w-full h-max">
                      <label className="text-slate-600 font-semibold">Màu sắc</label>
                      <select required {...register(`variants.${index}.colorId`)} className="w-full h-[48px] px-[10px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full ">
                        <option value="" >Color</option>
                        {
                          colorData?.map((color: IColor) => <option key={color._id} value={color._id}>{color.value}</option>)
                        }
                      </select>
                    </div>
                    <div className="w-full h-max">
                      <label className="text-slate-600 font-semibold">Giá gốc</label>
                      <input {...register(`variants.${index}.price`)} type="number" required placeholder="500..." className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full " />
                    </div>
                    <div className="w-full h-max">
                      <label className="text-slate-600 font-semibold">Giá khuyến mãi</label>
                      <input {...register(`variants.${index}.discount`)} type="number" required placeholder="500..." className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full " />
                    </div>
                    <div className="w-full h-max">
                      <label className="text-slate-600 font-semibold">Số lượng</label>
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
          {/* button */}
          <div className="w-max grid grid-cols-[max-content_max-content_max-content] gap-x-2 place-items-center col-span-2">
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
              startIcon={<BsArrowLeftShort className="stroke-[0.5]" />}
            >
              Quay lại
            </Button>
          </div>
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
      {
        /* <Card className="h-full w-full px-[50px] ">
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
                    {image.length > 0
                      ? image.map((image: string) => <Image key={image} src={image} alt="image" className="w-[100px] max-w-[100px] rounded-lg" />)
                      : <Image src={String(productData.image)} alt="image" className="w-[100px] max-w-[100px] rounded-lg" />}
                    <input {...register("image")} type="file" id="inputImage" onChange={handleInputImage} accept="image/jpeg, image/gif, image/png" className="opacity-0 w-full h-[0] max-h-[0]  border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-[#557dff] font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 focus:shadow-full " />
                  </div>
                </div>
                <div className="h-max mb-[20px] col-span-2">
                  <label className="text-slate-600 font-semibold block">Thumbnail*</label>
                  <div className="w-full h-full border border-slate-400 border-dashed rounded-lg p-[20px] grid grid-cols-[20%_auto]">
                    <label htmlFor="inputThumbnail" className="grid items-center">
                      <div className="w-max m-auto h-full max-h-[120px] grid gap-3 place-items-center">
                        <BsImage className="w-[80px] h-[80px] " />
                        <div className="align-bottom grid grid-cols-[max-content_max-content] gap-[10px] place-items-center w-max">
                        <LuUploadCloud className="w-[20px] h-[20px] " />
                        upload image
                        </div>
                      </div>
                    </label>
                    <div className="h-max grid grid-cols-10 place-items-center gap-4 mt-5">
                      {productData && productData.thumbnail.map((thumbnail: any) =>
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
        </Card > */
      }
    </>
  );
};

export default UpdateProduct;