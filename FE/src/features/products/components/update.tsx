import { RiDeleteBin6Line } from "react-icons/ri";
import { useForm, useFieldArray } from "react-hook-form";
import { IProduct } from "@/interface/product";
import { joiResolver } from "@hookform/resolvers/joi";
import productSchema from "@/schemas/product";
import { useGetCategoryesQuery } from "@/api/category";
import { ICategory } from "@/interface/category";
import { useAddProductMutation } from "@/api/product";

const AddProduct = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>({
    resolver: joiResolver(productSchema),
    defaultValues: {
      variants: [
        {
          size: null,
          color: "",
          price: null,
          quantity: null,
          status: 1,
        } as any,
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });
  const { data: listCategory } = useGetCategoryesQuery();
  const [addProduct, { isLoading }] = useAddProductMutation();
  console.log(isLoading);

  const onSubmit = (data: IProduct) => {
    addProduct(data)
      .unwrap()
      .then(() => alert("Thêm thành công"));
  };

  return (
    <div className="w-full h-max max-w-5xl mx-auto">
      <h2 className="text-blue-500 font-bold text-[30px] text-center mt-[10px]">
        Thêm mới sản phẩm
      </h2>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 capitalize"
            htmlFor="name">
            Product name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            {...register("name")}
            placeholder="Tên sản phẩm"
          />
          {errors.name && (
            <p className="text-red-500 text-[13px]">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 capitalize"
            htmlFor="desc">
            Desc
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            {...register("desc")}
            placeholder="Mô tả"
          />
          {errors.desc && (
            <p className="text-red-500 text-[13px]">{errors.desc.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 capitalize"
            htmlFor="image">
            Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            {...register("image")}
            placeholder="Hình ảnh chính"
          />
          {errors.image && (
            <p className="text-red-500 text-[13px]">{errors.image.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 capitalize"
            htmlFor="images">
            Thumbnails
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            multiple
            {...register("images")}
            placeholder="Hình ảnh phụ"
          />
          {errors.images && (
            <p className="text-red-500 text-[13px]">{errors.images.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 capitalize"
            htmlFor="brand">
            Thương hiệu
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            {...register("brand")}
            placeholder="Thương hiệu"
          />
          {errors.brand && (
            <p className="text-red-500 text-[13px]">{errors.brand.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 capitalize"
            htmlFor="categoryId">
            Danh mục sản phẩm
          </label>
          <select
            className="w-full shadow appearance-none border rounded py-2 px-3"
            {...register("categoryId")}>
            <option value="">Danh mục sản phẩm</option>
            {listCategory?.map((category: ICategory) => (
              <option key={category._id} value={category?._id}>
                {category?.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-500 text-[13px]">
              {errors.categoryId.message}
            </p>
          )}
        </div>
        <span className="block text-gray-700 text-sm font-bold mb-2">
          Biến thể
        </span>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border rounded border-solid shadow grid grid-cols-5 gap-x-[10px] p-2 mb-[10px]">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 capitalize"
                htmlFor="size">
                size
              </label>
              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register(`variants.${index}.size`)}
                placeholder="Kích thước"
              />
              {errors.variants?.[index]?.size && (
                <p className="text-red-500 text-[13px]">
                  {errors.variants[index]?.size?.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 capitalize"
                htmlFor="color">
                color
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register(`variants.${index}.color`)}
                placeholder="Màu sắc"
              />
              {errors.variants?.[index]?.color && (
                <p className="text-red-500 text-[13px]">
                  {errors.variants[index]?.color?.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 capitalize"
                htmlFor="price">
                price
              </label>
              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register(`variants.${index}.price`)}
                placeholder="Giá"
              />
              {errors.variants?.[index]?.price && (
                <p className="text-red-500 text-[13px]">
                  {errors.variants[index]?.price?.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 capitalize"
                htmlFor="quantity">
                quantity
              </label>
              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register(`variants.${index}.quantity`)}
                placeholder="Số lượng"
              />
              {errors.variants?.[index]?.quantity && (
                <p className="text-red-500 text-[13px]">
                  {errors.variants[index]?.quantity?.message}
                </p>
              )}
            </div>
            <div className="mb-4 hidden">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 capitalize"
                htmlFor="status">
                status
              </label>
              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register(`variants.${index}.status`)}
                placeholder="Trạng thái"
                value={1}
              />
            </div>
            <div className="mb-4">
              <div className="block text-gray-700 text-sm font-bold mb-2 text-center invisible">
                Action
              </div>
              {fields.length > 1 && (
                <div className="grid place-items-center">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="bg-red-500 py-2 px-3 text-white rounded flex items-center space-x-1">
                    <RiDeleteBin6Line />
                    <span>Xóa</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        <button
          className="bg-blue-500 text-white rounded p-2 mr-2 capitalize"
          type="button"
          onClick={() =>
            append({
              size: null,
              color: "",
              price: null,
              quantity: null,
              status: 1,
            } as any)
          }>
          Thêm biến thể
        </button>

        <button
          className="bg-blue-500 text-white rounded p-2 capitalize"
          type="submit"
          disabled={isLoading}>
          Update Sản phẩm
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
