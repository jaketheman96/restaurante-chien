import Iusers from "../../interfaces/Iusers";
import userSchema from "./schemas/user.schema";

class UserValidator {
  private schemas: typeof userSchema;

  constructor() {
    this.schemas = userSchema;
  }

  validateNewUser(userInfos: Iusers): string | undefined {
    const { name, email, password, role } = userInfos;
    const { error } = this.schemas.addRegisterUserSchema
      .validate({ name, email, password, role });
    if (error) return error.message;
    return error;
  }
  validateLogin(userInfos: Iusers): string | undefined {
    const { email, password } = userInfos;
    const { error } = this.schemas.addLoginUserSchema.validate({ email, password });
    if (error) return error.message;
    return error;
  }
}



export default UserValidator;