import express from 'express';
import { refreshTokenController } from '../controllers/token';
import { currentUser } from '../middlewares/current-user';

const router = express.Router();

router.post('/api/token/refresh', currentUser, refreshTokenController);

export { router as tokenRouter };
