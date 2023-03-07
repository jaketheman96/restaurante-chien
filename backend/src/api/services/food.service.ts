import Foods from "../../database/models/foods.model";
import Ifoods from "../../interfaces/Ifoods";

class FoodService {
  private foodModel: typeof Foods;

  constructor() {
    this.foodModel = Foods
  }

  async getAllFoods(): Promise<Ifoods[]> {
    const foods = await this.foodModel.findAll();
    return foods;
  }
}

export default FoodService;