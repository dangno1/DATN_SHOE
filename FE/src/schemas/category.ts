import joi from "@hapi/joi";

const categorySchema = joi.object({
  name: joi.string().required().min(3).messages({
    "string.empty": "Category không được để trống",
    "any.required": "Category là trường bắt buộc",
    "string.min": "Category phải có ít nhất 3 ký tự",
  }),
});

export default categorySchema;
