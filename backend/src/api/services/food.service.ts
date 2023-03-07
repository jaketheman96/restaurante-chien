import Foods from "../../database/models/foods.model";
import Ifoods from "../../interfaces/Ifoods";
import statusCode from "../../utils/statusCode";

class FoodService {
  private foodModel: typeof Foods;

  constructor() {
    this.foodModel = Foods
  }

  async getAllFoods(): Promise<Ifoods[]> {
    const foods = await this.foodModel.findAll();
    return foods;
  }

  async getFoodById(foodId: number): Promise<Ifoods | number> {
    const food = await this.foodModel.findByPk(foodId);
    if (!food) return statusCode.NOT_FOUND;
    return food;
  }

  async createFood(foodDetails: Ifoods): Promise<void> {
    await this.foodModel.create(foodDetails);
    return;
  }

  async updateFood(foodDetails: Ifoods, foodId: number): Promise<void | number> {
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