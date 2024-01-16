import Order from './order';
import OrderItem from './order_item';

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => new Order('', '123')).toThrowError('ID is required');
  });

  it('should throw error when customerId is empty', () => {
    expect(() => new Order('123', '')).toThrowError('CustomerId is required');
  });

  it('should throw error when items is empty', () => {
    expect(() => new Order('123', '123')).toThrowError('Items are required');
  });

  it('should calculate total', () => {
    const item1 = new OrderItem('1', 'item1', 100, 'p1', 2);
    const item2 = new OrderItem('2', 'item2', 200, 'p2', 2);

    const order = new Order('1', '1', [item1]);

    expect(order.total()).toBe(200);

    const order2 = new Order('1', '1', [item1, item2]);

    expect(order2.total()).toBe(600);
  });

  it('should throw error if the item quantity is less or equal zero', () => {
    expect(() => {
      const item1 = new OrderItem('1', 'item1', 100, 'p1', 0);

      new Order('1', '1', [item1]);
    }).toThrowError('Quantity must be greater than zero');
  });
});
