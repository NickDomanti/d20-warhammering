import { getLocalTimeZone, today } from '@internationalized/date';
import * as v from 'valibot';
import type { battlesTable } from '~~/server/db/schema';

export type Battle = typeof battlesTable.$inferSelect;
export type NewBattle = typeof battlesTable.$inferInsert;

const playerName = v.pipe(
  v.string(),
  v.nonEmpty("Questo sito non supporta l'anonimato"),
);

const playerFaction = v.pipe(
  v.string(),
  v.nonEmpty('Si ma mi devi dire la fazione'),
  v.values(FACTIONS, 'Ma sta fazione mica esiste oh'),
);

const playerPoints = v.pipe(
  v.number('Bro i punti'),
  v.integer('Le virgole le metti altrove, solo numeri interi qui'),
  v.minValue(0, 'Meno di zero? Ma che schifo'),
  v.maxValue(100, 'Più di 100? È letteralmente impossibile'),
);

export const battleSchema = v.pipe(
  v.object({
    budget: v.pipe(v.number(), v.values(BUDGETS)),

    date: v.pipe(
      v.string(),
      v.isoDate('Ti sembra una data valida questa?'),
      v.check(
        (val) => val <= today(getLocalTimeZone()).toString(),
        'Dubito che questa partita si sia svolta nel futuro',
      ),
    ),

    player1: playerName,
    player1Points: playerPoints,
    player1Faction: playerFaction,

    player2: playerName,
    player2Points: playerPoints,
    player2Faction: playerFaction,
  }),
  v.forward(
    v.check(
      ({ player1, player2 }) => player1 !== player2,
      'Il disturbo di personalità multiple non è contemplato in questo sito',
    ),
    ['player2'],
  ),
) satisfies v.GenericSchema<NewBattle>;
