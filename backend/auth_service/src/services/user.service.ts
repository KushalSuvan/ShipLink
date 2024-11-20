import { IUserRepository } from '../interfaces/userRepository.interface';
import { User } from '../models/user.model';

export class UserService {
  private _repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this._repository = repository;
  }

  async createUser(input: User) {
    return await this._repository.create(input);
  }

  updateUser(input: any) {}

  async getUser(id: String) {
    return await this._repository.findOne('');
  }

  deleteUser(id: String) {}
}
