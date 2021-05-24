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
    movie: Movie
    movies: [Movie]
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(title: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    movie: () => ({ title: 'Hello', year: 2021 }),
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
    deleteMovie: (_: any, { title }: { title: string }) => {
      console.log(title);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(() => console.log('Server is running on http://localhost:4000'));
