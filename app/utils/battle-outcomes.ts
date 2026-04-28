export enum BattleOutcomes {
  WIN = 'Vittoria',
  LOSS = 'Sconfitta',
  TIE = 'Pareggio',
}

export enum BattleOutcomeIcons {
  WIN = AppIcons.CROWN,
  LOSS = AppIcons.SKULL,
  TIE = AppIcons.EQUAL,
}

export const BATTLE_OUTCOMES = {
  [BattleOutcomes.WIN]: {
    icon: BattleOutcomeIcons.WIN,
    colors: { bg: 'bg-success-500', text: 'text-success-300' },
  },
  [BattleOutcomes.LOSS]: {
    icon: BattleOutcomeIcons.LOSS,
    colors: { bg: 'bg-error-500', text: 'text-error-300' },
  },
  [BattleOutcomes.TIE]: {
    icon: BattleOutcomeIcons.TIE,
    colors: { bg: 'bg-warning-500', text: 'text-warning-300' },
  },
} as const satisfies Record<
  BattleOutcomes,
  {
    icon: string;
    colors: { bg: string; text: string };
  }
>;
