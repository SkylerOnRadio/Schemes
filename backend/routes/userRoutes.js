import express from 'express';
import {
	addUser,
	loginUser,
	showUser,
	showAdmin,
	logoutUser,
	updateUser,
	fetchUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMid.js';
import { isAdmin } from '../middleware/isEmployeeMid.js';

const router = express.Router();
router.get('/fetch', protect, fetchUser);
router.post('/register', addUser);
router.post('/login', loginUser);
router.get('/me', protect, showUser);
router.put('/me', protect, updateUser);
router.get('/admin', isAdmin, showAdmin);
router.post('/logout', logoutUser);

export default router;
