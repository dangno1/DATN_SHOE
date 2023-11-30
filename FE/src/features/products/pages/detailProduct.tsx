import { useGetCategoryQuery } from "@/api/category";
import { useGetColorsQuery } from "@/api/color";
import { useGetProductQuery, useRemoveProductMutation } from "@/api/product";
import { useGetSizesQuery } from "@/api/size";
import { Button, Image, Popconfirm, message } from "antd";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const DetailProduct = () => {
  const { id } = useParams(); // Giả sử bạn sử dụng React Router
  const { data: productData, isLoading } = useGetProductQuery(String(id));
  const { data: sizeData } = useGetSizesQuery();
  const { data: colorData } = useGetColorsQuery();
  const navigate = useNavigate();
  useEffect(() => {}, [id]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: categoryInfo } = useGetCategoryQuery(productData?.categoryId);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [deleteProduct] = useRemoveProductMutation();

  const handleDeleteProduct = async () => {
    try {
      // Gọi hàm xóa sản phẩm từ API
      await deleteProduct(String(id));
      message.success("Xóa sản phẩm thành công");
      navigate("/admin/product");
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm", error);
      message.error("Đã xảy ra lỗi khi xóa sản phẩm");
    }
  };
  if (isLoading) {
    return <div>Đang tải...</div>;
  }
  if (!productData) {
    return <div>Sản phẩm không tồn tại.</div>;
  }
  console.log(productData);
  return (

    <>
      <div className="p-5 rounded-lg">
        <h4 className="mb-8 font-bold text-3xl uppercase text-slate-700">
          Thông tin chi tiết sản phẩm
        </h4>
        <div className="bg-white rounded-lg">
          <div className="grid grid-cols-3 gap-[20px]  ml-5 rounded-lg ">
            {/* Bên trái màn hình */}
            <div className="col-span-2  ">
              <div className="h-max mb-[20px] mt-5">
                <label className="text-slate-600 font-semibold">
                  Tên sản phẩm
                </label>
                <div className="flex items-center w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f]">
                 <div className="ml-3">
                 {productData.name}
                 </div>
                </div>
              </div>
              <div className=" h-max mb-[20px]">
                <label className="text-slate-600 font-semibold">
                  Thương hiệu
                </label>
                <div className="flex items-center w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f]">
                <div className="ml-3">
                  {productData.brand}
                  </div>
                </div>
              </div>
              <div className="h-max mb-[20px] space-y-2 ">
                <label className="text-slate-600 font-semibold">Mô tả</label>
                <div className="w-full h-[100px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] overflow-x-hidden">
                <div className="ml-3">
                  {productData.desc}
                  </div>
                </div>
              </div>
            </div>

            {/* Bên phải màn hình*/}
            <div className="col-span-1 mr-5">
              <div className="mb-4 mt-5">
                <label className="text-slate-600 font-semibold">
                  Ngày cập nhật
                </label>
                <div className="flex items-center  w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] ">
                  {/* {dayOfWeek}, {day}/{month}/{year} {hours}:{minutes}:{seconds} */}
                  <div className="ml-3">
                  {categoryInfo?.name}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="text-slate-600 font-semibold">Hình ảnh</label>
                <div className="w-full h-[100px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] flex items-center justify-center">
                  <Image
                    className="rounded-[10px] bg-slate-300  w-full max-w-[130px] !h-[130px] max-h-[90px] object-cover"
                    src={String(productData.image)}
                    alt="image"
                  />
                </div>
              </div>
              <label className="text-slate-600 font-semibold">Album ảnh</label>
              <div
                className={`min-h-[300px] h-max border  border-slate-300 p-4 rounded-md mt-[5px]`}
              >
                <div className="w-full max-h-[250px] grid grid-cols-2 gap-3 overflow-auto mt-[10px]">
                  {productData.thumbnail.map((image, index) => (
                    <div
                      key={index}
                      className="w-full max-w-[200px] h-[120px] grid grid-cols-[85%_auto] border  justify-center border-slate-300 rounded-md overflow-hidden"
                    >
                      <Image
                        className="w-full h-full object-cover rounded-l-md"
                        src={String(image)}
                        alt={`image-${index}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Biến thể  */}
          <div className="h-max col-span-3 relative mt-10">
            <label className="text-slate-600 font-semibold ml-5">
              Sản phẩm biến thể
            </label>
            <div className="before:w-full before:h-[1px] before:bg-slate-300 before:absolute mt-2">
              {productData.variants.map((variant) => (
                <div className="rounded-[5px] grid grid-cols-[95%_auto] gap-2 place-items-center p-2 pt-5 mb-[10px] ml-4">
                  <div className="w-full grid grid-cols-5 gap-4">
                    <div className="w-full h-max">
                      <label className="text-slate-600 font-semibold">
                        Kích cỡ
                      </label>
                      <div
                        className={`flex items-center w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full`}
                      >
                        {sizeData?.find((s) => s._id === variant.sizeId)?.value}
                      </div>
                    </div>
                    <div className="w-full h-max">
                      <label className="text-slate-600 font-semibold">
                        Màu sắc
                      </label>
                      <div
                        className={`flex items-center w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full`}
                      >
                        {
                          colorData?.find((c) => c._id === variant.colorId)
                            ?.value
                        }
                      </div>
                    </div>
                    <div className="w-full h-max">
                      <label className="text-slate-600 font-semibold">
                        Giá gốc
                      </label>
                      <div
                        className={`flex items-center w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full`}
                      >
                        {variant.price}
                      </div>
                    </div>
                    <div className="w-full h-max">
                      <label className="text-slate-600 font-semibold">
                        Giá khuyến mãi
                      </label>
                      <div
                        className={`flex items-center w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full`}
                      >
                        {variant.discount}
                      </div>
                    </div>
                    <div className="w-full h-max">
                      <label className="text-slate-600 font-semibold">
                        Số lượng
                      </label>
                      <div
                        className={`flex items-center w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full`}
                      >
                        {variant.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <Popconfirm
              title="Bạn có chắc muốn xóa sản phẩm này?"
              onConfirm={handleDeleteProduct}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Xóa</Button>
            </Popconfirm>

            <Button
              className="bg-black text-white mb-3 mr-4"
              style={{ marginLeft: "8px" }}
            >
              <Link to={`/admin/product/update/${id}`}>Cập nhật</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
