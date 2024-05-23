/*
** ETNA PROJECT, 2023
** The Hyrule Castle
** File description:
**  text based RPG type of game based on the world of hyrule from Zelda
*/

import * as readlineSync from 'readline-sync';
import Character from './Character';
import * as bossesData from './bosses.json';
import * as ennemiesData from './enemies.json';
import * as playerData from './player.json';
import titleScreen from './basic_game_customization';
import event from './random_game_events';
import selectFromRarity from './utils';
import { getSave, saveState } from './save';
import triforce from './triforce';
import createCharacter from './character_creation';
import levelexp, { levelup } from './level_and_experience';
import betterCombatOptions from './better_combat_options';

function main() {
  triforce();
  const settings = titleScreen();
  let diff: number;
  let floors: number;
  let saveStateNb: number = 0;
  let plr: any;
  let currentFloor: number = 1;

  [diff, floors, saveStateNb] = settings;

  const saveData = getSave();
  if (saveStateNb === 1 && (saveData && saveData.plr)) {
    plr = saveData.plr;
    diff = saveData.diffMulti;
    floors = saveData.currentFloorMax;
    currentFloor = saveData.currentFloor;
  } else {
    const typeOfGameStr = readlineSync.question('select the type of game : \n  1. Normal Game | 2. Creation Character \n');
    const typeOfGame = Number(typeOfGameStr);
    let start = false;

    while (!start) {
      if (typeOfGame === 1) {
        start = true;
        console.log('====NORMAL GAME====');
        const rdmPlayer = selectFromRarity(playerData);
        plr = new Character(playerData[rdmPlayer], 1);
        plr.gainCoins(12);
      } else if (typeOfGame === 2) {
        start = true;
        console.log('====CREATION MODE====');
        plr = createCharacter();
        console.log(plr);
        plr.gainCoins(12);
      } else {
        console.log('incorrect input');
      }
    }
  }

  let rdmMonster = selectFromRarity(ennemiesData);
  let monster = new Character(ennemiesData[rdmMonster], diff);

  let level = 1;
  let xp = 0;
  let limit = 0;

  while (plr.getHP > 0 && currentFloor <= floors) {
    limit = betterCombatOptions(currentFloor, plr, monster, level, xp, limit);
    if (monster.getHP <= 0) {
      currentFloor += 1;
      limit = 0;
      xp = levelexp(xp);
      if (xp >= 50) {
        level = levelup(level, plr);
        xp = 0;
      }
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

  console.clear();
  if (plr.getHP > 0) {
    console.log('You Win!');
  } else {
    console.log('You Lose!');
  }
}

main();
