import * as readlineSync from 'readline-sync';
import Character from './Character';
import * as classes from './classes.json';

export default function alignmentChar(char: Character) {
  const indexClass = char.getClass;
  const alignmentC = classes[indexClass].alignment;
  return alignmentC;
}

export function skill(
  char : Character,
  monster: Character,
  alignment : string,
  level : number,
  limit : number,
) {
  while (limit < 1) {
    if (level >= 2) {
      const skillAnswer = readlineSync.keyInYN('Do you want to use your skill ?');
      if (skillAnswer && alignment === 'good') {
        console.log('Skill activate : Hylia Salvation !!!!');
        const recup = char.getMaxHP - char.getHP;
        char.HP = char.getMaxHP;
        console.log(`you recup ${recup} hp`);
      } else if (!skillAnswer) {
        break;
      } else if (skillAnswer && alignment === 'evil') {
        console.log('Skill activate : Ganon Desolation !!!!');
        const power = char.getSTR * 3;
        console.log(power, 'power');
        monster.dealDMG(power);
        console.log(`Dealt ${power} damage to ${monster.Name}`);
      }
    } else {
      limit += 1;
    } limit += 1;
  } return limit;
}
