require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import express from 'express';
import client from './client';
import { typeDefs, resolvers } from './schema';
import { getUser } from './users/users.utils';

const app = express();

const PORT = process.env.PORT;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  context: async ({ req }) => {
    return {
      client,
      loggedInUser: await getUser(req.headers.authorization || null),
    };
  },
});

app.use(graphqlUploadExpress());
server.applyMiddleware({ app });
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
