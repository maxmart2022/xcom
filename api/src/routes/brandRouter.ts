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
	hasPermission('Brands', 'View'),
	listBrandController
);
router.post(
	'/api/brand/new',
	requireAuth,
	hasPermission('Brands', 'Create'),
	newBrandController
);
router.get('/api/brand/view/:id', requireAuth, viewBrandController);
router.put(
	'/api/brand/update/:id',
	requireAuth,
	hasPermission('Brands', 'Edit'),
	updateBrandController
);
router.delete(
	'/api/brand/delete/:id',
	requireAuth,
	hasPermission('Brands', 'Delete'),
	deleteBrandController
);
// router.delete(
// 	'/api/brand/anonymous',
// 	requireAuth,
// 	hasPermission('brands', 'Delete'),
// 	deleteBrands
// );

export { router as brandRouter };
