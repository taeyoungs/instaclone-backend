# 13 POC API

## log

- 현재는 한 파일에 type 정의부터 resolve까지 모두 작성하고 있지만 후에 리팩토링 진행
- GraphQL Recap

```js
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
    createMovie: (_, { title }) => {
      console.log(title);
      return true;
    },
    deleteMovie: (_, { title }) => {
      console.log(title);
      return true;
    },
  },
};
```

## tips

## issue

- none

## dependencies

## devDependencies
