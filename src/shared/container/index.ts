import { container } from 'tsyringe';

import ICallsRepository from '@modules/calls/repositories/ICallsRepository';
import CallsRepository from '@modules/calls/infra/memory/repositories/CallsRepository';

import IPlansRepository from '@modules/plans/repositories/IPlansRepository';
import PlansRepository from '@modules/plans/infra/memory/repositories/PlansRepository';

container.registerSingleton<ICallsRepository>(
  'CallsRepository',
  CallsRepository,
);

container.registerSingleton<IPlansRepository>(
  'PlansRepository',
  PlansRepository,
);
