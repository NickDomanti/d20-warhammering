import { date, integer, pgSchema, serial, text } from "drizzle-orm/pg-core";

// Do not export the schema, or it will be created in the migration,
// which would cause an error since the schema is already created by being set
// as Drizzle's migration schema in drizzle.config.ts
const d20schema = pgSchema("d20_warhammering");

export const playersTable = d20schema.table("players", {
  name: text().primaryKey(),
});

export const battlesTable = d20schema.table("battles", {
  id: serial().primaryKey(),

  budget: integer().notNull(),

  date: date().notNull(),

  player1: text()
    .notNull()
    .references(() => playersTable.name),
  player1Points: integer().notNull(),
  player1Faction: text().notNull(),

  player2: text()
    .notNull()
    .references(() => playersTable.name),
  player2Points: integer().notNull(),
  player2Faction: text().notNull(),
});
