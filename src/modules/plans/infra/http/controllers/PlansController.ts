import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListPlansService from '@modules/plans/services/ListPlansService';

export default class PlansController {
  // eslint-disable-next-line class-methods-use-this
  public async index(request: Request, response: Response): Promise<Response> {
    const listPlansService = container.resolve(ListPlansService);
    const plans = await listPlansService.execute();

    return response.json(plans);
  }
}
