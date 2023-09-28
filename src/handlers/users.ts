import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
	console.log('createNewUser');
	console.log(req.body);
	const user = await prisma.user.create({
		data: {
			username: req.body.username,
			password: await hashPassword(req.body.password)
		}
	})

	const token = createJWT(user);
	res.json({ token: token });
}

export const signin = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			username: req.body.username
		}
	});
	const isValid = await comparePassword(req.body.password, user.password);

	if (!isValid) {
		res.status(401).json({ message: "Invalid password" });
	}

	const token = createJWT(user);
	res.json({ token });
}