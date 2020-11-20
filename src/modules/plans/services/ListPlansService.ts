import { injectable, inject } from 'tsyringe';

import IPlansRepository from '@modules/plans/repositories/IPlansRepository';
import Plan from '@modules/plans/infra/memory/entities/Plan';

@injectable()
class ListPlansService {
  constructor(
    @inject('PlansRepository')
    private plansRepository: IPlansRepository,
  ) {}

  public async execute(): Promise<Plan[]> {
    return this.plansRepository.getAll();
  }
}

export default ListPlansService;
