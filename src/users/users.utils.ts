import jwt from 'jsonwebtoken';
import client from '../client';
import { TokenType } from '../type';

export const getUser = async (token: string | null) => {
  if (!token) {
    return null;
  }
  const { id } = jwt.verify(
    token,
    process.env.SECRET_KEY as string
  ) as TokenType;

  const user = await client.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return null;
  } else {
    return user;
  }
};
