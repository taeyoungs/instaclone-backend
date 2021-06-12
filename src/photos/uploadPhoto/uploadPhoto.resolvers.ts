import { uploadToS3 } from '../../shared/shared.uilts';
import { Resolvers } from '../../type';
import { protectedResolver } from '../../users/users.utils';
import { processHashtags } from '../photos.utils';

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { client, loggedInUser }) => {
        // S3에 이미지 업로드
        const fileUrl = await uploadToS3(file, loggedInUser.id, 'uploads');

        // caption에서 해시태그 추출
        let hashtagObj: any[] = [];
        if (caption) {
          hashtagObj = processHashtags(caption);
        }

        return client.photo.create({
          data: {
            file: fileUrl,
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
