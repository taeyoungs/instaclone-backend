import { Resolvers } from '../type';

const resolvers: Resolvers = {
  User: {
    totalFollowing: ({ id }, _, { client }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }, _, { client }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;

      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser, client }) => {
      if (!loggedInUser) return false;
      if (id === loggedInUser.id) return false;

      const users = await client.user.count({
        where: {
          id: loggedInUser.id,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(users);
    },
    photos: ({ id }, { lastId }, { client }) =>
      client.user
        .findUnique({
          where: {
            id,
          },
        })
        .photos({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        }),
  },
  Query: {
    testArray: (_, args) => {
      console.log(Array.isArray(args.arr));
      return true;
    },
  },
};

export default resolvers;
