import { PrismaClient } from '.prisma/client';
import { ReadStream } from 'fs-capacitor';

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
  loggedInUser: User;
};

export interface GraphQLFileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(options?: {
    encoding?: string;
    highWaterMark?: number;
  }): ReadStream;
}

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
