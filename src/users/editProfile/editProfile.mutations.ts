import { Resolvers } from '../../type';

const resolvers: Resolvers = {
  Mutation: {
    editProfile: () => console.log('editProfile'),
  },
};

export default resolvers;
