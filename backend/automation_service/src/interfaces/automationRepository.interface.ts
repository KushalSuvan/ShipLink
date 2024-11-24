import { ITemplate } from './automation.interface';

export interface ITemplateRepository {
  create(data: ITemplate): Promise<ITemplate>;
  update(data: ITemplate): Promise<ITemplate>;
  delete(id: String): Promise<{}>;
  find(): Promise<ITemplate[]>;
  findOne(id: String): Promise<ITemplate>;
}
