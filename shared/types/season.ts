import { seasonsTable } from '~~/server/db/schema';

export type Season = typeof seasonsTable.$inferSelect;
export type NewSeason = typeof seasonsTable.$inferInsert;
