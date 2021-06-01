import { Resolvers } from '../../type';
import { protectedResolver } from '../../users/users.utils';
import { processHashtags } from '../photos.utils';

export default {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { loggedInUser, client }) => {
        const photo = await client.photo.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });

        if (!photo) {
          return {
            ok: false,
            error: 'Cannot find photo.',
          };
        }

        await client.photo.update({
          where: {
            id,
          },
          data: {
            caption,
            hashtags: {
              disconnect: photo.hashtags,
              connectOrCreate: processHashtags(caption),
            },
          },
        });

        // return {}
      }
    ),
  },
} as Resolvers;
