import { Resolvers } from '../../type';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    deletePhoto: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const photo = await client.photo.findUnique({
          where: { id },
          select: {
            userId: true,
            hashtags: true,
          },
        });

        if (!photo) {
          return {
            ok: false,
            error: 'Photo not found',
          };
        } else if (loggedInUser.id !== photo.userId) {
          return {
            ok: false,
            error: 'Not Authorized',
          };
        } else {
          // delete likes
          await client.like.deleteMany({
            where: {
              photoId: id,
            },
          });
          // delete comment
          await client.comment.deleteMany({
            where: {
              photoId: id,
            },
          });

          const hashtagIds = photo.hashtags.map((hashtag) => ({
            id: hashtag.id,
          }));

          // photo에 연결된 hashtag 관계 끊기
          await client.photo.update({
            where: {
              id,
            },
            data: {
              hashtags: {
                disconnect: photo.hashtags,
              },
            },
          });

          // 연결을 끊은 hashtag 목록 중에 연결된 photo가 하나도 없는 hashtag 목록 삭제
          const noPhotos = hashtagIds.filter(async (hashtagId) => {
            const hashPhotos = await client.hashtag.findUnique({
              where: {
                id: hashtagId.id,
              },
              select: {
                photos: true,
              },
            });
            return hashPhotos?.photos.length === 0;
          });

          await client.hashtag.deleteMany({
            where: {
              OR: noPhotos,
            },
          });

          // photo에 연관된 필드를 모두 삭제한 후에 photo 삭제
          await client.photo.delete({
            where: { id },
          });
        }
      }
    ),
  },
} as Resolvers;
