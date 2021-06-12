import { Resolvers } from '../../type';

// TODO: pagination
export default {
  Query: {
    seePhotoComments: (_, { id }, { client }) =>
      client.comment.findMany({
        where: {
          photoId: id,
        },
      }),
  },
} as Resolvers;
