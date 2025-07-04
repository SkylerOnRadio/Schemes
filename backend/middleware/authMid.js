import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import { User } from '../model/userModel.js';

export const protect = expressAsyncHandler(async (req, res, next) => {
	//declaring the token variable
	let token;

	//checking if the page has a bearer token
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			{
				//get the token
				token = req.headers.authorization.split(' ')[1];

				//verify the token
				const decoded = jwt.verify(token, process.env.JWT_SECRET);

				//Get user from the token
				req.user = await User.findById(decoded.id).select('-password');
				next();
			}
		} catch (error) {
			res.status(401);
			return next(new Error(error));
		}
	}

	if (!token) {
		res.status(401);
		return next('No token provided');
	}
});
