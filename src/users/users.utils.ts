import jwt from 'jsonwebtoken';
import client from '../client';
import { Resolver, TokenType, User } from '../type';

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

// export const protectedResolver =
//   (resolver: Resolver): Resolver =>
//   (root, args, ctx, info): Resolver | NotLogggedInResult => {
//     if (!ctx.loggedInUser) {
//       return {
//         ok: false,
//         error: 'Please log in to perform this action',
//       };
//     }
//     return resolver(root, args, ctx, info);
//   };

type NotLogggedInResult = {
  ok: boolean;
  error: string;
};

export function protectedResolver(resolver: Resolver): Resolver {
  return function (root, args, ctx, info): Resolver | NotLogggedInResult {
    if (!ctx.loggedInUser) {
      return {
        ok: false,
        error: 'Please log in to perform this action',
      };
    }
    return resolver(root, args, ctx, info);
  };
}
