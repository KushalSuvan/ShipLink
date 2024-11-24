import { ITemplateRepository } from '../interfaces/automationRepository.interface';
import { ITemplate } from '../interfaces/automation.interface';

export class TemplateService {
  private _repository: ITemplateRepository;

  constructor(repository: ITemplateRepository) {
    this._repository = repository;
  }

  async createTemplate(input: ITemplate) {
    return await this._repository.create(input);
  }

  updateTemplate(input: any) {}

  async getTemplate(id: String) {
    return await this._repository.findOne('');
  }

  deleteTemplate(id: String) {}
}
