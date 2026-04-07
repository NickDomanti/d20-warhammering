import { eq, or } from "drizzle-orm";
import db from "~~/server/db";
import { PlayerStats } from "~~/shared/types";
import { battlesTable, playersTable } from "../db/schema";

export default eventHandler(async (): Promise<PlayerStats[]> => {
  const query = await db
    .select()
    .from(playersTable)
    .leftJoin(
      battlesTable,
      or(
        eq(playersTable.name, battlesTable.player1),
        eq(playersTable.name, battlesTable.player2),
      ),
    );

  const record = query.reduce(
    (acc, { players: { name }, battles }) => {
      if (!acc[name]) acc[name] = [];

      if (!battles) return acc;

      const isPlayer1 = battles.player1 === name;

      const ownId = isPlayer1 ? "player1" : "player2";
      const opponentId = isPlayer1 ? "player2" : "player1";

      const ownPoints = battles[`${ownId}Points`];
      const ownFaction = battles[`${ownId}Faction`];

      const opponent = battles[opponentId];
      const opponentPoints = battles[`${opponentId}Points`];
      const opponentFaction = battles[`${opponentId}Faction`];

      acc[name].push({
        date: battles.date,
        budget: battles.budget,
        ownData: {
          points: ownPoints,
          faction: ownFaction,
          alliance: getAllianceByFaction(ownFaction),
        },
        opponentData: {
          name: opponent,
          points: opponentPoints,
          faction: opponentFaction,
          alliance: getAllianceByFaction(opponentFaction),
        },
      });

      return acc;
    },
    {} as Record<string, PlayerStats["battles"]>,
  );

  return Object.entries(record).map(
    ([player, battles]) => ({ player, battles }) satisfies PlayerStats,
  );
});
