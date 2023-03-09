import Ifoods from '../../interfaces/Ifoods';
import foodSchema from './schemas/food.schema';

class FoodValidator {
  private foodsSchema: typeof foodSchema;

  constructor() {
    this.foodsSchema = foodSchema;
  }

  validate(foodsInfos: Ifoods): string | undefined {
    const { name, type, description, price } = foodsInfos;
    const { error } = this.foodsSchema.validate({ name, type, description, price });
    if (error) return error.message
    return error;
  }
}

export default FoodValidator;