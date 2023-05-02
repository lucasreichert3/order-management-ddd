export default class Address {
  _street: string = '';
  _number: number = 0;
  _city: string = '';
  _zip: string = '';

  constructor(street: string, city: string, zip: string, number: number) {
    this._street = street;
    this._city = city;
    this._zip = zip;
    this._number = number;

    this.validate();
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error('Street is required');
    }

    if (this._city.length === 0) {
      throw new Error('City is required');
    }

    if (this._zip.length === 0) {
      throw new Error('Zip is required');
    }

    if (this._number === 0) {
      throw new Error('Number is required');
    }
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get city(): string {
    return this._city;
  }

  get zip(): string {
    return this._zip;
  }
}
