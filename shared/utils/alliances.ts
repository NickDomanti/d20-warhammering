export const ALLIANCES = [
  {
    name: "Space Marines",
    factions: [
      "Black Templars",
      "Blood Angels",
      "Dark Angels",
      "Deathwatch",
      "Grey Knights",
      "Imperial Fists",
      "Iron Hands",
      "Raven Guard",
      "Salamanders",
      "Space Wolves",
      "Ultramarines",
      "White Scars",
    ],
  },
  {
    name: "Imperium",
    factions: [
      "Adepta Sororitas",
      "Adeptus Custodes",
      "Adeptus Mechanicus",
      "Astra Militarum",
      "Imperial Agents",
      "Imperial Knights",
    ],
  },
  {
    name: "Chaos",
    factions: [
      "Chaos Daemons",
      "Chaos Knights",
      "Chaos Space Marines",
      "Death Guard",
      "Emperor's Children",
      "Iron Warriors",
      "Red Corsairs",
      "Thousand Sons",
      "World Eaters",
    ],
  },
  {
    name: "Xenos",
    factions: [
      "Aeldari",
      "Drukhari",
      "Genestealer Cults",
      "Leagues of Votann",
      "Necrons",
      "Orks",
      "T'au Empire",
      "Tyranids",
    ],
  },
] satisfies {
  name: string;
  factions: string[];
}[];

export function getAllianceByFaction(faction: string) {
  const alliance = ALLIANCES.find((a) => a.factions.includes(faction));
  if (!alliance) throw new Error(`Faction ${faction} does not exist`);
  return alliance.name;
}
