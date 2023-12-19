import joi from "@hapi/joi";

const categorySchema = joi.object({
  name: joi.string().required().min(2).messages({
    "string.empty": "Tên danh mục không được để trống",
    "any.required": "Tên danh mục là trường bắt buộc",
  }),
  // slug: joi.string().required().min(3).messages({
  //   "string.empty": "Tên url không được để trống",
  //   "any.required": "Tên url là trường bắt buộc",
  //   "string.min": "Vui long nhập tối thiểu 3 kí tự",
  // }),
});

export default categorySchema;
