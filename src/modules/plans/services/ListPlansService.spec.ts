import PlansRepository from '@modules/plans/infra/memory/repositories/PlansRepository';

import ListPlansService from './ListPlansService';

// eslint-disable-next-line import/order
import jsonData from '@modules/plans/infra/memory/datastore/plans.json';

let plansRepository: PlansRepository;
let listPlansService: ListPlansService;

describe('ListPlans', () => {
  beforeEach(() => {
    plansRepository = new PlansRepository();
    listPlansService = new ListPlansService(plansRepository);
  });

  it('should be able to list all available plans', async () => {
    const plans = await listPlansService.execute();

    expect(plans).toBeInstanceOf(Array);
    expect(plans).toEqual(expect.arrayContaining(jsonData));
  });
});
