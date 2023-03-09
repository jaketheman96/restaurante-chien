import Joi from 'joi';

const addRegisterUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().min(1).max(15).required(),
});

const addLoginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

export default { addRegisterUserSchema, addLoginUserSchema };