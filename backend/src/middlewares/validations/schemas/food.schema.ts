import Joi from 'joi';

const addNewFoodSchema = Joi.object({
  name: Joi.string().min(3).required(),
  type: Joi.string().required(),
  description: Joi.string().min(10).required(),
  price: Joi.string().required(),
})

export default addNewFoodSchema;