import { Resolvers } from '../../type';

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword, lastId }, { client }) => {
      const users = await client.user.findMany({
        where: {
          username: {
            contains: keyword.toLowerCase(),
          },
        },
        skip: lastId ? 1 : 0,
        take: 10,
        ...(lastId && { cursor: { id: lastId } }),
      });

      return users;
    },
  },
};

export default resolvers;
