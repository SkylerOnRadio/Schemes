import expressAsyncHandler from 'express-async-handler';
import { Scheme } from '../model/schemeModel.js';

//Show all schemes
//Get api/schemes/
//access public
export const getSchemes = expressAsyncHandler(async (req, res, next) => {
	const schemes = await Scheme.find();
	res.status(200).json(schemes);
});

//Show a scheme
//Get api/schemes/:id
//access public
export const getScheme = expressAsyncHandler(async (req, res, next) => {
	//getting id from the url
	const id = req.params.id;
	const scheme = await Scheme.findById(id);
	if (scheme) {
		return res.status(200).json(scheme);
	}
	return next(new Error('No such scheme exists.'));
});

//Add scheme
//Post api/schemes/
//access private(admin)
export const addScheme = expressAsyncHandler(async (req, res, next) => {
	//deconstructing the fields from the body
	const {
		title,
		shortDescription,
		benefits,
		objectives,
		eligibility,
		agency,
		longDescription,
	} = req.body;

	//checks if all the fields are entered
	if (
		!title ||
		!shortDescription ||
		!benefits ||
		!objectives ||
		!eligibility ||
		!agency ||
		!longDescription
	) {
		res.status(400);
		return next(new Error('Please fill all the fields.'));
	}

	//create scheme
	const scheme = await Scheme.create({
		title,
		shortDescription,
		benefits,
		objectives,
		eligibility,
		agency,
		longDescription,
	});
	res.status(200).json({ scheme });
});

//Update scheme
//Put api/schemes/:id
//access private(admin)
export const updateScheme = expressAsyncHandler(async (req, res, next) => {
	//getting the id from the url
	const id = req.params.id;

	//destructuring the data from the body
	const {
		title,
		shortDescription,
		benefits,
		objectives,
		eligibility,
		agency,
		longDescription,
	} = req.body;

	//find the scheme
	const scheme = await Scheme.findById(id);

	//check if the the scheme exists
	if (scheme) {
		const updatedScheme = await Scheme.findByIdAndUpdate(
			id,
			{
				title,
				shortDescription,
				benefits,
				objectives,
				eligibility,
				agency,
				longDescription,
			},
			{ new: true }
		);
		res.status(200).json(updatedScheme);
	}
	return next(new Error("Scheme doesn't exist"));
});

//Delete scheme
//Delete api/schemes/:id
//access private(admin)
export const deleteScheme = expressAsyncHandler(async (req, res, next) => {
	//getting id from the url
	const id = req.params.id;

	const scheme = await Scheme.findById(id);
	if (scheme) {
		await Scheme.findByIdAndDelete(id);
		res.status(200).json(id);
	}
	return next(new Error('Scheme does not exist.'));
});
