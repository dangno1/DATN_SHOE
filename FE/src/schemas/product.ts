import { IProduct } from "@/interface/product";
import { UseFormGetValues } from "react-hook-form";

const productSchema = {
  name: (product?: IProduct[], id?: string) => {
    return {
      required: "Tên sản phẩm không được để trống",
      minLength: { value: 3, message: "Vui lòng nhập tối thiểu 3 kí tự" },
      validate: (value: string) => {
        const productExist = product?.find(
          (item: IProduct) =>
            item.name.toLowerCase() == value.toLowerCase().trim()
        );

        return (
          !productExist ||
          (id && productExist && productExist._id == id) ||
          "Tên sản phẩm đã tồn tại"
        );
      },
    };
  },

  image: (value: boolean) => ({
    required: {
      value: value,
      message: "Vui lòng chọn 1 ảnh",
    },
  }),

  thumbnail: (value: boolean) => ({
    required: {
      value: value,
      message: "Vui lòng chọn tối thiểu 1 ảnh",
    },
  }),

  desc: {
    validate: (value?: string) =>
      value
        ? value.replace(/<[^>]*>?/gm, "").length >= 10 ||
          "Vui lòng nhập tối thiểu 10 kí tự"
        : true,
  },

  brandId: {
    required: "Thương hiệu không được để trống",
  },

  categoryId: {
    required: "Danh mục sản phẩm không được để trống",
  },

  sizeId: {
    required: "Kích thước không được để trống",
  },

  colorId: { required: "Màu sắc không được để trống" },

  price: {
    required: "Giá gốc không được để trống",
    min: { value: 1, message: "Giá gốc phải là số dương" },
  },

  discount: (getValues: UseFormGetValues<IProduct>, index: number) => ({
    min: { value: 1, message: "Giá khuến mãi phải lớn hơn 0" },
    validate: (value: number) =>
      value <= Number(getValues(`variants.${index}.price`)) ||
      "Giá khuến mãi không được lớn hơn giá gốc",
  }),

  quantity: {
    required: "Số lượng không được để trống",
    min: { value: 1, message: "Số lượng phải là số dương" },
  },

  amountSold: {
    required: "Số lượng đã bán không được để trống",
    min: { value: 0, message: "Số lượng đã bán phải là số dương" },
  },

  status: {
    required: "Trạng thái không được để trống",
    min: { value: 0, message: "Trạng thái phải là số dương" },
  },
};

export default productSchema;
