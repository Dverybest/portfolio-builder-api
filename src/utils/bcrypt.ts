import * as bcrypt from 'bcrypt';

export const hashPassword = (rawPassword: string) => {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, SALT);
};

export const comparePassword = (rawPassword: string, hashPassword: string) => {
  return bcrypt.compareSync(rawPassword, hashPassword);
};
