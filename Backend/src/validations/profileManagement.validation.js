const Joi = require('joi')
const logger = require('../utilities/logger')

const register = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  emailAddress: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~`!@#$%^&*()_\-+= {[}\]|\\:;"'<,>.?/]).{12,50}$/
    )
    .required()
    .messages({
      'string.pattern.base':
        'Password should be between 12 to 50 characters, at least 1 lowercase character,at least 1 uppercase character, at least 1 numeric character, at least 1 special character',
      'string.empty': 'Password cannot be empty',
      'any.required': 'Password is required'
    }),
  profileType: Joi.string().required().max(3)
})

const forgotChangePassword = Joi.object({
  newPassword: Joi.string()
    .pattern(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~`!@#$%^&*()_\-+= {[}\]|\\:;"'<,>.?/]).{12,50}$/
    )
    .required()
    .messages({
      'string.pattern.base':
        'newPassword should be between 12 to 50 characters, at least 1 lowercase character,at least 1 uppercase character, at least 1 numeric character, at least 1 special character',
      'string.empty': 'newPassword cannot be empty',
      'any.required': 'newPassword is required'
    })
    .label('newPassword'),
  confirmPassword: Joi.any()
    .equal(Joi.ref('newPassword'))
    .required()
    .label('Confirm password')
    .messages({
      'any.only': 'newPassword and Confirm Password does not match'
    })
})

//
const registerValidation = async (req, res, next) => {
  const payload = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress,
    password: req.body.password,
    profileType: req.body.profileType
  }

  const { error } = register.validate(payload)
  if (error) {
    logger.error(
      `"profileManagement.validation.js","registerValidation()","Error in signup data : ${error.message}"`
    )
    res.status(406).json({ message: `Error in  : ${error.details[0].message}` })
  } else {
    next()
  }
}
//
const forgotChangeValidation = async (req, res, next) => {
  const payload = {
    newPassword: req.body.newPassword,
    confirmPassword: req.body.confirmPassword
  }
  const { error } = forgotChangePassword.validate(payload)
  if (error) {
    logger.error(
      `"profileManagement.validation.js","forgetchangeValidation()","Error in forgotChangePassword data : ${error.details[0].message}"`
    )
    res.status(406).json({ message: `Error in  : ${error.details[0].message}` })
  } else {
    next()
  }
}

module.exports = {
  registerValidation,
  forgotChangeValidation
}
