import { IUserRepository } from '../interfaces/userRepository.interface';
import { User } from '../models/user.model';

export class UserRepository implements IUserRepository {
  create(data: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(data: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(id: String): Promise<{}> {
    throw new Error('Method not implemented.');
  }
  find(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: String): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
