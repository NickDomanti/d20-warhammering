import 'dotenv/config';
import { seed } from 'drizzle-seed';
import db from '..';
import { ALLIANCES } from '../../../shared/utils/alliances';
import * as schema from '../schema';

async function main() {
  await seed(db, schema, { count: 20 }).refine((f) => ({
    playersTable: {
      columns: {
        name: f.fullName({ isUnique: true }),
      },
    },
    battlesTable: {
      columns: {
        budget: f.valuesFromArray({ values: [500, 1000, 1500, 2000] }),

        player1Points: f.int({ minValue: 0, maxValue: 99 }),
        player2Points: f.int({ minValue: 0, maxValue: 99 }),

        player1Faction: f.valuesFromArray({
          values: ALLIANCES.flatMap((a) => a.factions),
        }),
        player2Faction: f.valuesFromArray({
          values: ALLIANCES.flatMap((a) => a.factions),
        }),
      },
    },
  }));
}

main();
