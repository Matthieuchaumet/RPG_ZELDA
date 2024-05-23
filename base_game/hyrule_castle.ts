import * as readlineSync from 'readline-sync';
import Character from './Character';
import * as bossesData from './bosses.json';
import * as ennemiesData from './enemies.json';
import * as playerData from './player.json';

function selectFromRarity(jsonEntities: any): number {
  const rarityProbabilities = [0, 0.5, 0.3, 0.15, 0.04, 0.01];

  const totalRarity = jsonEntities.reduce(
    (sum: any, jsonEntity: { rarity: number }) => sum + rarityProbabilities[jsonEntity.rarity],
    0
  );

  const probabilities = jsonEntities.map(
    (jsonEntity: { rarity: number }) => rarityProbabilities[jsonEntity.rarity] / totalRarity
  );

  const randomIndex = probabilities.reduce(
    (chosenIndex: number, probability: number, index: any) => {
      const r = Math.random();
      return chosenIndex === -1 && r <= probability ? index : chosenIndex;
    },
    -1
  );

  if (randomIndex === -1) {
    return Math.floor(Math.random() * probabilities.length);
  }

  return randomIndex;
}

function showInterface(floor: number, plr: Character, monster: Character) {
  console.log(`=== ${floor} ===`);
  console.log(`${plr.getName}:${plr.getHP}/${plr.getMaxHP}`);
  console.log(`${monster.getName}:${monster.getHP}/${monster.getMaxHP}`);
  console.log('-----');

  let correctAction = false;
  while (!correctAction) {
    let action: any = readlineSync.question('1: attack  |  2: heal\naction:');
    action = Number(action);
    if (action === 1) {
      console.log(`\nDealt ${plr.getSTR} damage to ${monster.getName}!\n`);
      monster.dealDMG(plr.getSTR);
      correctAction = true;
    } else if (action === 2) {
      console.log(`\nHealed ${plr.getMaxHP / 2} HP!\n`);
      plr.heal();
      correctAction = true;
    } else {
      console.log('\nIncorrect input!\n');
    }
  }

  plr.dealDMG(monster.getSTR);
  console.log(`${monster.getName} Dealt ${monster.getSTR} damage to ${plr.getName}!\n`);
}

function main() {
  const rdmPlayer = selectFromRarity(playerData);
  const plr = new Character(playerData[rdmPlayer]);
  let rdmMonster = selectFromRarity(ennemiesData);
  let monster = new Character(ennemiesData[rdmMonster]);
  let currentFloor: number = 1;

  while (plr.getHP > 0 && currentFloor < 11) {
    showInterface(currentFloor, plr, monster);
    if (monster.getHP <= 0) {
      currentFloor += 1;
      if (currentFloor === 10) {
        const rdmBosse = selectFromRarity(bossesData);
        monster = new Character(bossesData[rdmBosse]);
      } else {
        rdmMonster = selectFromRarity(ennemiesData);
        monster = new Character(ennemiesData[rdmMonster]);
      }
    }
  }

  if (plr.getHP > 0) {
    console.log('You Win!');
  } else {
    console.log('You Lose!');
  }
}

main();
