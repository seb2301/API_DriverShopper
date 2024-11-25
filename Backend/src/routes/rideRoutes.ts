import { Router } from 'express';
import { estimateRide, confirmRideController, getRideHistoryController } from '../controllers/rideController';

const router = Router();

router.post('/ride/estimate', estimateRide);
router.patch('/ride/confirm', confirmRideController);
router.get('/ride/:customer_id', getRideHistoryController);

export default router;