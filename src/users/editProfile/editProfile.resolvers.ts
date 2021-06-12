import { Resolvers } from '../../type';
import bcrypt from 'bcrypt';
import { protectedResolver } from '../users.utils';
import { deleteUploadedFile, uploadToS3 } from '../../shared/shared.uilts';

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          username,
          email,
          firstName,
          lastName,
          password: newPassword,
          bio,
          avatar,
        },
        { client, loggedInUser }
      ) => {
        // delete existed avatar
        const existedAvatar = await client.user.findUnique({
          where: {
            id: loggedInUser.id,
          },
          select: {
            avatar: true,
          },
        });

        if (existedAvatar?.avatar) {
          deleteUploadedFile(existedAvatar.avatar);
        }

        let avatarUrl = null;
        if (avatar) {
          avatarUrl = await uploadToS3(avatar, loggedInUser.id, 'avatar');
          // save file to server
          /*
          const { filename, createReadStream } =
            (await avatar) as GraphQLFileUpload;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();

          const writeStream = createWriteStream(
            path.join(process.cwd(), 'uploads', newFilename)
          );
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:4000/static/${newFilename}`;
          */
        }

        // password를 전달받았을 때만 password를 hash 처리
        let hashedPassword = null;
        if (newPassword) {
          hashedPassword = await bcrypt.hash(newPassword, 10);
        }

        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            username,
            email,
            lastName,
            firstName,
            bio,
            ...(hashedPassword && { password: hashedPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
          },
        });

        if (updatedUser) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: 'Could not update user',
          };
        }
      }
    ),
  },
};

export default resolvers;
