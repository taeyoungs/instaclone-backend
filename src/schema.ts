import { makeExecutableSchema } from 'apollo-server-express';
import { loadFilesSync, mergeResolvers, mergeTypeDefs } from 'graphql-tools';

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const typeDefs = mergeTypeDefs(loadedTypes);

const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);

const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
