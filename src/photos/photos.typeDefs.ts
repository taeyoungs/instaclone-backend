import { gql } from 'apollo-server';

export default gql`
  type Photo {
    id: Int!
    user: User!
    file: Upload!
    caption: String
    hashtags: [Hashtag]
    likes: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    photos(lastId: Int): [Photo]
    totalPhoto: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
