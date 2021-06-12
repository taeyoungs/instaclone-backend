import { gql } from 'apollo-server-express';

export default gql`
  type DeleltePhotoResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deletePhoto(id: Int!): DeleltePhotoResult!
  }
`;
