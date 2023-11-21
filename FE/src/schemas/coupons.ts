import joi from "@hapi/joi";

const couponsSchema = joi.object({
  code: joi.string().required().messages({
    "string.empty": "Mã giảm giá không được để trống",
    "string.base": "Mã giảm giá phải là một chuỗi",
    "any.required": "Mã giảm giá là trường bắt buộc",
  }),
  quantity: joi.number().integer().positive().required().messages({
    "number.base": "Số lượng không được để trống",
    "number.integer": "Số lượng phải là một số nguyên",
    "number.positive": "Số lượng phải là một số dương",
    "any.required": "Số lượng là trường bắt buộc",
  }),
  discountValue: joi.number().required().max(90).messages({
    "number.base": "Giá trị giảm giá không được để trống",
    "number.max": "Giá trị giảm giá không được lớn hơn 90%",
    "any.required": "Giá trị giảm giá là trường bắt buộc",
  }),
});

export default couponsSchema;
