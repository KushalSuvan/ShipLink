import { Template } from '../models/template.model';

export interface ITemplateRepository {
  create(data: Template): Promise<Template>;
  update(data: Template): Promise<Template>;
  delete(id: String): Promise<{}>;
  find(): Promise<Template[]>;
  findOne(id: String): Promise<Template>;
}
