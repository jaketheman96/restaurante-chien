import UserService from '../services/user.service';
import statusCode from '../../utils/statusCode';
import { NextFunction, Request, Response } from 'express';

class UsersController {
  private _req: Request;
  private _res: Response;
  private usersService: UserService;

  constructor(req: Request, res: Response, _next: NextFunction) {
    this._req = req;
    this._res = res;
    this.usersService = new UserService()
  }

  async getUsers(): Promise<Response | void> {
    const users = await this.usersService.getUsers();
    return this._res.status(statusCode.OK).json(users);
  }

  async loginUser(): Promise<Response | void> {
    const userLogin = await this.usersService.loginUser(this._req.body);
    if (userLogin === 404) {
      return this._res.status(statusCode.NOT_FOUND)
        .json({ message: 'User not Found!' });
    }
    if (userLogin === 401) {
      return this._res.status(statusCode.UNAUTHORIZED)
        .json({ message: 'Invalid login!' })
    }
    return this._res.status(statusCode.OK).json(userLogin)
  };

  async registerUser(): Promise<Response | void> {
    const user = await this.usersService.registerUser(this._req.body);
    if (user === 401) {
      return this._res.status(statusCode.UNAUTHORIZED)
        .json({ message: 'Email already exist' })
    }
    return this._res.status(statusCode.CREATED).json(user)
  }
}

export default UsersController