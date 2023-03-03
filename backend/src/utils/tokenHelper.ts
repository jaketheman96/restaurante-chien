import jwt from 'jsonwebtoken';
import Iusers from '../interfaces/Iusers';

const secret = process.env.JWT_SECRET || 'secretjwt';

const generateToken = (userInfos: Iusers): string => {
  const token = jwt.sign(JSON.stringify(userInfos.id), secret)
  return token;
};

export default { generateToken }