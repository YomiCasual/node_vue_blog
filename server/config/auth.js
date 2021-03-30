import jwt from 'jsonwebtoken';
import config from './index.js';

export const authenticateJWT = async (req, res, next) => {
	if (!req.headers.authorization)
		return res.status(400).json({
			isSuccessful: false,
			message: 'Authorization Error 1',
		});

	let token = req.headers.authorization.split(' ')[1];

	if (!token)
		return res.status(400).json({
			isSuccessful: false,
			message: 'Authorization Error 2',
		});

	try {
		let authenticated = await jwt.verify(token, config.jsonHash);

		if (!authenticated)
			return res.status(400).json({
				isSuccessful: false,
				message: 'Authorization Error 3',
			});

		req.user = authenticated;
		next();
	} catch (err) {
		res.status(400).json({
			isSuccessful: false,
			message: err,
		});
	}
};
