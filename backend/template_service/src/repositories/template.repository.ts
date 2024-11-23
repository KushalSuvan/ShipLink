import { ITemplateRepository } from '../interfaces/templateRepository.interface';
import { ITemplate } from '../interfaces/template.interface';

export class TemplateRepository implements ITemplateRepository {
  async create(data: ITemplate): Promise<any> {
    throw new Error('Method not implemented.');
  }

  update(data: ITemplate): Promise<ITemplate> {
    throw new Error('Method not implemented.');
  }

  delete(id: String): Promise<{}> {
    throw new Error('Method not implemented.');
  }

  async find(): Promise<ITemplate[]> {
    throw new Error('Method not implemented.');
  }

  async findOne(id: String): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
