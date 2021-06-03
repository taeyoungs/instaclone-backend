import { loadFilesSync, mergeResolvers, mergeTypeDefs } from 'graphql-tools';

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.{ts,js}`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.{ts,js}`);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);
