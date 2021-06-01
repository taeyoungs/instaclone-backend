import { Resolvers } from '../../type';

export default {
  Query: {
    seeHashtag: (_, { hashtag }, { client }) =>
      client.hashtag.findUnique({
        where: {
          hashtag,
        },
      }),
  },
} as Resolvers;
