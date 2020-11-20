import ICallsRepository from '@modules/calls/repositories/ICallsRepository';
import IFindCallDTO from '@modules/calls/dtos/IFindCallDTO';
import Call from '../entities/Call';

import jsonData from '../datastore/calls.json';

export default class CallsRepository implements ICallsRepository {
  private calls: Call[] = [];

  constructor() {
    this.calls = jsonData.map(entry => {
      const call = new Call();

      Object.assign(call, entry);

      return call;
    });
  }

  public async getAll(): Promise<Call[]> {
    return this.calls;
  }

  public async findByOriginAndDestination({
    origin,
    destination,
  }: IFindCallDTO): Promise<Call | undefined> {
    return this.calls.find(
      call => call.origin === origin && call.destination === destination,
    );
  }
}
