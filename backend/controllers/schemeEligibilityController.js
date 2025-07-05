import expressAsyncHandler from 'express-async-handler';
import { Eligibility } from '../model/schemeEligibilityModel.js';
import { Scheme } from '../model/schemeModel.js';
import { userDetail } from '../model/userDetailsModel.js';

//to get the eligibility of the scheme
//get api/eligibility/:id
//public access
export const getEligibility = expressAsyncHandler(async (req, res, next) => {
	const scheme_id = req.params.id;
	const eligibility = await Eligibility.find({ scheme: scheme_id });
	res.status(200).json(eligibility);
});

//to add the eligibility of the scheme
//post api/eligibility/:id
//admin access
export const addEligibility = expressAsyncHandler(async (req, res, next) => {
	//gets the scheme id from the url
	const scheme_id = req.params.id;

	//checks if the scheme exist
	if (await Scheme.findById(scheme_id)) {
		//checks if the eligibility already exists
		if (await Eligibility.find({ scheme: scheme_id })) {
			res.status(400);
			return next(new Error('Eligibility criteria already exists.'));
		}

		//deconstruct the body to get parameters
		const {
			gender,
			min_age,
			max_age,
			max_income,
			caste,
			disability,
			marital_status,
			minority,
			locality,
			below_poverty,
			student,
		} = req.body;

		//checks if all the parameters are filled
		if (
			!gender ||
			!min_age ||
			!max_age ||
			!max_income ||
			!caste ||
			!disability ||
			!marital_status ||
			!minority ||
			!locality ||
			!below_poverty ||
			!student
		) {
			res.status(400);
			return next(new Error('Please fill all the fields'));
		}

		const eligibility = await Eligibility.create({
			scheme: scheme_id,
			gender,
			min_age,
			max_age,
			max_income,
			caste,
			disability,
			marital_status,
			minority,
			locality,
			below_poverty,
			student,
		});
		res.status(200).json(eligibility);
	}
	res.status(400);
	return next(new Error('Scheme does not exist.'));
});

//to update the eligibility of the scheme
//put api/eligibility/:id
//admin access
export const updateEligibility = expressAsyncHandler(async (req, res, next) => {
	//gets the scheme id from the url
	const scheme_id = req.params.id;

	//checks if the scheme exist
	if (!(await Scheme.findById(scheme_id))) {
		res.status(400);
		return next(new Error('Scheme does not exist.'));
	}

	//checks if the eligibility exists or not
	if (!(await Eligibility.findOne({ scheme: scheme_id }))) {
		res.status(400);
		return next(new Error('Eligibility criteria does not exist.'));
	}
	//deconstruct the body to get parameters
	const {
		gender,
		min_age,
		max_age,
		max_income,
		caste,
		disability,
		marital_status,
		minority,
		locality,
		below_poverty,
		student,
	} = req.body;

	//checks if at least one parameter is filled
	if (
		gender ||
		min_age ||
		max_age ||
		max_income ||
		caste ||
		disability ||
		marital_status ||
		minority ||
		locality ||
		below_poverty ||
		student
	) {
		const eligibility = await Eligibility.findOneAndUpdate(
			{ scheme: scheme_id },
			{
				gender,
				min_age,
				max_age,
				max_income,
				caste,
				disability,
				marital_status,
				minority,
				locality,
				below_poverty,
				student,
			},
			{ new: true }
		);
		return res.status(200).json(eligibility);
	}
	res.status(400);
	return next(new Error('Please fill at least one field'));
});

