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
    likes: ({ id }: Photo, _, { client }) =>
      client.like.count({
        where: {
          photoId: id,
        },
      }),
    comments: ({ id }: Photo, _, { client }) =>
      client.comment.count({
        where: {
          photoId: id,
        },
      }),
    isMine: ({ userId }: Photo, _, { loggedInUser }) =>
      userId === loggedInUser?.id,
  },
  Hashtag: {
    photos: ({ id }, { lastId }, { client }) =>
      client.hashtag
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
    totalPhoto: ({ id }, _, { client }) =>
      client.photo.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      }),
  },
  Comment: {
    isMine: ({ userId }, _, { loggedInUser }) => userId === loggedInUser?.id,
  },
} as Resolvers;
