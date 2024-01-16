import Address from '../value-object/address';
import Customer from './customer';

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    const customer = new Customer('', 'John Doe');
    expect(() => customer.validate()).toThrowError('ID is required');
  });

  it('should throw error when name is empty', () => {
    const customer = new Customer('123', '');
    expect(() => customer.validate()).toThrowError('Name is required');
  });

  it('should change name', () => {
    const customer = new Customer('123', 'John');
    customer.changeName('Jame');

    expect(customer.name).toBe('Jame');
  });

  it('should activate customer', () => {
    const customer = new Customer('123', 'John');
    const address = new Address('street', 'city', '89012123', 123);
    customer.Address = address;
    customer.activate();

    expect(customer.isActive()).toBeTruthy();
  });

  it('should deactivate customer', () => {
    const customer = new Customer('123', 'John');

    customer.deactivate();

    expect(customer.isActive()).toBeFalsy();
  });

  it('should throw error when address is not set and try to activate a customer', () => {
    const customer = new Customer('123', 'John');
    expect(() => customer.activate()).toThrowError(
      'Address is mandatory to activate a customer'
    );
  });

  it('should add reward points', () => {
    const customer = new Customer('123', 'John');

    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(20);
  });
});
