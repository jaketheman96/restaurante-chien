import UserService from '../services/user.service';
import statusCode from '../../utils/statusCode';
import { NextFunction, Request, Response } from 'express';

class UsersController {
  private _req: Request;
  private _res: Response;
  private usersService: UserService;
  private userNotFound: Object

  constructor(req: Request, res: Response, _next: NextFunction) {
    this._req = req;
    this._res = res;
    this.usersService = new UserService();
    this.userNotFound = { message: 'No such user with this id' };
  }

  async getUsers(): Promise<Response> {
    const users = await this.usersService.getUsers();
    return this._res.status(statusCode.OK).json(users);
  }

  async getUserById(): Promise<Response> {
    const { id } = this._req.params;
    const response = await this.usersService.getUserById(Number(id));
    if (response === 404) return this._res.status(statusCode.NOT_FOUND)
      .json(this.userNotFound);
    return this._res.status(statusCode.OK).json(response);
  }

  async loginUser(): Promise<Response> {
    const userLogin = await this.usersService.loginUser(this._req.body);
    if (userLogin === 404) {
      return this._res.status(statusCode.NOT_FOUND)
        .json(this.userNotFound);
    }
    if (userLogin === 401) {
      return this._res.status(statusCode.UNAUTHORIZED)
        .json({ message: 'Invalid login!' })
    }
    return this._res.status(statusCode.OK).json(userLogin)
  };

  async registerUser(): Promise<Response> {
    const user = await this.usersService.registerUser(this._req.body);
    if (user === 401) {
      return this._res.status(statusCode.UNAUTHORIZED)
        .json({ message: 'Email already exist' })
    }
    return this._res.status(statusCode.CREATED).json(user)
  }

  async updateUser(): Promise<Response> {
    const { body, params: { id } } = this._req;
    const response = await this.usersService.updateUser(Number(id), body);
    if (response === 404) return this._res.status(statusCode.NOT_FOUND)
      .json(this.userNotFound);
    return this._res.status(statusCode.OK).json({ message: 'User updated!' })
  }

  async deleteUser(): Promise<Response> {
    const { id } = this._req.params;
    const response = await this.usersService.deleteUser(Number(id));
    if (response === 404) return this._res.status(statusCode.NOT_FOUND)
      .json(this.userNotFound);
    return this._res.status(statusCode.OK).json({ message: 'User deleted!' })
  }
}

export default UsersController