import { date, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const playersTable = pgTable("players", {
  name: text().primaryKey(),
});

export const battlesTable = pgTable("battles", {
  id: serial().primaryKey(),

  budget: integer().notNull(),

  player1: text()
    .references(() => playersTable.name)
    .notNull(),
  player1Points: integer().notNull(),

  player2: text()
    .references(() => playersTable.name)
    .notNull(),
  player2Points: integer().notNull(),

  date: date().notNull(),
});
