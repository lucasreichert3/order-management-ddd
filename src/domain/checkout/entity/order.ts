import OrderItem from './order_item';

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number = 0;

  constructor(id: string, customerId: string, items: OrderItem[] = []) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  changeItems(items: OrderItem[]): void {
    this._items = items;
    this._total = this.total();
  }

  changeCustomerId(customerId: string): void {
    this._customerId = customerId;
  }

  validate(): boolean {
    if (!this._id) {
      throw new Error('ID is required');
    }

    if (!this._customerId) {
      throw new Error('CustomerId is required');
    }

    if (this._items.length === 0) {
      throw new Error('Items are required');
    }

    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error('Quantity must be greater than zero');
    }

    return true;
  }

  total(): number {
    return this._items.reduce(
      (total, item) => total + item.orderItemTotal(),
      0
    );
  }
}
