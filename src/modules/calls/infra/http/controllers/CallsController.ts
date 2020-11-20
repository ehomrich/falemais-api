import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCallsService from '@modules/calls/services/ListCallsService';

export default class CallsController {
  // eslint-disable-next-line class-methods-use-this
  public async index(request: Request, response: Response): Promise<Response> {
    const listCallsService = container.resolve(ListCallsService);
    const calls = await listCallsService.execute();

    return response.json(calls);
  }
}
