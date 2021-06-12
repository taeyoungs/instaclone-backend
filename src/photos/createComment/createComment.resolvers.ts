import { Resolvers } from '../../type';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    createComment: protectedResolver(
      async (_, { photoId, payload }, { client, loggedInUser }) => {
        const photo = await client.photo.findUnique({
          where: {
            id: photoId,
          },
          select: {
            id: true,
          },
        });

        if (!photo) {
          return {
            ok: false,
            error: 'Cannot find Photo',
          };
        }

        await client.comment.create({
          data: {
            payload,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            photo: {
              connect: {
                id: photoId,
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
} as Resolvers;
