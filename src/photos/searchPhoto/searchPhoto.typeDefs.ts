import { gql } from 'apollo-server-core';

export default gql`
  type Query {
    searchPhoto(keyword: String!, lastId: Int): [Photo]
  }
`;
