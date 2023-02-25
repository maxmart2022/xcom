import express from 'express';
import {
	listCategoryController,
	newCategoryController,
	updateCategoryController,
	viewCategoryController,
} from '../controllers';
import { requireAuth } from '../middlewares';

const router = express.Router();

router.get('/api/category/list', requireAuth, listCategoryController);
router.post('/api/category/new', requireAuth, newCategoryController);
router.get('/api/category/view/:id', requireAuth, viewCategoryController);
router.put('/api/category/update/:id', requireAuth, updateCategoryController);

export { router as categoryRouter };
