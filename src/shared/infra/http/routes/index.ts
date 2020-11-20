import { Router } from 'express';

import plansRouter from '@modules/plans/infra/http/routes/plans.routes';
import callsRouter from '@modules/calls/infra/http/routes/calls.routes';
import simulationsRouter from '@modules/calls/infra/http/routes/simulations.routes';

const router = Router();

router.use('/plans', plansRouter);
router.use('/calls', callsRouter);
router.use('/simulations', simulationsRouter);

export default router;
