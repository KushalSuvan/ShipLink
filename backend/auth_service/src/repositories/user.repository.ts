import { IUserRepository } from '../interfaces/userRepository.interface';
import { User } from '../models/user.model';
import { dynamoDb, docClient } from '../db';
import { ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';

export class UserRepository implements IUserRepository {
  async create(data: User): Promise<any> {
    const command = new UpdateCommand({
      TableName: 'UserTable',
      Key: {
        merchantId: data.merchantId + '',
      },
      UpdateExpression: 'set accessToken = :access, refreshToken = :refresh',
      ExpressionAttributeValues: {
        ':access': data.accessToken,
        ':refresh': data.refreshToken,
      },
      ReturnValues: 'UPDATED_NEW',
    });

    try {
      const response = await docClient.send(command);

      console.log('✅ User created succesfully');
      return response;
    } catch (e) {
      console.log(`⚠️ ERROR: Repository couldn't create user`);
      console.log(e);
      console.log();

      throw e;
    }

    // throw new Error('Method not implemented.');
  }

  update(data: User): Promise<User> {
    throw new Error('Method not implemented.');
  }

  delete(id: String): Promise<{}> {
    throw new Error('Method not implemented.');
  }

  async find(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  async findOne(id: String): Promise<any> {
    const command = new ListTablesCommand({});

    const response = await dynamoDb.send(command);
    return response.TableNames;
    throw new Error('Method not implemented.');
  }
}
