import express from 'express';
import {
	listActionsController,
	newActionController,
	updateActionController,
	viewActionController,
} from '../controllers';
import { isSuperman } from '../middlewares';

const router = express.Router();

router.get('/api/action/list', isSuperman, listActionsController);
router.post('/api/action/new', isSuperman, newActionController);
router.get('/api/action/view/:id', isSuperman, viewActionController);
router.put('/api/action/update/:id', isSuperman, updateActionController);

export { router as actionRouter };
