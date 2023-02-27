import express from 'express';
import {
	deleteModuleController,
	listModulesController,
	newModuleController,
	updateModuleController,
	viewModuleController,
} from '../controllers';
import { isSuperman, validateRequest } from '../middlewares';
import { moduleValidator } from '../validators/moduleValidator';

const router = express.Router();

router.get('/api/module/list', listModulesController);
router.post(
	'/api/module/new',
	isSuperman,
	moduleValidator,
	validateRequest,
	newModuleController
);
router.get('/api/module/view/:id', isSuperman, viewModuleController);
router.put(
	'/api/module/update/:id',
	isSuperman,
	moduleValidator,
	validateRequest,
	updateModuleController
);
router.delete('/api/module/delete/:id', isSuperman, deleteModuleController);

export { router as moduleRouter };
