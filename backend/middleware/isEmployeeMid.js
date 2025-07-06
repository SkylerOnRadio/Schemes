import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import { User } from '../model/userModel.js';

export const isAdmin = expressAsyncHandler(async (req, res, next) => {
	//declaring the token variable
	let token;

	//get the token
	token = req.cookies.jwt;

	if (!token) {
		res.status(401);
		return next(new Error('No token provided'));
	}
	try {
		//verify the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		//check if user is admin
		if (decoded.is_admin) {
			//Get user from the token
			req.user = await User.findById(decoded.user_id).select('-password');
			return next();
		} else {
			res.status(403);
			return next(new Error('Not Admin'));
		}
	} catch (error) {
		res.status(401);
		return next(new Error(error));
	}
});
