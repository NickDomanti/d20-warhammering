import { date, int, mysqlTable, serial, text } from "drizzle-orm/mysql-core";

export const playersTable = mysqlTable("players", {
  name: text().primaryKey(),
});

export const battlesTable = mysqlTable("battles", {
  id: serial().primaryKey(),

  player1: text()
    .references(() => playersTable.name)
    .notNull(),
  player1Points: int().notNull(),

  player2: text()
    .references(() => playersTable.name)
    .notNull(),
  player2Points: int().notNull(),

  date: date().notNull(),
});
