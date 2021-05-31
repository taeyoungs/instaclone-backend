import { Resolvers } from '../../type';

const resolvers: Resolvers = {
  Query: {
    seeFollowing: async (_, { username, lastId }, { client }) => {
      const user = await client.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
        },
      });
      if (!user) {
        return {
          ok: false,
          error: 'Cannot find User',
        };
      }

      const following = await client.user
        .findUnique({
          where: {
            username,
          },
        })
        .following({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return {
        ok: true,
        following,
      };
    },
  },
};

export default resolvers;
