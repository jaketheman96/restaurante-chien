import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secretjwt';

const generateToken = (id: string): string => jwt.sign(id, secret);

export default { generateToken }