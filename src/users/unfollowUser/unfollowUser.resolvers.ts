import { Resolvers } from '../../type';
import { protectedResolver } from '../users.utils';

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }, { client, loggedInUser }) => {
        const user = await client.user.findUnique({
          where: {
            username,
          },
        });

        if (!user) {
          return {
            ok: false,
            error: 'User does not exist.',
          };
        }

        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              disconnect: {
                username,
              },
            },
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
