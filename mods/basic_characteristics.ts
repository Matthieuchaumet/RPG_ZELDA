import * as race from './races.json';
import * as classes from './classes.json';
import Character from './Character';

export default function displayCharacteristics(char : Character) {
  const indexClass = char.getClass;
  const indexRace = char.getRace;

  console.log(`Name:${char.getName}`);
  console.log(`Str: ${char.getSTR}  Magic : ${char.INT} `);
  console.log(`Hp: ${char.getMaxHP}`);
  console.log(`Mp : ${char.MP}`);
  console.log(`Def: ${char.DEF}  Res : ${char.RES} `);
  console.log(`Luck: ${char.getSTR}  Magic : ${char.INT} `);
  console.log(`Alignement: ${classes[indexClass - 1].alignment}`);
  console.log(`Race: ${race[indexRace - 1].name}`);
  console.log(`Class : ${classes[indexClass - 1].name}`);
}

export function weaknessChar(char : Character) {
  const indexClass = char.getClass;
  const indexRace = char.getRace;
  const weak1 = classes[indexClass - 1].weaknesses;
  const weak2 = race[indexRace - 1].weakness;
  return { weak1, weak2 };
}

export function strengthChar(char: Character) {
  const indexClass = char.getClass;
  const indexRace = char.getRace;
  const strength1 = classes[indexClass - 1].strengths;
  const strength2 = race[indexRace - 1].strength;
  return { strength1, strength2 };
}
