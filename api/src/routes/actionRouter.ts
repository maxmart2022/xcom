import express from 'express';
import {
	listActionsController,
	newActionController,
	updateActionController,
	viewActionController,
} from '../controllers';
import { currentUser, isSuperman } from '../middlewares';

const router = express.Router();

router.get('/api/action/list', currentUser, isSuperman, listActionsController);
router.post('/api/action/new', currentUser, isSuperman, newActionController);
router.get(
	'/api/action/view/:id',
	currentUser,
	isSuperman,
	viewActionController
);
router.put(
	'/api/action/udate/:id',
	currentUser,
	isSuperman,
	updateActionController
);

export { router as actionRouter };
