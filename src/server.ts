import { PrismaClient } from '.prisma/client';
import { ApolloServer, gql } from 'apollo-server';
const client = new PrismaClient();

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createAt: String!
    updateAt: String!
  }
  type Query {
    movie(id: Int!): Movie
    movies: [Movie]
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(title: String!): Movie
    updateMovie(id: Int!, year: Int!): Movie
  }
`;

const resolvers = {
  Query: {
    movie: (_: any, { id }: { id: number }) =>
      client.movie.findUnique({ where: { id } }),
    movies: () => client.movie.findMany(),
  },
  Mutation: {
    // root, args, context, info
    createMovie: (
      _: any,
      { title, year, genre }: { title: string; year: number; genre?: string }
    ) =>
      client.movie.create({
        data: {
          title,
          year,
          genre,
        },
      }),
    deleteMovie: (_: any, { id }: { id: number }) =>
      client.movie.delete({ where: { id } }),
    updateMovie: (_: any, { id, year }: { id: number; year: number }) =>
      client.movie.update({ where: { id }, data: { year } }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(() => console.log('Server is running on http://localhost:4000'));
