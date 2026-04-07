import { battlesTable, playersTable } from "../../server/db/schema";

export type Player = typeof playersTable.$inferSelect;
export type NewPlayer = typeof playersTable.$inferInsert;

export type Battle = typeof battlesTable.$inferSelect;
export type NewBattle = typeof battlesTable.$inferInsert;
