# 11 Apollo Server

## log

- typeDefs, resolvers를 작성하여 쉽고 빠르게 Apollo Server를 만들 수 있다.

```js
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
```

## tips

- nodemon을 활용하여 코드를 수정하고 저장할 때마다 서버가 재시작되도록 하자.

## issue

- none

## dependencies

- apollo-server
- graphql

## devDependencies

- nodemon
