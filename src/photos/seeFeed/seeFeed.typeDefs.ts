import { gql } from 'apollo-server-express';

// TODO: pagination
export default gql`
  type Query {
    seeFeed: [Photo]
  }
`;
