import express from 'express';
import {
	deleteBrandController,
	listBrandController,
	newBrandController,
	updateBrandController,
	viewBrandController,
} from '../controllers';
import { hasPermission, requireAuth } from '../middlewares';

const router = express.Router();

router.get(
	'/api/brand/list',
	requireAuth,
	hasPermission('brands', 'View'),
	listBrandController
);
router.post(
	'/api/brand/new',
	requireAuth,
	hasPermission('brands', 'Create'),
	newBrandController
);
router.get('/api/brand/view/:id', requireAuth, viewBrandController);
router.put(
	'/api/brand/update/:id',
	requireAuth,
	hasPermission('brands', 'Edit'),
	updateBrandController
);
router.delete(
	'/api/brand/delete/:id',
	requireAuth,
	hasPermission('brands', 'Delete'),
	deleteBrandController
);

export { router as brandRouter };
