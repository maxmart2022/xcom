import express from 'express';
import {
	listActions,
	newAction,
	updateAction,
	viewAction,
} from '../controllers/action';
import { isSuperman } from '../middlewares/is-superman';

const router = express.Router();

router.get('/api/action/list', isSuperman, listActions);
router.get('/api/action/new', isSuperman, newAction);
router.get('/api/action/view/:id', isSuperman, viewAction);
router.get('/api/action/udate/:id', isSuperman, updateAction);

export { router as actionRouter };
