import Joi from "@hapi/joi"; 

const userSchema = Joi.object({
    username:Joi.string().required().min(5).regex(/^[a-zA-Z0-9]+$/).messages({
            "string.empty": "Tên tài khoản không được để trống",
            "any.required": "Tên tài khoản là trường bắt buộc",
            "string.min": "Tên tài khoản phải có ít nhất 5 ký tự",
            'string.pattern.base': 'Tên tài khoản chỉ được chứa các ký tự chữ cái và số',
    }),
    fullname: Joi.string().required().min(5).messages({
        "string.empty": "Họ và tên không được để trống",
        "any.required": "Họ và tên là trường bắt buộc",
        "string.min": "Họ và tên phải có ít nhất 5 ký tự",
    }),
    phone: Joi.string().required().pattern(/^[0]{1}[0-9]{9}$/).messages({
        'string.empty': 'Số điện thoại không được để trống',
        'string.pattern.base': 'Số điện thoại phải có đúng 10 chữ số',
        'any.required': 'Số điện thoại là trường bắt buộc',
    }),
    email: Joi.string().email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email không được để trống',
      'any.required': 'Email là trường bắt buộc',
      'string.email': 'Email không hợp lệ, email phải có @ và . ',
    }),
    address: Joi.string().required().min(5).messages({
        "string.empty": "Địa chỉ không được để trống",
        "any.required": "Địa chỉ là trường bắt buộc",
        "string.min": "Địa chỉ phải có ít nhất 5 ký tự",

    }),
    password:Joi.string().required().min(5).messages({
        "string.empty": "Mật khẩu không được để trống",
        "string.min": "Mật khẩu phải có ít nhất 5 ký tự",
        "any.required": "Mật khẩu là trường bắt buộc",
    }), 
    confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "Nhập lại khẩu không được để trống",
    "any.only": "Mật khẩu bạn vừa nhập không trùng khớp hãy nhập lại",
    "any.required": "Nhập lại mật khẩu là trường bắt buộc",
  }),
});

const updateUserSchema = Joi.object({
    username:Joi.string().min(5).regex(/^[a-zA-Z0-9]+$/).messages({
        "string.empty": "Tên tài khoản không được để trống",
        "string.min": "Tên tài khoản phải có ít nhất 5 ký tự",
        'string.pattern.base': 'Tên tài khoản chỉ được chứa các ký tự chữ cái và số',
}),
    fullname: Joi.string().min(5).messages({
        "string.empty": "Họ và tên không được để trống",
        "any.required": "Họ và tên là trường bắt buộc",
        "string.min": "Họ và tên phải có ít nhất 5 ký tự",
       
    }),
    phone: Joi.string().pattern(/^[0]{1}[0-9]{9}$/).messages({
        'string.empty': 'Số điện thoại không được để trống',
        'string.pattern.base': 'Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số',
        'any.required': 'Số điện thoại là trường bắt buộc',
    }),
    email: Joi.string().email({ tlds: { allow: false } })
    .messages({
      'string.empty': 'Email không được để trống',
      'any.required': 'Email là trường bắt buộc',
      'string.email': 'Email không hợp lệ, email phải có @ và . ',
    }),
    address: Joi.string().min(5).messages({
        "string.empty": "Địa chỉ không được để trống",
        "any.required": "Địa chỉ là trường bắt buộc",
        "string.min": "Địa chỉ phải có ít nhất 5 ký tự",

    }),
});

const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().required().label('Mật khẩu cũ')
    .messages({
        "string.empty": "Mật khẩu cũ không được để trống",
        "any.required": "Mật khẩu cũ là trường bắt buộc"
    }),
    newPassword: Joi.string().min(5).required().label('Mật khẩu mới').messages({
        "string.empty": "Mật khẩu mới không được để trống",
        "string.min": "Mật khẩu mới phải có ít nhất 5 ký tự",
        "any.required": "Mật khẩu mới là trường bắt buộc"
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref("newPassword")).messages({
        "any.only": "Mật khẩu bạn vừa nhập không trùng khớp hãy nhập lại",
        "any.required": "Nhập lại mật khẩu là trường bắt buộc",
        "string.empty": "Nhập lại mật khẩu mới không được để trống",
      }).options({ abortEarly: false }),
  });

export  {userSchema,updateUserSchema,changePasswordSchema};