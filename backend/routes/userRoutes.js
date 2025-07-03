import express from 'express';
import { addUser, loginUser, showUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMid.js';

const router = express.Router();

router.post('/register', addUser);
router.post('/login', loginUser);
router.get('/me', protect, showUser);

export default router;
