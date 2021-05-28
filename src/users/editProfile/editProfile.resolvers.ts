import path from 'path';
import { GraphQLFileUpload, Resolvers } from '../../type';
import bcrypt from 'bcrypt';
import { createWriteStream } from 'fs';
import { protectedResolver } from '../users.utils';

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
        let avatarUrl = null;
        if (avatar) {
          const { filename, createReadStream } =
            (await avatar) as GraphQLFileUpload;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();

          const writeStream = createWriteStream(
            path.join(process.cwd(), 'uploads', newFilename)
          );
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:4000/static/${newFilename}`;
        }

        // password를 전달받았을 때만 password를 hash 처리
        let hashedPassword = null;
        if (newPassword) {
          hashedPassword = await bcrypt.hash(newPassword, 10);
        }

        const updatedUser = await client.user.update({
          where: {
            id: 1,
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
