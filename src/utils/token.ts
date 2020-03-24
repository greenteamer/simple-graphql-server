import jwt from 'jsonwebtoken';

export const getJWTToken = (email: string, password: string) => {
  return jwt.sign({ email, password }, 'secret');
}