//to check the eligibility of the user for the specific scheme
//get api/eligibility/check/:id
//private access
export const checkEligibility = expressAsyncHandler(async (req, res, next) => {
	//getting the eligibility criteria and the user criteria
	const eligibility = await Eligibility.findOne({ scheme: req.params.id });
	const details = await userDetail.findOne({ user: req.user._id });

	//checking if eligibility criteria exists
	if (!eligibility) {
		res.status(400);
		return next(new Error('Eligibility criteria does not exist'));
	}

	//checks if the user has filled in their details
	if (!details) {
		res.status(400);
		return next(new Error('You have not filled in the user details'));
	}

	//checking if the user is eligible or not
	let failed = [];
	let passed = [];

	const check = (field, condition) => {
		if (condition) {
			passed.push(field);
		} else {
			failed.push(field);
		}
	};

	// Perform checks
	if (eligibility.gender !== undefined)
		check('gender', eligibility.gender === details.gender);

	if (eligibility.min_age !== undefined)
		check('min_age', details.age >= eligibility.min_age);

	if (eligibility.max_age !== undefined)
		check('max_age', details.age <= eligibility.max_age);

	if (eligibility.max_income !== undefined)
		check('max_income', details.income <= eligibility.max_income);

	if (eligibility.caste !== undefined)
		check('caste', eligibility.caste === details.caste);

	if (eligibility.disability !== undefined)
		check('disability', eligibility.disability === details.disability);

	if (eligibility.marital_status !== undefined)
		check(
			'marital_status',
			eligibility.marital_status === details.marital_status
		);

	if (eligibility.minority !== undefined)
		check('minority', eligibility.minority === details.minority);

	if (eligibility.locality !== undefined)
		check('locality', eligibility.locality === details.locality);

	if (eligibility.below_poverty !== undefined)
		check('below_poverty', eligibility.below_poverty === details.below_poverty);

	if (eligibility.student !== undefined)
		check('student', eligibility.student === details.student);

	if (failed.length > 0) {
		return res.status(200).json({
			message: 'You are not eligible.',
			failed,
			passed,
		});
	}

	// Optionally store eligibility status in req for next middleware
	return res.status(200).json({
		message: 'You are eligible.',
		passed,
		failed,
	});
});

//to check the eligibility of the user for all schemes
//get api/eligibility/checkall
//private access
export const checkAllEligibility = expressAsyncHandler(
	async (req, res, next) => {
		//getting the user details
		const details = await userDetail.findOne({ user: req.user._id });
		const allEligibilities = await Eligibility.find().populate(
			'scheme',
			'title _id'
		);

		//checks if the user has filled in their details
		if (!details) {
			res.status(400);
			return next(new Error('You have not filled in the user details'));
		}

		//checking if the user is eligible or not
		const result = [];
		for (const eligibility of allEligibilities) {
			const passed = [];
			const failed = [];
			const check = (field, condition) => {
				if (condition) {
					passed.push(field);
				} else {
					failed.push(field);
				}
			};

			// Perform checks
			if (eligibility.gender !== undefined)
				check('gender', eligibility.gender === details.gender);

			if (eligibility.min_age !== undefined)
				check('min_age', details.age >= eligibility.min_age);

			if (eligibility.max_age !== undefined)
				check('max_age', details.age <= eligibility.max_age);

			if (eligibility.max_income !== undefined)
				check('max_income', details.income <= eligibility.max_income);

			if (eligibility.caste !== undefined)
				check('caste', eligibility.caste === details.caste);

			if (eligibility.disability !== undefined)
				check('disability', eligibility.disability === details.disability);

			if (eligibility.marital_status !== undefined)
				check(
					'marital_status',
					eligibility.marital_status === details.marital_status
				);

			if (eligibility.minority !== undefined)
				check('minority', eligibility.minority === details.minority);

			if (eligibility.locality !== undefined)
				check('locality', eligibility.locality === details.locality);

			if (eligibility.below_poverty !== undefined)
				check(
					'below_poverty',
					eligibility.below_poverty === details.below_poverty
				);

			if (eligibility.student !== undefined)
				check('student', eligibility.student === details.student);

			if (!(failed.length > 0)) {
				result.push({
					scheme_id: eligibility.scheme._id,
					scheme_name: eligibility.scheme.title,
				});
			}
		}

		// Optionally store eligibility status in req for next middleware
		return res.status(200).json({
			result,
		});
	}
);
