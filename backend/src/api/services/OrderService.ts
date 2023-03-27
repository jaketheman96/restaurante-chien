import Foods from '../../database/models/FoodsModel';
import OrdersFoods from '../../database/models/OrdersFoodsModel';
import Orders from '../../database/models/OrdersModel';
import Users from '../../database/models/UserModel';
import Ifoods from '../../interfaces/Ifoods';
import Iorders from '../../interfaces/Iorders';
import IordersFoods from '../../interfaces/IordersFoods';
import statusCode from '../../utils/statusCode';

class OrderService {
  private orderModel: typeof Orders;
  private orderFoods: typeof OrdersFoods;

  constructor() {
    this.orderModel = Orders;
    this.orderFoods = OrdersFoods;
  }

  // lembrar de realizar o create order com as informações corretas

  async getAllOrders(): Promise<Iorders[]> {
    const orders = await this.orderModel.findAll({
      include: [
        {
          model: Users,
          as: 'user',
          attributes: { exclude: ['password', 'email', 'id', 'role'] },
        },
        {
          model: Foods,
          as: 'foods',
          through: { attributes: ['quantity'] },
        },
      ],
    });
    return orders;
  }

  async getOrdersById(orderId: number): Promise<Iorders | number> {
    const order = await this.orderModel.findByPk(orderId, {
      include: [
        {
          model: Users,
          as: 'user',
          attributes: { exclude: ['password', 'email', 'id', 'role'] },
        },
        {
          model: Foods,
          as: 'foods',
          through: { attributes: ['quantity'] },
        },
      ],
    });
    if (!order) return statusCode.NOT_FOUND;
    return order;
  }

  async postOrder(orderInfos: Iorders): Promise<void> {
    orderInfos.orderDate = new Date();
    const arrayOfFoods = orderInfos.foods as IordersFoods[];
    await this.orderModel.create(orderInfos).then(async (newOrder: Iorders) => {
      const newOrderFoods = arrayOfFoods.map((food) => ({
        orderId: newOrder.id,
        foodId: food.foodId,
        quantity: food.quantity,
      }));
      await this.orderFoods.bulkCreate(newOrderFoods);
    });
    return;
  }

  async changeOrder(
    orderId: number,
    orderInfos: Iorders
  ): Promise<void | number> {
    const orderValidation = await this.getOrdersById(orderId);
    if (orderValidation === 404) return statusCode.NOT_FOUND;
    await this.orderModel.update(orderInfos, { where: { id: orderId } });
    return;
  }

  async deleteOrder(orderId: number): Promise<void | number> {
    const orderValidation = await this.getOrdersById(orderId);
    if (orderValidation === 404) return statusCode.NOT_FOUND;
    await this.orderModel.destroy({ where: { id: orderId } });
    return;
  }

  async getOrdersByUserId(userId: number) {
    const order = await this.orderModel.findAll({
      where: { userId },
      include: [
        {
          model: Foods,
          as: 'foods',
          through: { attributes: ['quantity'] },
        },
      ],
    });
    return order;
  }
}

export default OrderService;
