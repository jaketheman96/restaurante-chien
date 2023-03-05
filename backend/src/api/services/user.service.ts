import Users from '../../database/models/user.model';
import statusCode from '../../utils/statusCode';
import passwordHelper from '../../utils/hashPassword';
import Iusers from '../../interfaces/Iusers';
import tokenHelper from '../../utils/tokenHelper';
import Ilogin from '../../interfaces/Ilogin';

class UserService {
  private usersModel;

  constructor() {
    this.usersModel = Users;
  }

  async getUsers(): Promise<Iusers[]> {
    const users = await this.usersModel.findAll({
      attributes: { exclude: ['password'] },
    })
    return users;
  }

  async loginUser(userInfos: Iusers): Promise<Ilogin | number> {
    const { email, password } = userInfos as Iusers;
    const user = await this.usersModel.findOne({ where: { email } });
    if (!user) return statusCode.NOT_FOUND;
    const comparingPassword = await passwordHelper
      .comparePassword(password, user.password)
    if (!comparingPassword) return statusCode.UNAUTHORIZED;
    const token = tokenHelper.generateToken(user);
    return {
      token,
      role: user.role,
    };
  }

  async registerUser(userInfos: Iusers): Promise<Ilogin | number> {
    const { name, email, password, role } = userInfos as Iusers;
    const checkUser = await this.usersModel.findOne({ where: { email } })
    if (checkUser) return statusCode.UNAUTHORIZED;
    const hashedPassword = await passwordHelper.hashPassword(password);
    const user = await Users.create({ name, email, password: hashedPassword, role })
    const token = tokenHelper.generateToken(user);
    return {
      token,
      role: user.role,
    }
  }
}




export default UserService;