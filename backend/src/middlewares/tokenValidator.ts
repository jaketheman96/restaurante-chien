import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Users from "../database/models/user.model";
import statusCode from '../utils/statusCode';

const secret = process.env.JWT_SECRET || 'secretjwt'

class TokenValidator {
  private _req: Request;
  private _res: Response;
  private _next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    this._req = req;
    this._res = res;
    this._next = next;
  }

  async validator(): Promise<void | Response> {
    const { authorization: token } = this._req.headers;
    if (!token) {
      return this._res.status(statusCode.UNAUTHORIZED).json({ message: 'Token must be provided!' })
    }
    try {
      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
      const user = await Users.findOne({ where: { id: decoded } });
      if (!user) {
        return this._res.status(statusCode.UNAUTHORIZED).json({ message: 'Invalid token!' })
      }
      return this._next()
    } catch (error) {
      return this._res.status(500).json({ message: 'Invalid token!' })
    }
  };
}

export default TokenValidator
