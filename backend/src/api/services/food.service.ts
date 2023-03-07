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
}

export default FoodService;