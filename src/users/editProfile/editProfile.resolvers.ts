import { Resolvers } from '../../type';
import bcrypt from 'bcrypt';

const resolvers: Resolvers = {
  Mutation: {
    editProfile: async (
      _,
      { username, email, firstName, lastName, password: newPassword },
      { client, user }
    ) => {
      // console.log(user);

      // password를 전달받았을 때만 password를 hash 처리
      let hashedPassword = null;
      if (newPassword) {
        hashedPassword = await bcrypt.hash(newPassword, 10);
      }

      const updatedUser = await client.user.update({
        where: {
          id: 1,
        },
        data: {
          username,
          email,
          lastName,
          firstName,
          ...(hashedPassword && { password: hashedPassword }),
        },
      });

      if (updatedUser) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: 'Could not update user',
        };
      }
    },
  },
};

export default resolvers;