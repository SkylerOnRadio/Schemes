import mongoose from 'mongoose';

const schemeEligibilitySchema = mongoose.Schema({
	scheme: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Scheme',
		unique: true,
	},
	gender: { type: String },
	min_age: { type: Number },
	max_age: { type: Number },
	max_income: { type: Number },
	caste: { type: String },
	disability: { type: Boolean },
	marital_status: { type: String },
	minority: { type: Boolean },
	locality: { type: String },
	below_poverty: { type: Boolean },
	student: { type: Boolean },
});

export const Eligibility = mongoose.model(
	'Eligibility',
	schemeEligibilitySchema
);
