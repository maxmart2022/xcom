import express from 'express';
import { refreshTokenController } from '../controllers';
import { currentUser } from '../middlewares';

const router = express.Router();

router.post('/api/token/refresh', currentUser, refreshTokenController);

export { router as tokenRouter };
