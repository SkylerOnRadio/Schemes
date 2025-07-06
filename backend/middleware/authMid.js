import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import { User } from '../model/userModel.js';

export const protect = expressAsyncHandler(async (req, res, next) => {
	//declaring the token variable
	let token;

	//getting the cookie
	token = req.cookies.jwt;

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.user_id).select('-password');
			return next();
		} catch (error) {
			res.status(403);
			return next('Not Authorized, invalid token');
		}
	} else {
		res.status(401);
		return next('No token provided');
	}
});
