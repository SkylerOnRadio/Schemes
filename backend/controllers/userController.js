import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../model/userModel.js';

//adds user to the database
// POST  api/users/register
// access public
export const addUser = expressAsyncHandler(async (req, res, next) => {
	// destructuring the body to get email and password fields
	const { username, email, password } = req.body;

	//Check if user filled all fields
	if (!username || !email || !password) {
		res.status(400);
		return res.send('Please fill all fields');
	}

	//check if the user already exists
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		return console.log('User already exists');
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
		res.status(200).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		res.send('Invalid User Data');
	}
});

//login User
export const loginUser = expressAsyncHandler(async (req, res) => {
	//destructuring the body
	const { email, password } = req.body;

	//checking if the user filled all the fields
	if (!email || !password) {
		return res.json({ message: 'Fill all the fields' });
	}

	//finding the user through email
	const user = await User.findOne({ email });

	//checking if the entered parameters are correct
	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user.id,
			username: user.username,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400).json({ message: 'Invalid Data' });
	}
});

//show the user details
export const showUser = expressAsyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

//Token Generator
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15d' });
};
