import { PrismaClient } from '.prisma/client';

type TokenType = {
  id: number;
  lat: string;
};

type User = {
  id: string;
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type Client = {
  client: PrismaClient;
  user: User;
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
