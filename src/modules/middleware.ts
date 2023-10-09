import { validationResult } from 'express-validator';

export const handleInput = (req, res, next) => {
	const errors = validationResult(req);
	console.log(errors);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	} else {
		next();
	}
};

export const customMessage = (message: string) => (req, res, next) => {
  console.log(`customMessageMiddleware: ${message}`);
  next();
};