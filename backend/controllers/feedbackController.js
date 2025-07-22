import expressAsyncHandler from 'express-async-handler';
import { Feedback } from '../model/feedbackModel.js';
import { Scheme } from '../model/schemeModel.js';
import mongoose from 'mongoose';

//GET api/feedbacks/:id
//public access
export const getSchemeFeedback = expressAsyncHandler(async (req, res, next) => {
	const feedbacks = await Feedback.find({ scheme: req.params.id });
	res.status(200).json(feedbacks);
});

//GET api/feedbacks/user
//private access
export const getUserFeedback = expressAsyncHandler(async (req, res, next) => {
	const feedbacks = await Feedback.find({ user: req.user._id });
	res.status(200).json(feedbacks);
});

//POST api/feedbacks/:id
//private access
export const postSchemeFeedback = expressAsyncHandler(
	async (req, res, next) => {
		const scheme_id = req.params.id;

		const { feedback } = req.body;

		if (!mongoose.Types.ObjectId.isValid(scheme_id)) {
			res.status(400);
			return next(new Error('Invalid Scheme ID'));
		}
		const scheme = await Scheme.findOne({ _id: scheme_id });

		if (!scheme) {
			res.status(401);
			return next(new Error('Scheme does not exist.'));
		}

		if (!feedback) {
			res.status(400);
			return next(new Error('Please enter a message.'));
		}

		const userFeedback = await Feedback.create({
			message: feedback,
			username: req.user.username,
			user: req.user._id,
			scheme: scheme_id,
		});
		res.status(201).json(userFeedback);
	}
);
