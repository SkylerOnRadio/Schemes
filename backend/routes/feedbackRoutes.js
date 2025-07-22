import express from 'express';
import { protect } from '../middleware/authMid';
import {
	getSchemeFeedback,
	getUserFeedback,
	postSchemeFeedback,
} from '../controllers/feedbackController';

const router = express.Router();

router.get('/:id', getSchemeFeedback);
router.get('/user/:id', protect, getUserFeedback);
router.post('/:id', protect, postSchemeFeedback);

export default router;
