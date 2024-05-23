import * as readlineSync from 'readline-sync';
import * as path from 'path';
import * as fs from 'fs';
import Character from './Character';

export function saveState(
  plr: Character,
  floor: number,
  floorMax: number,
  difficultyMulti: number,
) {
  let correctChoice = false;
  while (!correctChoice) {
    let choice: any = readlineSync.question('\n1: Save and continue\n2: Save and quit\n3: Continue Without saving\n:');
    choice = Number(choice);
    if (choice === 1 || choice === 2) {
      const data = {
        plrState: plr,
        currentFloor: floor,
        currentFloorMax: floorMax,
        diffMulti: difficultyMulti,
      };

      const fullFilePath = path.join(__dirname, '/.save.json');
      fs.writeFileSync(fullFilePath, JSON.stringify(data));
      correctChoice = true;

      if (choice === 2) {
        process.exit(0);
      }
    } else if (choice === 3) {
      correctChoice = true;
    } else {
      console.log('\nIncorrect input!\n');
    }
  }
}

export function checkSave(): boolean {
  try {
    const fullFilePath = path.join(__dirname, '/.save.json');
    if (!fs.existsSync(fullFilePath)) {
      return false;
    }

    const fileContent = fs.readFileSync(fullFilePath, 'utf8');
    const fileKeys = Object.keys(JSON.parse(fileContent));
    const expectedKeys = ['plrState', 'currentFloor', 'currentFloorMax', 'diffMulti'];

    if (JSON.stringify(fileKeys) !== JSON.stringify(expectedKeys)) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}

export function getSave(): {
  plr: Character,
  currentFloor: number,
  currentFloorMax: number,
  diffMulti: number
} | null {
  try {
    const fullFilePath = path.join(__dirname, '/.save.json');
    const fileContent = fs.readFileSync(fullFilePath, 'utf8');
    const data = JSON.parse(fileContent);

    const plr = new Character({
      id: data.plrState.Id,
      name: data.plrState.Name,
      hp: data.plrState.MaxHP,
      mp: data.plrState.MP,
      str: data.plrState.Strength,
      int: data.plrState.INT,
      def: data.plrState.DEF,
      res: data.plrState.RES,
      spd: data.plrState.Speed,
      luck: data.plrState.Luck,
      race: data.plrState.Race,
      class: data.plrState.Class,
      rarity: data.plrState.Rarity,
    }, 1);

    plr.dealDMG(data.plrState.MaxHP - data.plrState.HP);
    plr.gainCoins(data.plrState.Coins);

    return {
      plr,
      currentFloor: data.currentFloor,
      currentFloorMax: data.currentFloorMax,
      diffMulti: data.diffMulti,
    };
  } catch (err) {
    return null;
  }
}
