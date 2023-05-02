import { Sequelize } from 'sequelize-typescript';
import OrderModel from '../db/sequelize/model/order.model';
import CustomerModel from '../db/sequelize/model/customer.model';
import CustomerRepository from './customer.repository';
import Customer from '../../domain/entity/customer';
import Address from '../../domain/entity/address';
import OrderItemModel from '../db/sequelize/model/order-item.model';
import ProductModel from '../db/sequelize/model/product.model';
import ProductRepository from './product.repository';
import Product from '../../domain/entity/product';
import OrderItem from '../../domain/entity/order_item';
import Order from '../../domain/entity/order';
import OrderRepository from './order.repository';

describe('Order repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('street', 'city', 'state', 123);
    customer.changeAddress(address);

    customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      '123',
      product.name,
      product.price,
      product.id,
      1
    );

    const order = new Order('123', customer.id, [ordemItem]);
    ordemItem;

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderCreated = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderCreated.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total,

      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: '123',
          product_id: '123',
        },
      ],
    });
  });
});
