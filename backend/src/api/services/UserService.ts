import Users from '../../database/models/UserModel';
import statusCode from '../../utils/statusCode';
import passwordHelper from '../../utils/hashPassword';
import Iusers from '../../interfaces/Iusers';
import tokenHelper from '../../utils/tokenHelper';
import Ilogin from '../../interfaces/Ilogin';
import UserValidator from '../../middlewares/validations/UserValidator';
import Bookings from '../../database/models/BookingsModel';

class UserService {
  private usersModel: typeof Users;
  private usersValidator: UserValidator;

  constructor() {
    this.usersModel = Users;
    this.usersValidator = new UserValidator();
  }

  async getUsers(): Promise<Iusers[]> {
    const users = await this.usersModel.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  }

  async getUserById(userId: number): Promise<Iusers | number> {
    const user = await this.usersModel.findByPk(userId, {
      include: [
        { model: Bookings, as: 'bookings', attributes: { exclude: ['userId'] } },
      ],
      attributes: { exclude: ['password'] },
    });
    if (!user) return statusCode.NOT_FOUND;
    return user;
  }

  async loginUser(userInfos: Iusers): Promise<Ilogin | number | string> {
    const error = this.usersValidator.validateLogin(userInfos);
    if (typeof error === 'string') return error;
    const { email, password } = userInfos as Iusers;
    const user = await this.usersModel.findOne({ where: { email } });
    if (!user) return statusCode.NOT_FOUND;
    const comparingPassword = await passwordHelper.comparePassword(
      password,
      user.password
    );
    if (!comparingPassword) return statusCode.UNAUTHORIZED;
    const token = tokenHelper.generateToken(user);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
      role: user.role,
    };
  }

  async registerUser(userInfos: Iusers): Promise<Ilogin | number | string> {
    const error = this.usersValidator.validateNewUser(userInfos);
    if (typeof error === 'string') return error;
    const { name, email, password, role } = userInfos as Iusers;
    const checkUser = await this.usersModel.findOne({ where: { email } });
    if (checkUser) return statusCode.UNAUTHORIZED;
    const hashedPassword = await passwordHelper.hashPassword(password);
    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    const token = tokenHelper.generateToken(user);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
      role: user.role,
    };
  }

  async updateUser(userId: number, userInfos: Iusers): Promise<void | number> {
    const userValidation = await this.getUserById(userId);
    if (userValidation === 404) return statusCode.NOT_FOUND;
    await this.usersModel.update(userInfos, { where: { id: userId } });
    return;
  }

  async deleteUser(userId: number): Promise<void | number> {
    const userValidation = await this.getUserById(userId);
    if (userValidation === 404) return statusCode.NOT_FOUND;
    await this.usersModel.destroy({ where: { id: userId } });
    return;
  }
}

export default UserService;
