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
router.get('/api/action/new', isSuperman, newActionController);
router.get('/api/action/view/:id', isSuperman, viewActionController);
router.get('/api/action/udate/:id', isSuperman, updateActionController);

export { router as actionRouter };
