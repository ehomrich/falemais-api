import { Router } from 'express';

import CallsController from '@modules/calls/infra/http/controllers/CallsController';

const router = Router();
const callsController = new CallsController();

router.get('/', callsController.index);

export default router;
