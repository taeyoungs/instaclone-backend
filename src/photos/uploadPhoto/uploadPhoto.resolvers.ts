import { Photo } from '.prisma/client';
import { Resolvers } from '../../type';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }: Photo, { client, loggedInUser }) => {
        // caption에서 해시태그 추출
        let hashtagObj: any[] = [];
        if (caption) {
          const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g);
          if (hashtags) {
            hashtagObj = hashtags.map((hashtag) => ({
              where: {
                hashtag,
              },
              create: {
                hashtag,
              },
            }));
          }
        }

        return client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });
      }
    ),
  },
} as Resolvers;
