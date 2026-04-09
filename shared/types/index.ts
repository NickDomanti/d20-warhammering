import { battlesTable, playersTable } from '~~/server/db/schema';

export type Player = typeof playersTable.$inferSelect;
export type NewPlayer = typeof playersTable.$inferInsert;

export type Battle = typeof battlesTable.$inferSelect;
export type NewBattle = typeof battlesTable.$inferInsert;

export type PlayerStats = {
  player: string;

  battles: {
    date: Date | string;

    budget: number;

    ownData: {
      points: number;
      alliance: string;
      faction: string;
    };

    opponentData: {
      name: string;
    } & PlayerStats['battles'][0]['ownData'];
  }[];
};
