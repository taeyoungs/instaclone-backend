import client from '../client';

export default {
  Query: {
    movie: (_: any, { id }: { id: number }) =>
      client.movie.findUnique({ where: { id } }),
    movies: () => client.movie.findMany(),
  },
};
