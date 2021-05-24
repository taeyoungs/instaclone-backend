import client from '../client';

export default {
  Mutation: {
    // root, args, context, info
    createMovie: (
      _: any,
      { title, year, genre }: { title: string; year: number; genre?: string }
    ) =>
      client.movie.create({
        data: {
          title,
          year,
          genre,
        },
      }),
    deleteMovie: (_: any, { id }: { id: number }) =>
      client.movie.delete({ where: { id } }),
    updateMovie: (_: any, { id, year }: { id: number; year: number }) =>
      client.movie.update({ where: { id }, data: { year } }),
  },
};
