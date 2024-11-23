import { IShippingRepository } from '../interfaces/shippingRepository.interface';
import { Shipping } from '../models/shipping.model';

export class ShippingService {
  private _repository: IShippingRepository;

  constructor(repository: IShippingRepository) {
    this._repository = repository;
  }

  async createShipping(input: Shipping) {
    return await this._repository.create(input);
  }

  updateShipping(input: any) {}

  async getShipping(id: String) {
    return await this._repository.findOne('');
  }

  deleteShipping(id: String) {}
}
