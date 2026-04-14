import 'dotenv/config';
import { reset } from 'drizzle-seed';
import db from '..';
import { ALLIANCES } from '../../../shared/utils/alliances';
import * as schema from '../schema';

const PLAYER_NAMES = [
  'Alice Johnson',
  'Bob Smith',
  'Charlie Brown',
  'Diana Prince',
  'Ethan Hunt',
  'Fiona Gallagher',
  'George Lucas',
  'Hannah Montana',
  'Ivan Drago',
  'Julia Roberts',
  'Kevin Hart',
  'Laura Palmer',
  'Mike Tyson',
  'Nina Simone',
  'Oscar Wilde',
  'Paula Abdul',
  'Quinn Hughes',
  'Rachel Green',
  'Steve Rogers',
  'Tina Turner',
];

const BUDGETS = [500, 1000, 1500, 2000];

const ALL_FACTIONS = ALLIANCES.flatMap((a) => a.factions);

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function randomDate(): string {
  const start = new Date('2024-01-01');
  const end = new Date('2025-12-31');
  const d = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
  return d.toISOString().split('T')[0]!;
}

async function main() {
  await reset(db, schema);

  // Assign each player 1 faction, ~20% chance of a 2nd
  const playerFactions = new Map<string, string[]>();
  for (const name of PLAYER_NAMES) {
    const primary = pick(ALL_FACTIONS);
    const factions = [primary];
    if (Math.random() < 0.2) {
      const secondary = pick(ALL_FACTIONS.filter((f) => f !== primary));
      factions.push(secondary);
    }
    playerFactions.set(name, factions);
  }

  await db.insert(schema.playersTable).values(
    PLAYER_NAMES.map((name) => ({ name })),
  );

  function makeBattle(p1: string, p2: string) {
    return {
      budget: pick(BUDGETS),
      date: randomDate(),
      player1: p1,
      player1Points: Math.floor(Math.random() * 100),
      player1Faction: pick(playerFactions.get(p1)!),
      player2: p2,
      player2Points: Math.floor(Math.random() * 100),
      player2Faction: pick(playerFactions.get(p2)!),
    };
  }

  // Generate one battle for ~85% of all unique pairs
  const battles = [];
  for (let i = 0; i < PLAYER_NAMES.length; i++) {
    for (let j = i + 1; j < PLAYER_NAMES.length; j++) {
      if (Math.random() < 0.15) continue;
      battles.push(makeBattle(PLAYER_NAMES[i]!, PLAYER_NAMES[j]!));
    }
  }

  // Add some rematches (~20% of pairs get a second battle)
  for (let i = 0; i < PLAYER_NAMES.length; i++) {
    for (let j = i + 1; j < PLAYER_NAMES.length; j++) {
      if (Math.random() < 0.2) {
        battles.push(makeBattle(PLAYER_NAMES[i]!, PLAYER_NAMES[j]!));
      }
    }
  }

  await db.insert(schema.battlesTable).values(battles);
}

main();
