import { ITemplateRepository } from '../interfaces/templateRepository.interface';
import { Template } from '../models/template.model';

export class TemplateService {
  private _repository: ITemplateRepository;

  constructor(repository: ITemplateRepository) {
    this._repository = repository;
  }

  async createTemplate(input: Template) {
    return await this._repository.create(input);
  }

  updateTemplate(input: any) {}

  async getTemplate(id: String) {
    return await this._repository.findOne('');
  }

  deleteTemplate(id: String) {}
}
