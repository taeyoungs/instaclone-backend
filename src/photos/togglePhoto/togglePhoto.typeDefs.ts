import { gql } from 'apollo-server-core';

export default gql`
  type TogglePhotoResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    togglePhoto(id: Int!): TogglePhotoResult!
  }
`;
