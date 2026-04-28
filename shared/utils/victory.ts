import type { BattleStats } from '#shared/types/stats';

export function isDecisiveVictory(w: BattleStats): boolean;

export function isDecisiveVictory(pointsA: number, pointsB: number): boolean;

export function isDecisiveVictory(
  a: BattleStats | number,
  b?: number,
): boolean {
  const pointsA = typeof a === 'number' ? a : a.ownData.points;
  const pointsB = typeof a === 'number' ? b! : a.opponentData.points;

  return pointsA - pointsB >= 20 && pointsA > pointsB * (4 / 3);
}
