import expressAsyncHandler from 'express-async-handler';
import { userDetail } from '../model/userDetailsModel.js';

//To show user details
//Get api/user/details
//private user access
export const getUserDetails = expressAsyncHandler(async (req, res, next) => {
	const details = await userDetail.find({ user: req.user.id });
	res.status(200).json(details);
});

//To show user details
//Get api/user/details
//private user access
export const addUserDetails = async (req, res, next) => {
	//deconstructing the parameters from the body
	const {
		gender,
		age,
		income,
		caste,
		disability,
		marital_status,
		minority,
		locality,
		below_poverty,
		student,
	} = req.body;

	if (await userDetail.find({ user: req.user._id })) {
		res.status(400);
		return next(new Error('Details already exists'));
	}

	//checks if all fields are filled
	if (
		!gender ||
		!age ||
		!income ||
		!caste ||
		!disability ||
		!marital_status ||
		!minority ||
		!locality ||
		!below_poverty ||
		!student
	) {
		res.status(400);
		return next(new Error('PLease fill all the fields.'));
	}

	//create user details
	const details = await userDetail.create({
		user: req.user._id,
		gender,
		age,
		income,
		caste,
		disability,
		marital_status,
		minority,
		locality,
		below_poverty,
		student,
	});
	res.status(200).json(details);
};

//To show user details
//Get api/user/details
//private user access
export const updateUserDetails = async (req, res, next) => {
	//destructuring the dat from the body
	const {
		gender,
		age,
		income,
		caste,
		disability,
		marital_status,
		minority,
		locality,
		below_poverty,
		student,
	} = req.body;

	//find the user details from the id of the user
	const details = userDetail.findOne({ user: req.user._id });

	//update the details if the details exists
	if (details) {
		const updatedDetails = await userDetail.findOneAndUpdate(
			{ user: req.user._id },
			{
				gender,
				age,
				income,
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
		res.status(200).json(updatedDetails);
	}
	res.status(400);
	return next(new Error('Details do not exist'));
};
