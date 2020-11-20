import { Router } from 'express';
import { celebrate } from 'celebrate';

import SimulationsController from '@modules/calls/infra/http/controllers/SimulationsController';

import simulationBodySchema from '@modules/calls/infra/http/schemas/simulationBodySchema';

const router = Router();
const simulationsController = new SimulationsController();

router.post('/', celebrate(simulationBodySchema), simulationsController.create);

export default router;
