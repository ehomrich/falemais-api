import { Router } from 'express';

import PlansController from '@modules/plans/infra/http/controllers/PlansController';

const router = Router();
const plansController = new PlansController();

router.get('/', plansController.index);

export default router;
