require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import express from 'express';
import logger from 'morgan';
import { typeDefs, resolvers } from './schema';
import { getUser } from './users/users.utils';
import client from './client';

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

app.use(logger('tiny'));
app.use(graphqlUploadExpress());
app.use('/static', express.static('uploads'));
server.applyMiddleware({ app });
app.listen(PORT, () =>
  console.log(
    `Server is running on http://localhost:${PORT}${server.graphqlPath}`
  )
);
