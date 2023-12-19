import joi from "@hapi/joi";

const sizeSchema = joi.object({
  value: joi.number().required().min(1).messages({
    "number.base": "Kích cỡ không được để trống",
    "any.required": "Kích cỡ là trường bắt buộc",
    "number.min": "Kích cỡ phải là một số lớn hơn 0",
  }),
});

export default sizeSchema;
