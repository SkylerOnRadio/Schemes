import express from 'express';
import {
	getUserDetails,
	addUserDetails,
	updateUserDetails,
} from '../controllers/userDetailsController.js';
import { protect } from '../middleware/authMid.js';

const router = express.Router();

router.get('/', protect, getUserDetails);
router.post('/', protect, addUserDetails);
router.put('/', protect, updateUserDetails);

export default router;
