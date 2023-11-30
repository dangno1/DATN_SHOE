import joi from "@hapi/joi";

const categorySchema = joi.object({
  name: joi.string().required().min(2).messages({
    "string.empty": "Tên danh mục không được để trống",
    "any.required": "Tên danh mục là trường bắt buộc",
  }),
});

export default categorySchema;
