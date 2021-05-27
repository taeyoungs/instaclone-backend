import { Resolvers } from '../../type';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      // 1. username을 가진 사용자를 찾고 (+ 에러 핸들링)
      const user = await client.user.findUnique({
        where: {
          username,
        },
      });
      if (!user) {
        return {
          ok: false,
          error: 'User does not exist',
        };
      }

      // 2. 비밀번호가 일치하는지 확인
      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        return {
          ok: false,
          error: 'Password does not match',
        };
      }

      // 3. 1-2번이 모두 정상적으로 해결됐다면 토큰을 생성하여 반환
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string);
      return {
        ok: true,
        token,
      };
    },
  },
};

export default resolvers;
