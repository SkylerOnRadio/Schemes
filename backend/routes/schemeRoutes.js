import express from 'express';
import {
	getSchemes,
	getScheme,
	addScheme,
	updateScheme,
	deleteScheme,
} from '../controllers/schemeController.js';
import { protect } from '../middleware/authMid.js';
import { isAdmin } from '../middleware/isEmployeeMid.js';

const router = express.Router();

router.get('/', getSchemes);
router.get('/:id', getScheme);
router.post('/', isAdmin, addScheme);
router.put('/:id', isAdmin, updateScheme);
router.delete('/:id', isAdmin, deleteScheme);

export default router;
