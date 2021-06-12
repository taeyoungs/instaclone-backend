import { gql } from 'apollo-server-core';

// file 타입 후에 변경, String!은 임시
export default gql`
  type Mutation {
    uploadPhoto(file: Upload!, caption: String): Photo
  }
`;
