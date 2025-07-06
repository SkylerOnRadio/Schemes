import jwt from 'jsonwebtoken';

const generateToken = (res, user_id, is_admin) => {
	const token = jwt.sign({ user_id, is_admin }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	res.cookie('jwt', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: 'strict',
		maxAge: 30 * 24 * 60 * 60 * 1000,
	});
};

export default generateToken;
