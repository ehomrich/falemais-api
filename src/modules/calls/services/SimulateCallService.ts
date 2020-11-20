import { injectable, inject } from 'tsyringe';

import ICallsRepository from '@modules/calls/repositories/ICallsRepository';
import IPlansRepository from '@modules/plans/repositories/IPlansRepository';
import ISimulateCallDTO from '@modules/calls/dtos/ISimulateCallDTO';

import AppError from '@shared/errors/AppError';

interface ISimulationResult {
  origin: string;
  destination: string;
  overageMinutes: number;
  price: number | null;
  priceWithPlan: number | null;
}

@injectable()
class SimulateCallService {
  constructor(
    @inject('CallsRepository')
    private callsRepository: ICallsRepository,
    @inject('PlansRepository')
    private plansRepository: IPlansRepository,
  ) {}

  public async execute({
    planSlug,
    origin,
    destination,
    duration,
  }: ISimulateCallDTO): Promise<ISimulationResult> {
    const call = await this.callsRepository.findByOriginAndDestination({
      origin,
      destination,
    });

    if (!call) {
      throw new AppError(
        'Configuração de chamada não encontrada. Verifique a origem e o destino.',
      );
    }

    const plan = await this.plansRepository.findBySlug({ slug: planSlug });

    if (!plan) {
      throw new AppError('Plano de chamadas não encontrado.');
    }

    const isExceeded = duration > plan.quota;
    const fee = isExceeded ? 1 + plan.overageFee : 1;
    const overageMinutes = isExceeded ? duration - plan.quota : 0;

    const price = +(duration * call.tariffPerMinute).toFixed(2);
    const priceWithPlan = +(
      overageMinutes *
      (call.tariffPerMinute * fee)
    ).toFixed(2);

    return {
      origin,
      destination,
      overageMinutes,
      price,
      priceWithPlan,
    };
  }
}

export default SimulateCallService;
