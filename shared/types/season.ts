import * as v from 'valibot';
import type { seasonsTable } from '~~/server/db/schema';

export type Season = typeof seasonsTable.$inferSelect;
export type NewSeason = typeof seasonsTable.$inferInsert;

export const seasonSchema = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.nonEmpty()),
    description: v.pipe(v.string(), v.nonEmpty()),
    coverImage: v.pipe(v.string(), v.nonEmpty()),
    startDate: v.nullish(dateSchema),
    endDate: v.nullish(dateSchema),
  }),
  v.forward(
    v.partialCheck(
      [['startDate'], ['endDate']],
      ({ startDate, endDate }) =>
        !startDate || !endDate || endDate > startDate,
      'La fine deve essere successiva all\'inizio',
    ),
    ['endDate'],
  ),
) satisfies v.GenericSchema<NewSeason>;
