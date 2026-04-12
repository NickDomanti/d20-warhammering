import type { battlesTable } from '~~/server/db/schema';

export type Battle = typeof battlesTable.$inferSelect;
export type NewBattle = typeof battlesTable.$inferInsert;
