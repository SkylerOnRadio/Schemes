import mongoose from 'mongoose';

const schemeSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Please set the title'],
			maxlength: 50,
		},
		benefits: {
			type: [String],
			required: [true, 'Please set the benefits'],
			maxlength: 250,
			default: [],
		},
		objectives: {
			type: [String],
			required: [true, 'Please set the objectives'],
			maxlength: 250,
			default: [],
		},
		eligibility: {
			type: [String],
			maxlength: 250,
			default: [],
		},
		agency: {
			type: String,
			required: [true, 'Please set the agency overseeing the scheme'],
			maxlength: 250,
		},
		summary: {
			type: String,
			required: [true, 'Please set the long description'],
			maxlength: 550,
		},
		application: {
			type: String,
			required: [true, 'Please add the application process'],
		},
	},
	{ timestamps: true }
);

export const Scheme = mongoose.model('Scheme', schemeSchema);
