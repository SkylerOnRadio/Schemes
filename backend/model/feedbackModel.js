import mongoose from 'mongoose';

const feedbackSchema = mongoose.Schema(
	{
		message: { type: String, required: [true, 'Please write something.'] },
		username: { type: String, required: [true] },
		user: {
			type: mongoose.Schema.ObjectId,
			required: true,
			ref: 'User',
		},
		scheme: {
			type: mongoose.Schema.ObjectId,
			required: true,
			ref: 'Scheme',
		},
	},
	{ timestamps: true }
);

export const Feedback = mongoose.model('Feedback', feedbackSchema);
