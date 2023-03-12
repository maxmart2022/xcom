import express from 'express';
import {
	deleteVariantController,
	listVariantsController,
	newVariantController,
	updateVariantController,
	viewVariantController,
} from '../controllers';
import { requireAuth } from '../middlewares';

const router = express.Router();

router.get('/api/variant/list', requireAuth, listVariantsController);
router.post('/api/variant/new', requireAuth, newVariantController);
router.get('/api/variant/view/:id', requireAuth, viewVariantController);
router.put('/api/variant/update/:id', requireAuth, updateVariantController);
router.delete('/api/variant/delete/:id', requireAuth, deleteVariantController);

export { router as variantRouter };
