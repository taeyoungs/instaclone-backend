require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import client from './client';
import schema from './schema';

const PORT = process.env.PORT;
const server = new ApolloServer({
  schema,
  context: {
    client,
  },
});

server
  .listen()
  .then(() => console.log(`Server is running on http://localhost:${PORT}`));
