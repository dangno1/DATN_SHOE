import joi from "@hapi/joi";

const brandSchema = joi.object({
  name: joi.string().required().min(2).messages({
    "string.empty": "Tên thương hiệu không được để trống",
    "any.required": "Tên thương hiệu là trường bắt buộc",
  }),
});

export default brandSchema;
