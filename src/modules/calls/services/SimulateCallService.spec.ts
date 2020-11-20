import CallsRepository from '@modules/calls/infra/memory/repositories/CallsRepository';
import PlansRepository from '@modules/plans/infra/memory/repositories/PlansRepository';
import AppError from '@shared/errors/AppError';

import SimulateCallService from './SimulateCallService';

let callsRepository: CallsRepository;
let plansRepository: PlansRepository;
let simulateCallService: SimulateCallService;

describe('ListPlans', () => {
  beforeEach(() => {
    callsRepository = new CallsRepository();
    plansRepository = new PlansRepository();
    simulateCallService = new SimulateCallService(
      callsRepository,
      plansRepository,
    );
  });

  it('should be able to calculate the price of a call that does not exceed the plan quota', async () => {
    const result = await simulateCallService.execute({
      planSlug: 'falemais-30',
      origin: '011',
      destination: '017',
      duration: 25,
    });

    expect(result.overageMinutes).toBe(0);
    expect(result.price).toBe(42.5);
    expect(result.priceWithPlan).toBe(0);
  });

  it('should be able to calculate the price of a call that exceeds the plan quota', async () => {
    const result = await simulateCallService.execute({
      planSlug: 'falemais-60',
      origin: '016',
      destination: '011',
      duration: 75,
    });

    expect(result.overageMinutes).toBe(15);
    expect(result.price).toBe(217.5);
    expect(result.priceWithPlan).toBe(47.85);
  });

  it('should be not able to calculate the price of a call with invalid origin and/or destionation', async () => {
    await expect(
      simulateCallService.execute({
        planSlug: 'falemais-120',
        origin: '018',
        destination: '017',
        duration: 87,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able to calculate the price of a call with an invalid plan', async () => {
    await expect(
      simulateCallService.execute({
        planSlug: 'falemais-300',
        origin: '016',
        destination: '011',
        duration: 87,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
