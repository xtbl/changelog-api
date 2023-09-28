import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5);
}


export const createJWT = (user) => {
    const token = jwt.sign({
        id: user.id,
        username: user.username
    },
        process.env.JWT_SECRET
    )
    return token;
}

export const protect = async (req, res, next) => {
    const bearer = req.headers.authorization;
    console.log(`bearer: ${bearer}`);
    const hashed = await hashPassword('password');
    console.log(`hashPassword: ${hashed}`);
    console.log(`createJWT: ${createJWT({id: 1, username: 'username'})}`);

    if(!bearer) {
        res.status(401)
        res.json({ message: 'Not Authorized' })
        return
    }

    const [, token] = bearer.split(' ');

    if(!token) {
        res.status(401)
        res.json({ message: 'Not Valid Token' })
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.status(401)
        res.json({ message: 'Not Valid Token' })
        return
    }
}