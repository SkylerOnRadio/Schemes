import mongoose from 'mongoose';

const schemeSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Please set the title'],
			maxlength: 50,
		},
		shortDescription: {
			type: String,
			required: [true, 'Please set the short description'],
			maxlength: 150,
		},
		benefits: {
			type: String,
			required: [true, 'Please set the benefits'],
			maxlength: 250,
		},
		objectives: {
			type: String,
			required: [true, 'Please set the objectives'],
			maxlength: 250,
		},
		eligibility: {
			type: String,
			required: [true, 'Please set the eligibility criteria'],
			maxlength: 250,
		},
		agency: {
			type: String,
			required: [true, 'Please set the agency overseeing the scheme'],
			maxlength: 250,
		},
		longDescription: {
			type: String,
			required: [true, 'Please set the long description'],
			maxlength: 550,
		},
	},
	{ timestamps: true }
);

export const Scheme = mongoose.model('Scheme', schemeSchema);
