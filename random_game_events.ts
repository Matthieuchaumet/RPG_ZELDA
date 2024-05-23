import * as readlineSync from 'readline-sync';
import Character from './Character';
import * as trapsData from './traps.json';
import selectFromRarity from './utils';

export default function event(floor: number, plr: Character) {
  let correctAction = false;

  if ((floor + 1) % 10 === 0 || Math.random() <= 0.35) {
    if (Math.random() <= 0.5) {
      console.log('Trap Room');
      const currentTrapIndex = selectFromRarity(trapsData);
      const currentTrap = trapsData[currentTrapIndex];
      console.log(`${currentTrap.name}\nrequirement: ${currentTrap.requirement}\n`);
      while (!correctAction) {
        let option: any = readlineSync.question('1: Leave\n:');
        option = Number(option);
        if (option === 1) {
          if ((currentTrap.requirement.startsWith('STR')
          && plr.getSTR >= parseInt(currentTrap.requirement.split('_')[1], 10))
          || (currentTrap.requirement.startsWith('INT')
          && plr.getINT >= parseInt(currentTrap.requirement.split('_')[1], 10))) {
            plr.gainCoins(1);
            console.log('\nGained 1 coins!\n');
          } else {
            const max = plr.getMaxHP * 0.15;
            const min = plr.getMaxHP * 0.05;
            const lifeLost = Math.floor(Math.random() * (max - min + 1)) + min;
            console.log(`\nLost ${lifeLost} HP!\n`);
            plr.dealDMG(lifeLost);
          }
          correctAction = true;
        } else {
          console.log('\nIncorrect input!\n');
        }
      }
    } else {
      while (!correctAction) {
        console.log('Treasure Room');
        let option: any = readlineSync.question('1: Leave\n:');
        option = Number(option);
        if (option === 1) {
          const coinsGained = Math.floor(Math.random() * 3) + 3;
          plr.gainCoins(coinsGained);
          console.log(`\nGained ${coinsGained} coins!\n`);
          correctAction = true;
        } else {
          console.log('Incorrect input!\n');
        }
      }
    }
  }

  if (plr.getHP <= 0) {
    console.log('You Lose!');
    process.exit(0);
  }
}
