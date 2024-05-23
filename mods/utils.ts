export default function selectFromRarity(jsonEntities: any): number {
  const rarityProbabilities = [0, 0.5, 0.3, 0.15, 0.04, 0.01];

  const totalRarity = jsonEntities.reduce(
    (sum: any, jsonEntity: { rarity: number }) => sum + rarityProbabilities[jsonEntity.rarity],
    0,
  );

  const probabilities = jsonEntities.map(
    (jsonEntity: { rarity: number }) => rarityProbabilities[jsonEntity.rarity] / totalRarity,
  );

  const randomIndex = probabilities.reduce(
    (chosenIndex: number, probability: number, index: any) => {
      const r = Math.random();
      return chosenIndex === -1 && r <= probability ? index : chosenIndex;
    },
    -1,
  );

  if (randomIndex === -1) {
    return Math.floor(Math.random() * probabilities.length);
  }

  return randomIndex;
}
