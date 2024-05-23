import * as readlineSync from 'readline-sync';
import jsonEditor from './json_editor';
import { checkSave } from './save';

export default function titleScreen() : number[] {
  let correctOption = false;
  let correctDifficulty = false;
  let correctFloor = false;
  let statMulti: number = 1;
  let floor: number = 10;
  let saveStateNb: number = 0;
  const saveFound = checkSave();
  while (!correctOption) {
    if (saveFound) {
      let option: any = readlineSync.question('=== The Hyrule Castle ===\n1: New Game\n2: Continue\n3: Quit\n4: Change Data\n:');
      option = Number(option);
      if (option === 1) {
        correctOption = true;
      } else if (option === 2) {
        saveStateNb = 1;
        correctOption = true;
        correctDifficulty = true;
        correctFloor = true;
      } else if (option === 3) {
        process.exit(0);
      } else if (option === 4) {
        jsonEditor();
      } else {
        console.log('\nIncorrect input!\n');
      }
    } else {
      let option: any = readlineSync.question('=== The Hyrule Castle ===\n1: New Game\n2: Quit\n3: Change Data\n:');
      option = Number(option);
      if (option === 1) {
        correctOption = true;
      } else if (option === 2) {
        process.exit(0);
      } else if (option === 3) {
        jsonEditor();
      } else {
        console.log('\nIncorrect input!\n');
      }
    }
  }

  while (!correctDifficulty) {
    let difficulty: any = readlineSync.question('\n1: Normal\n2: Difficult\n3: Insane\n:');
    difficulty = Number(difficulty);
    if (difficulty === 1) {
      correctDifficulty = true;
    } else if (difficulty === 2) {
      statMulti = 1.5;
      correctDifficulty = true;
    } else if (difficulty === 3) {
      statMulti = 2;
      correctDifficulty = true;
    } else {
      console.log('\nIncorrect input!\n');
    }
  }

  while (!correctFloor) {
    let floorChoice: any = readlineSync.question('\nSelect the number of floors\n1: 10\n2: 20\n3: 50\n4: 100\n:');
    floorChoice = Number(floorChoice);
    if (floorChoice === 1) {
      floor = 10;
      correctFloor = true;
    } else if (floorChoice === 2) {
      floor = 20;
      correctFloor = true;
    } else if (floorChoice === 3) {
      floor = 50;
      correctFloor = true;
    } else if (floorChoice === 4) {
      floor = 100;
      correctFloor = true;
    } else {
      console.log('\nIncorrect input!\n');
    }
  }

  return [statMulti, floor, saveStateNb];
}
