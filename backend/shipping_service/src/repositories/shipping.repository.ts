import { IShippingRepository } from '../interfaces/shippingRepository.interface';
import { Shipping } from '../models/shipping.model';

export class ShippingRepository implements IShippingRepository {
  async create(data: Shipping): Promise<any> {
    throw new Error('Method not implemented.');
  }

  update(data: Shipping): Promise<Shipping> {
    throw new Error('Method not implemented.');
  }

  delete(id: String): Promise<{}> {
    throw new Error('Method not implemented.');
  }

  async find(): Promise<Shipping[]> {
    throw new Error('Method not implemented.');
  }

  async findOne(id: String): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
