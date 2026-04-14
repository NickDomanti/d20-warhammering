export type PlayerStats = {
  player: string;

  factions: {
    name: string;

    wins: number;
    losses: number;
    ties: number;
    winRate: number;
  }[];

  battles: BattleStats[];

  wins: BattleStats[];
  losses: BattleStats[];
  ties: BattleStats[];
  winRate: number;
};

export type BattleStats = {
  date: Date | string;

  budget: number;

  ownData: {
    points: number;
    alliance: string;
    faction: string;
  };

  opponentData: {
    name: string;
  } & BattleStats['ownData'];
};
