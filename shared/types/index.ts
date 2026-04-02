import { battlesTable, playersTable } from "../../db/schema";

export type Player = typeof playersTable.$inferSelect;
export type Battle = typeof battlesTable.$inferSelect;
