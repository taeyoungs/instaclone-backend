import { Resolvers } from '../../type';

export default {
  Query: {
    searchPhoto: (_, { keyword, lastId }, { client }) =>
      client.photo.findMany({
        where: {
          caption: {
            contains: keyword.toLowerCase(),
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
} as Resolvers;
