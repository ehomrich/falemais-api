import CallsRepository from '@modules/calls/infra/memory/repositories/CallsRepository';

import ListCallsService from './ListCallsService';

// eslint-disable-next-line import/order
import jsonData from '@modules/calls/infra/memory/datastore/calls.json';

let callsRepository: CallsRepository;
let listCallsService: ListCallsService;

describe('ListCalls', () => {
  beforeEach(() => {
    callsRepository = new CallsRepository();
    listCallsService = new ListCallsService(callsRepository);
  });

  it('should be able to list all available call configurations', async () => {
    const calls = await listCallsService.execute();

    expect(calls).toBeInstanceOf(Array);
    expect(calls).toEqual(expect.arrayContaining(jsonData));
  });
});
