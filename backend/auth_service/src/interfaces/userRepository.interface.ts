import { User } from '../models/user.model';

export interface IUserRepository {
  create(data: User): Promise<User>;
  update(data: User): Promise<User>;
  delete(id: String): Promise<{}>;
  find(): Promise<User[]>;
  findOne(id: String): Promise<User>;
}
