import { Resolvers } from '../../type';

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (_, { username, page }, { client }) => {
      const user = await client.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
        },
      });

      if (!user) {
        return {
          ok: false,
          error: 'Cannot find User',
        };
      }

      // 특정 사용자를 팔로우하고 있는 사용자 목록
      const followers = await client.user
        .findUnique({
          where: {
            username,
          },
        })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });
      // followers 수
      const totalFollowers = await client.user.count({
        where: {
          followers: {
            some: {
              username,
            },
          },
        },
      });

      return {
        ok: true,
        followers,
        totalPage: Math.ceil(totalFollowers / 5),
      };
    },
  },
};

export default resolvers;
