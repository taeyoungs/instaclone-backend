import { Resolvers } from '../../type';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    togglePhoto: protectedResolver(
      async (_, { id }, { loggedInUser, client }) => {
        // photo 유무 확인
        const photo = await client.photo.findUnique({
          where: {
            id,
          },
        });

        if (!photo) {
          return {
            ok: false,
            error: 'Cannot find photo.',
          };
        }

        // 좋아요를 누른 사진인지 파악
        const like = await client.like.findUnique({
          where: {
            userId_photoId: {
              photoId: id,
              userId: loggedInUser.id,
            },
          },
        });

        // 이미 누른 사진일 때
        if (like) {
          await client.like.delete({
            where: {
              userId_photoId: {
                photoId: id,
                userId: loggedInUser.id,
              },
            },
          });
        } else {
          await client.like.create({
            data: {
              photo: {
                connect: {
                  id,
                },
              },
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
            },
          });
        }

        return {
          ok: true,
        };
      }
    ),
  },
} as Resolvers;
