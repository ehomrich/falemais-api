import { injectable, inject } from 'tsyringe';

import ICallsRepository from '@modules/calls/repositories/ICallsRepository';
import Call from '@modules/calls/infra/memory/entities/Call';

@injectable()
class ListCallsService {
  constructor(
    @inject('CallsRepository')
    private callsRepository: ICallsRepository,
  ) {}

  public async execute(): Promise<Call[]> {
    return this.callsRepository.getAll();
  }
}

export default ListCallsService;
