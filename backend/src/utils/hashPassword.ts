import bcrypt from 'bcrypt';

const saltRounds = 10;

const hashPassword = async (password: string): Promise<string> => {
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
};

const comparePassword = async (userPassword: string, hashedPassword: string): Promise<boolean> => {
  const comparing = await bcrypt.compare(userPassword, hashedPassword);
  return comparing;
}

export default { 
  hashPassword,
  comparePassword,
}
