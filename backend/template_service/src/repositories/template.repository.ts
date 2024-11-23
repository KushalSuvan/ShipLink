import { ITemplateRepository } from '../interfaces/templateRepository.interface';
import { Template } from '../models/template.model';
import { dynamoDb, docClient } from '../db';
import { ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { TABLE_NAME } from '../constants';

export class TemplateRepository implements ITemplateRepository {
  async create(data: Template): Promise<any> {
    const command = new UpdateCommand({
      TableName: TABLE_NAME,
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

      console.log('✅  User created succesfully');
      return response;
    } catch (e) {
      console.log(`⚠️  ERROR: Repository couldn't create user`);
      console.log(e);
      console.log();

      throw e;
    }

    // throw new Error('Method not implemented.');
  }

  update(data: Template): Promise<Template> {
    throw new Error('Method not implemented.');
  }

  delete(id: String): Promise<{}> {
    throw new Error('Method not implemented.');
  }

  async find(): Promise<Template[]> {
    throw new Error('Method not implemented.');
  }

  async findOne(id: String): Promise<any> {
    const command = new ListTablesCommand({});

    const response = await dynamoDb.send(command);
    return response.TableNames;
    throw new Error('Method not implemented.');
  }
}
