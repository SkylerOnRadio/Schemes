import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
	{
		username: { type: String, required: [true, 'Please add username.'] },
		email: {
			type: String,
			required: [true, 'Please add email.'],
			unique: true,
		},
		password: { type: String, required: [true, 'Please add password.'] },
		employee: { type: Boolean, required: false, default: false },
		hasDetails: { type: Boolean, required: false, default: false },
	},
	{ timestamps: true }
);

export const User = mongoose.model('User', userSchema);
