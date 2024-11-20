import { IUserRepository } from '../interfaces/userRepository.interface';

export class UserService {
  private _repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this._repository = repository;
  }

  createUser(input: any) {}

  updateUser(input: any) {}

  getUser(id: String) {}

  deleteUser(id: String) {}
}
