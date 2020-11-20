import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SimulateCallService from '@modules/calls/services/SimulateCallService';

export default class SimulationsController {
  // eslint-disable-next-line class-methods-use-this
  public async create(request: Request, response: Response): Promise<Response> {
    const { planSlug, origin, destination, duration } = request.body;

    const simulateCallService = container.resolve(SimulateCallService);
    const result = await simulateCallService.execute({
      planSlug,
      origin,
      destination,
      duration,
    });

    return response.json(result);
  }
}
