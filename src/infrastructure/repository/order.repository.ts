import Order from '../../domain/checkout/entity/order';
import OrderItem from '../../domain/checkout/entity/order_item';
import OrderRepositoryInterface from '../../domain/checkout/repository/order-repository.interface';
import OrderItemModel from '../db/sequelize/model/order-item.model';
import OrderModel from '../db/sequelize/model/order.model';

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    try {
      await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          })),
        },
        {
          include: [{ model: OrderItemModel }],
        }
      );
    } catch (error) {
      console.error(error)
    }
  }

  async update(entity: Order): Promise<void> {
    try {
      const order = await OrderModel.findOne({
        where: {
          id: parseInt(entity.id),
        },
        include: [{ model: OrderItemModel }],
      });

      if (!order) throw new Error('Order not found')

      await order.sequelize.transaction(async (transaction) => {
        await OrderItemModel.destroy({
          where: {
            order_id: order.id,
          },
          transaction
        });

        await OrderItemModel.bulkCreate(
          entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            order_id: order.id,
          })),
          { transaction }
        );
      })

      order.total = entity.total();

      await order.save()
    } catch (error) {
      console.error(error)
    }
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: {
        id: parseInt(id),
      },
      include: [{ model: OrderItemModel }],
    });

    if (!orderModel) throw new Error('Order not found')

    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map(
        (item) => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
      )
    )
  }

  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({ include: [{ model: OrderItemModel }] })

    return ordersModel.map(
      (orderModel) =>
        new Order(
          orderModel.id,
          orderModel.customer_id,
          orderModel.items.map(
            (item) => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
          )
        )
    )
  }
}
