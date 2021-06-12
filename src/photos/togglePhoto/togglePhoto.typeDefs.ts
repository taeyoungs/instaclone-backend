import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    togglePhoto(id: Int!): MutationResponse!
  }
`;
