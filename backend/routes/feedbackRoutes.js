import express from 'express';
import { protect } from '../middleware/authMid.js';
import {
	getSchemeFeedback,
	getUserFeedback,
	postSchemeFeedback,
} from '../controllers/feedbackController.js';

const router = express.Router();

router.get('/', protect, getUserFeedback);
router.get('/:id', getSchemeFeedback);
router.post('/:id', protect, postSchemeFeedback);

export default router;
