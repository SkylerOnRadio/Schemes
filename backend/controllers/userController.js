import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { User } from '../model/userModel.js';
import generateToken from '../utils/generateToken.js';
import e from 'express';

//adds user to the database
// POST  api/users/register
// access public
export const addUser = expressAsyncHandler(async (req, res, next) => {
	// destructuring the body to get email and password fields
	const { username, email, password } = req.body;

	//Check if user filled all fields
	if (!username || !email || !password) {
		res.status(400);
		return next(new Error('Please fill all fields.'));
	}

	//check if the user already exists
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		return next(new Error('User already exists'));
	}

	//Hashing the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await User.create({
		username,
		email,
		password: hashedPassword,
	});
	if (user) {
		//check if the user has company email
		if (email.endsWith('@gov.in')) {
			user.employee = true;
			await user.save();
		}

		generateToken(res, user._id, user.employee);
		res.status(201).json({
			username: user.username,
			email: user.email,
			employee: user.employee,
			hasDetails: user.hasDetails,
		});
	} else {
		res.status(400);
		return next(new Error('Invalid data entered'));
	}
});

//login User
// POST  api/users/register
// access public
export const loginUser = expressAsyncHandler(async (req, res, next) => {
	//destructuring the body
	const { email, password } = req.body;

	//checking if the user filled all the fields
	if (!email || !password) {
		return res.json({ message: 'Fill all the fields' });
	}

	//finding the user through email
	const user = await User.findOne({ email });

	if (!user) {
		res.status(404);
		return next(new Error('User does not exist'));
	}

	//checking if the entered parameters are correct
	if (await bcrypt.compare(password, user.password)) {
		generateToken(res, user._id, user.employee);
		res.status(200).json({
			username: user.username,
			email: user.email,
			employee: user.employee,
			hasDetails: user.hasDetails,
		});
	} else {
		res.status(400);
		return next(new Error('Wrong Password'));
	}
});

//logout user
//Post api/users/logout
//access private
export const logoutUser = expressAsyncHandler(async (req, res) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0),
	});
	res.status(200).json({ message: 'Logged out' });
});

//show the user details
// Get  api/users/me
// access private
export const showUser = expressAsyncHandler(async (req, res) => {
	res.status(200).json({
		_id: req.user._id,
		username: req.user.username,
		email: req.user.email,
	});
});

//show the user details
// Get  api/users/admin
// access admin
export const showAdmin = expressAsyncHandler(async (req, res) => {
	res.status(200).json({
		_id: req.user._id,
		username: req.user.username,
		email: req.user.email,
	});
});

//update user
//put api/users/me
//access private
export const updateUser = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (!user) {
		res.status(404);
		return next(new Error('User not found.'));
	}
	user.username = req.body.username || user.username;
	user.email = req.body.email || user.body.email;
	if (req.body.password) {
		//Hashing the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		user.password = hashedPassword;
	}
	const updatedUser = await user.save();
	res.status(200).json({
		_id: updatedUser._id,
		username: updatedUser.username,
		email: updatedUser.email,
	});
});
