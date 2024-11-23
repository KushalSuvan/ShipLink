import { Shipping } from '../models/shipping.model';

export interface IShippingRepository {
  create(data: Shipping): Promise<Shipping>;
  update(data: Shipping): Promise<Shipping>;
  delete(id: String): Promise<{}>;
  find(): Promise<Shipping[]>;
  findOne(id: String): Promise<Shipping>;
}
