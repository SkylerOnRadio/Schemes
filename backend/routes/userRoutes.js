import express from 'express';
import {
	addUser,
	loginUser,
	showUser,
	showAdmin,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMid.js';
import { isAdmin } from '../middleware/isEmployeeMid.js';

const router = express.Router();

router.post('/register', addUser);
router.post('/login', loginUser);
router.get('/me', protect, showUser);
router.get('/admin', isAdmin, showAdmin);

export default router;
