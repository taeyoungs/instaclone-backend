import { Photo } from '.prisma/client';
import { Resolvers } from '../type';

export default {
  Photo: {
    user: ({ userId }: Photo, _, { client }) =>
      client.user.findUnique({
        where: {
          id: userId,
        },
      }),
    hashtags: ({ id }: Photo, _, { client }) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      }),
  },
} as Resolvers;
