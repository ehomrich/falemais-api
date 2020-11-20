import IPlansRepository from '@modules/plans/repositories/IPlansRepository';
import IFindBySlug from '@modules/plans/dtos/IFindBySlug';
import Plan from '../entities/Plan';

import jsonData from '../datastore/plans.json';

export default class PlansRepository implements IPlansRepository {
  private plans: Plan[] = [];

  constructor() {
    this.plans = jsonData.map(entry => {
      const plan = new Plan();

      Object.assign(plan, entry);

      return plan;
    });
  }

  public async getAll(): Promise<Plan[]> {
    return this.plans;
  }

  public async findBySlug({ slug }: IFindBySlug): Promise<Plan | undefined> {
    return this.plans.find(plan => plan.slug === slug);
  }
}
