import * as readlineSync from 'readline-sync';
import Character from './Character';
import * as bossesData from './bosses.json';
import * as ennemiesData from './enemies.json';
import * as playerData from './player.json';
import titleScreen from './basic_game_customization';
import event from './random_game_events';
import selectFromRarity from './utils';
import { getSave, saveState } from './save';

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
  const settings = titleScreen();
  let diff: number;
  let floors: number;
  let saveStateNb: number = 0;
  let plr: Character;
  let currentFloor: number = 1;

  [diff, floors, saveStateNb] = settings;

  const saveData = getSave();
  if (saveStateNb === 1 && (saveData && saveData.plr)) {
    plr = saveData.plr;
    diff = saveData.diffMulti;
    floors = saveData.currentFloorMax;
    currentFloor = saveData.currentFloor;
  } else {
    const rdmPlayer = selectFromRarity(playerData);
    plr = new Character(playerData[rdmPlayer], 1);

    plr.gainCoins(12);
  }

  let rdmMonster = selectFromRarity(ennemiesData);
  let monster = new Character(ennemiesData[rdmMonster], diff);

  while (plr.getHP > 0 && currentFloor <= floors) {
    showInterface(currentFloor, plr, monster);
    if (monster.getHP <= 0) {
      currentFloor += 1;
      plr.gainCoins(1);
      if (currentFloor > 1) {
        if (saveStateNb === 0) {
          event(currentFloor, plr);
        } else {
          saveStateNb = 0;
        }
        saveState(plr, currentFloor, floors, diff);
      }
      if (currentFloor % 10 === 0) {
        const rdmBosse = selectFromRarity(bossesData);
        monster = new Character(bossesData[rdmBosse], diff);
      } else {
        rdmMonster = selectFromRarity(ennemiesData);
        monster = new Character(ennemiesData[rdmMonster], diff);
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
