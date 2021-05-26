import { Resolvers } from '../type';
import bcrypt from 'bcrypt';

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password },
      { client }
    ) => {
      // 1. email과 password가 DB에 존재하는지 확인
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            { email },
          ],
        },
      });
      console.log(existingUser);

      // 2. pasword hash
      const hashedPassowrd = await bcrypt.hash(password, 10);

      // 3. user 생성 후 반환
      return client.user.create({
        data: {
          username,
          firstName,
          lastName,
          email,
          password: hashedPassowrd,
        },
      });
    },
  },
};

export default resolvers;
