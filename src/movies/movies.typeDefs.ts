import { gql } from 'apollo-server-core';

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

export default typeDefs;
