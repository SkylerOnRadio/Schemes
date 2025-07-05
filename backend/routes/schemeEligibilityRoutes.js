import express from 'express';
import {
	getEligibility,
	addEligibility,
	updateEligibility,
	checkEligibility,
	checkAllEligibility,
} from '../controllers/schemeEligibilityController.js';
import { isAdmin } from '../middleware/isEmployeeMid.js';
import { protect } from '../middleware/authMid.js';

const router = express.Router();

router.get('/check/:id', protect, checkEligibility);
router.get('/checkall', protect, checkAllEligibility);
router.get('/:id', getEligibility);
router.post('/:id', isAdmin, addEligibility);
router.put('/:id', isAdmin, updateEligibility);

export default router;
