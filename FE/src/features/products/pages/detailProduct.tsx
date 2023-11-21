import { useGetCategoryQuery } from "@/api/category";
import { useGetColorsQuery } from "@/api/color";
import { useGetProductQuery, useRemoveProductMutation } from "@/api/product";
import { useGetSizesQuery } from "@/api/size";
import { Button, Image, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
// type ImageType = { files: File[]; url: string[] } | null;

const DetailProduct = () => {
  const { id } = useParams(); // Giả sử bạn sử dụng React Router
  const { data: productData, isLoading } = useGetProductQuery(String(id));
  const { data: sizeData } = useGetSizesQuery();
  const { data: colorData } = useGetColorsQuery();
  // const { data: categoryData } = useGetCategoryesQuery();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [id]);
  if (isLoading) {
    return <div>Đang tải...</div>;
  }
  if (!productData) {
    return <div>Sản phẩm không tồn tại.</div>;
  }
  console.log(productData);

  const updatedAt = new Date(productData.updatedAt);
  const day = updatedAt.getDate();
  const month = updatedAt.getMonth() + 1; // Tháng bắt đầu từ 0, cộng thêm 1
  const year = updatedAt.getFullYear();
  const hours = updatedAt.getHours();
  const minutes = updatedAt.getMinutes();
  const seconds = updatedAt.getSeconds();
  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const dayOfWeek = daysOfWeek[updatedAt.getDay()];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: categoryInfo } = useGetCategoryQuery(productData.categoryId);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : productData.thumbnail.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < productData.thumbnail.length - 1 ? prevIndex + 1 : 0
    );
  };
  const imagesToShow = productData.thumbnail.slice(
    currentImageIndex,
    currentImageIndex + 5
  );
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

  return (
    <>
      <div className="p-5">
        <h4 className="mb-8 font-bold text-3xl uppercase text-slate-700 ">
          Thông tin chi tiết sản phẩm
        </h4>
        <div className="overflow-x-auto bg-white rounded-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="w-auto border-b border-r border-gray-300">
                  <div className="p-2">Hình ảnh</div>
                </th>
                <th className="w-auto border-b border-r border-gray-300">
                  <div className="p-2">Tên sản phẩm</div>
                </th>
                <th className="w-auto border-b border-r border-gray-300">
                  <div className="p-2">Loại sản phẩm</div>
                </th>
                <th className="w-auto border-b border-r border-gray-300">
                  <div className="p-2">Thương hiệu</div>
                </th>
                <th className="w-auto border-b border-r border-gray-300">
                  <div className="p-2">Mô tả</div>
                </th>
                <th className="w-auto border-b border-r border-gray-300">
                  <div className="p-2">Ngày cập nhật</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="w-auto border-b border-r border-gray-300">
                  <div className="p-2 overflow-hidden">
                    <Image
                      className="rounded-[10px] bg-slate-300 w-full max-w-[68px] !h-[68px] max-h-[68px] object-cover"
                      src={String(productData.image)}
                      alt="image"
                    />
                  </div>
                </td>
                <td className="w-auto border-b border-r border-gray-300">
                  <div className="p-2">{productData.name}</div>
                </td>
                <td className="w-auto border-b border-r border-gray-300">
                  <div className="p-2">
                    <div className="p-2">{categoryInfo?.name}</div>
                  </div>
                </td>
                <td className="w-auto border-b border-r border-gray-300">
                  <div className="p-2">{productData.brand}</div>
                </td>
                <td className="w-auto border-b border-r border-gray-300">
                  <div className="p-2 min-w-[100px] w-max max-w-[500px]">{productData.desc}</div>
                </td>
                <td className="w-auto border-b border-r border-gray-300">
                  <div className="p-2">
                    {dayOfWeek}, {day}/{month}/{year} {hours}:{minutes}:
                    {seconds}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="relative overflow-hidden">
          <h2 className="text-center text-2xl lg:text-3xl xl:text-2xl font-bold mb-4 mt-4">
            Ảnh sản phẩm
          </h2>

          <div className="flex space-x-3 w-full relative overflow-x-auto">
            {imagesToShow.length > 0 && (
              <button
                onClick={handlePrevImage}
                className="absolute top-1/2 transform -translate-y-1/2 right-0 flex items-center justify-center w-10 bg-gray-200"
              >
                <BsChevronLeft />
              </button>
            )}

            {imagesToShow.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full max-w-[215px] h-[215px] flex items-center justify-center relative"
              >
                <Image
                  className="rounded-[10px] bg-slate-300 w-full h-full object-cover"
                  src={String(item)}
                  alt={`image-${index}`}
                />
              </div>
            ))}

            {imagesToShow.length > 0 && (
              <button
                onClick={handleNextImage}
                className="absolute top-1/2 transform -translate-y-1/2 right-0 flex items-center justify-center w-10 bg-gray-200"
              >
                <BsChevronRight />
              </button>
            )}
          </div>
        </div>

        <div className="relative overflow-hidden w-full">
          <h2 className="text-center text-2xl lg:text-3xl xl:text-2xl font-bold mb-4 mt-4">
            Biến thể
          </h2>
          <div className="bg-white rounded-lg w-full">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-auto border-b border-r border-gray-300">
                    <div className="p-2">STT</div>
                  </th>
                  <th className="w-auto border-b border-r border-gray-300">
                    <div className="p-2">Màu</div>
                  </th>
                  <th className="w-auto border-b border-r border-gray-300">
                    <div className="p-2">Kích cỡ</div>
                  </th>
                  <th className="w-auto border-b border-r border-gray-300">
                    <div className="p-2">Giá gốc</div>
                  </th>
                  <th className="w-auto border-b border-r border-gray-300">
                    <div className="p-2">Giá bán</div>
                  </th>
                  <th className="w-auto border-b border-r border-gray-300">
                    <div className="p-2">Số lượng</div>
                  </th>
                  <th className="w-auto border-b border-r border-gray-300">
                    <div className="p-2">Số lượng đã bán</div>
                  </th>
                  <th className="w-auto border-b border-r border-gray-300">
                    <div className="p-2">Trạng thái</div>
                  </th>
                </tr>
              </thead>
              {productData.variants.map((variant, index) => (
                <tbody>
                  <tr className="text-center">
                    <td className="w-auto border-b border-r border-gray-300">
                      <div className="p-2">{index + 1}</div>
                    </td>
                    <td className="w-auto border-b border-r border-gray-300">
                      <div className="p-2">
                        {
                          colorData?.find((c) => c._id === variant.colorId)
                            ?.value
                        }
                      </div>
                    </td>
                    <td className="w-auto border-b border-r border-gray-300">
                      <div className="p-2">
                        {sizeData?.find((s) => s._id === variant.sizeId)?.value}
                      </div>
                    </td>
                    <td className="w-auto border-b border-r border-gray-300">
                      <div className="p-2">{variant.discount}</div>
                    </td>
                    <td className="w-auto border-b border-r border-gray-300">
                      <div className="p-2">
                        <div className="p-2">{variant.price}</div>
                      </div>
                    </td>
                    <td className="w-auto border-b border-r border-gray-300">
                      <div className="p-2">
                        <div className="p-2">{variant.quantity}</div>
                      </div>
                    </td>
                    <td className="w-auto border-b border-r border-gray-300">
                      <div className="p-2">
                        <div className="p-2">{variant.amountSold}</div>
                      </div>
                    </td>
                    <td className="w-auto border-b border-r border-gray-300">
                      <div className="p-2">
                        {variant.status === 0 ? (
                          <div className="text-red-500">Hết hàng</div>
                        ) : (
                          <div className="text-green-500">Còn hàng</div>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
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

          <Button className="bg-black text-white" style={{ marginLeft: "8px" }}>
            <Link to={`/admin/product/update/${id}`}>Cập nhật</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
