import { Resolvers } from '../../type';
import { protectedResolver } from '../../users/users.utils';

// TODO: pagination
export default {
  Query: {
    seeFeed: protectedResolver((_, __, { client, loggedInUser }) =>
      client.photo.findMany({
        where: {
          OR: [
            {
              user: {
                followers: {
                  some: {
                    id: loggedInUser.id,
                  },
                },
              },
            },
            {
              userId: loggedInUser.id,
            },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    ),
  },
} as Resolvers;
