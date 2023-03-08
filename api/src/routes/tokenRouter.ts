import express from 'express';
import { refreshTokenController } from '../controllers';

const router = express.Router();

router.post('/api/token/refresh', refreshTokenController);

export { router as tokenRouter };
