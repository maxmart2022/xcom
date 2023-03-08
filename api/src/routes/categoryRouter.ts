import express from 'express';
import {
	deleteCategoryController,
	listCategoryController,
	newCategoryController,
	updateCategoryController,
	viewCategoryController,
} from '../controllers';
import { hasPermission, requireAuth } from '../middlewares';

const router = express.Router();

router.get(
	'/api/category/list',
	requireAuth,
	hasPermission('Categories', 'View'),
	listCategoryController
);
router.post(
	'/api/category/new',
	requireAuth,
	hasPermission('Categories', 'Create'),
	newCategoryController
);
router.get('/api/category/view/:id', requireAuth, viewCategoryController);
router.put(
	'/api/category/update/:id',
	requireAuth,
	hasPermission('Categories', 'Edit'),
	updateCategoryController
);
router.delete(
	'/api/category/delete/:id',
	requireAuth,
	hasPermission('Categories', 'Delete'),
	deleteCategoryController
);

export { router as categoryRouter };
