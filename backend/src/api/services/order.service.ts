import Foods from '../../database/models/foods.model';
import Orders from '../../database/models/orders.model';
import OrdersFoods from '../../database/models/ordersFoods.model';
import Users from '../../database/models/user.model';
import Iorders from '../../interfaces/Iorders';
import statusCode from '../../utils/statusCode';

class OrderService {
  private orderModel: typeof Orders;

  constructor() {
    this.orderModel = Orders;
  }

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
          as: 'order',
          through: { attributes: ['quantity'] },
        },
      ],
    });
    return orders;
  }

  async getOrdersById(orderId: number): Promise<Iorders | number> {
    const order = await this.orderModel.findByPk(orderId, { include: [Foods] });
    if (!order) return statusCode.NOT_FOUND;
    return order;
  }

  async postOrder(orderInfos: Iorders): Promise<void> {
    orderInfos.orderDate = new Date();
    await this.orderModel.create(orderInfos);
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
}

export default OrderService;
