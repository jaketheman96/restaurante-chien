import Foods from "../../database/models/foods.model";
import Orders from "../../database/models/orders.model";
import Users from "../../database/models/user.model";
import Iorders from "../../interfaces/Iorders";

class OrderService {
  private orderModel: typeof Orders;

  constructor() {
    this.orderModel = Orders;
  }

  async getAllOrders(): Promise<Iorders[]> {
    const orders = await this.orderModel.findAll({
      attributes: { exclude: ["userId", "foodId"] },
      include: [
        {
          model: Users,
          as: 'user',
          attributes: { exclude: ["email", "role", "password"] }
        },
        {
          model: Foods,
          as: 'food',
          attributes: { exclude: ["id", "type", "description"] }
        }
      ],
    })
    return orders;
  }
}

export default OrderService;