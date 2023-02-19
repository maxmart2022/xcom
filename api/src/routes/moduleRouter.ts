import express from 'express';
import {
	deleteModuleController,
	listModulesController,
	newModuleController,
	updateModuleController,
	viewModuleController,
} from '../controllers';
import { currentUser, isSuperman, validateRequest } from '../middlewares';
import { moduleValidator } from '../validators/moduleValidator';

const router = express.Router();

router.get('/api/module/list', currentUser, isSuperman, listModulesController);
router.post(
	'/api/module/new',
	currentUser,
	isSuperman,
	moduleValidator,
	validateRequest,
	newModuleController
);
router.get(
	'/api/module/view/:id',
	currentUser,
	isSuperman,
	viewModuleController
);
router.put(
	'/api/module/udate/:id',
	currentUser,
	isSuperman,
	updateModuleController
);
router.delete(
	'/api/module/delete/:id',
	currentUser,
	isSuperman,
	deleteModuleController
);

export { router as moduleRouter };
