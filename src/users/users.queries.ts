export default {
  Query: {
    seeProfile: (_: any, { username }: { username: string }) => {
      console.log('test');
    },
  },
};
