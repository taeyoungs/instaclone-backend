import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Movie {
    title: String
    year: Int
  }
  type Query {
    movie: Movie
    movies: [Movie]
  }
  type Mutation {
    createMovie(title: String!): Boolean
    deleteMovie(title: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    movie: () => ({ title: 'Hello', year: 2021 }),
    movies: () => [],
  },
  Mutation: {
    // root, args, context, info
    createMovie: (_: any, { title }: { title: string }) => {
      console.log(title);
      return true;
    },
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
