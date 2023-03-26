import Foods from '../../database/models/FoodsModel';
import Ifoods from '../../interfaces/Ifoods';
import FoodValidator from '../../middlewares/validations/FoodValidator';
import statusCode from '../../utils/statusCode';

class FoodService {
  private foodModel: typeof Foods;
  private foodValidator: FoodValidator;

  constructor() {
    this.foodModel = Foods;
    this.foodValidator = new FoodValidator();
  }

  async getAllFoods(): Promise<Ifoods[]> {
    const foods = await this.foodModel.findAll();
    return foods;
  }

  async getFoodByType(foodType: string): Promise<Ifoods[] | number> {
    const foods = await this.foodModel.findAll({ where: { type: foodType } });
    if (!foods.length) return statusCode.BAD_REQUEST;
    return foods;
  }

  async getFoodById(foodId: number): Promise<Ifoods | number> {
    const food = await this.foodModel.findByPk(foodId);
    if (!food) return statusCode.NOT_FOUND;
    return food;
  }

  async createFood(foodDetails: Ifoods): Promise<void | string> {
    const { name, type, description, price } = foodDetails;
    const inputValidation = this.foodValidator.validate({
      name,
      type,
      description,
      price,
    });
    if (typeof inputValidation === 'string') return inputValidation;
    await this.foodModel.create(foodDetails);
    return;
  }

  async updateFood(
    foodDetails: Ifoods,
    foodId: number
  ): Promise<void | number> {
    const foodValidator = await this.getFoodById(Number(foodId));
    if (foodValidator === 404) return statusCode.NOT_FOUND;
    await this.foodModel.update(foodDetails, { where: { id: foodId } });
    return;
  }

  async deleteFood(foodId: number): Promise<void | number> {
    const foodValidator = await this.getFoodById(Number(foodId));
    if (foodValidator === 404) return statusCode.NOT_FOUND;
    await this.foodModel.destroy({ where: { id: foodId } });
    return;
  }
}

export default FoodService;
