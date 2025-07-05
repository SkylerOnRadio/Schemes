import mongoose from 'mongoose';

const userDetailSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
		unique: true,
	},
	gender: {
		type: String,
		required: [true, 'PLease enter your gender.'],
	},
	age: {
		type: Number,
		required: [true, 'PLease enter your age.'],
	},
	income: {
		type: Number,
		required: [true, 'PLease enter your income.'],
	},
	caste: {
		type: String,
		required: [true, 'PLease enter your caste.'],
	},
	disability: {
		type: Boolean,
		required: [true, 'PLease enter if disabled or not.'],
	},
	marital_status: {
		type: String,
		required: [true, 'PLease enter your marital status.'],
	},
	minority: {
		type: Boolean,
		required: [true, 'PLease enter if you are from a minority or not.'],
	},
	locality: {
		type: String,
		required: [true, 'PLease enter your locality.'],
	},
	below_poverty: {
		type: Boolean,
		required: [true, 'PLease enter if you are below poverty line.'],
	},
	student: {
		type: Boolean,
		required: [true, 'PLease enter whether you are a student or not.'],
	},
});

export const userDetail = mongoose.model('userDetail', userDetailSchema);
