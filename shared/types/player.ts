import { playersTable } from '~~/server/db/schema';

export type Player = typeof playersTable.$inferSelect;
export type NewPlayer = typeof playersTable.$inferInsert;
