import { Resolvers } from '../../type';

export default {
  Query: {
    seePhotoLikes: (_, { id }, { client }) =>
      client.user.findMany({
        where: {
          likes: {
            some: {
              photoId: id,
            },
          },
        },
      }),
  },
} as Resolvers;
