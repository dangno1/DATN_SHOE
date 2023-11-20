import { IProduct } from "@/interface/product";
import joi from "@hapi/joi";

const variantSchema = joi.object({
  sizeId: joi.string().required().messages({
    "string.empty": "Kích cỡ không được để trống",
    "any.required": "Kích cỡ là trường bắt buộc",
  }),
  colorId: joi.string().required().messages({
    "string.empty": "Màu sắc không được để trống",
    "any.required": "Màu sắc là trường bắt buộc",
  }),
  price: joi.number().integer().positive().required().messages({
    "number.base": "Giá gốc phải là một số",
    "number.integer": "Giá gốc phải là một số nguyên",
    "number.positive": "Giá gốc phải là một số lớn hơn 0",
    "any.required": "Giá gốc là trường bắt buộc",
  }),
  discount: joi.number().integer().positive().required().messages({
    "number.base": "Giá khuyến mãi phải là một số",
    "number.integer": "Giá khuyến mãi phải là một số nguyên",
    "number.positive": "Giá khuyến mãi phải là một số lớn hơn 0",
    "any.required": "Giá khuyến mãi là trường bắt buộc",
  }),
  quantity: joi.number().integer().positive().required().messages({
    "number.base": "Số lượng phải là một số",
    "number.integer": "Số lượng phải là một số nguyên",
    "number.positive": "Số lượng phải là một số lớn hơn 0",
    "any.required": "Số lượng là trường bắt buộc",
  }),
  amountSold: joi.number().integer().required().messages({
    "number.base": "Số lượng đã bán phải là một số",
    "number.integer": "Số lượng đã bán phải là một số nguyên",
    "number.positive": "Số lượng đã bán phải là một số lớn hơn 0",
    "any.required": "Số lượng đã bán là trường bắt buộc",
  }),
  status: joi.number().required().messages({
    "number.base": "Trạng thái phải là một số",
    "any.required": "Trạng thái là trường bắt buộc",
  }),
});

const productSchema = joi.object<IProduct>({
  name: joi.string().required().min(3).messages({
    "string.empty": "Tên sản phẩm không được để trống",
    "any.required": "Tên sản phẩm là trường bắt buộc",
    "string.min": "Tên sản phẩm phải có ít nhất 3 ký tự",
  }),

  image: joi.any().custom((value, helpers) => {
    if (value.length === 0) {
      return helpers.error("any.invalid");
    }
    return value;
  }, "File validation"),

  thumbnail: joi.any().custom((value, helpers) => {
    if (value.length === 0) {
      return helpers.error("any.invalid");
    }
  }, "File validation"),

  desc: joi.string().required().messages({
    "string.empty": "Mô tả sản phẩm không được để trống",
    "any.required": "Mô tả sản phẩm là trường bắt buộc",
  }),

  variants: joi.array().items(variantSchema),

  brand: joi.string().required().messages({
    "string.empty": "Thương hiệu không được để trống",
    "any.required": "Thương hiệu là trường bắt buộc",
  }),

  categoryId: joi.string().required().messages({
    "string.empty": "Danh mục sản phẩm không được để trống",
    "any.required": "Danh mục sản phẩm là trường bắt buộc",
  }),
});

export default productSchema;
