import { PrismaClient } from '.prisma/client';

type Client = {
  client: PrismaClient;
};

export type Resolver = (
  root: any,
  args: any,
  context: Client,
  info: any
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
