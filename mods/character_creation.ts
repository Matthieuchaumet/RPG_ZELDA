import * as readlineSync from 'readline-sync';
import * as races from './races.json';
import * as classes from './classes.json';
import Create from './CreateCharacter';

export default function createCharacter() {
  console.log('====Welcome at Character creation====');
  const heroName = readlineSync.question('Chose the name :\n');
  console.log('Chose your Race:');
  const raceName = races.map((race) => race.name);
  const index1 = readlineSync.keyInSelect(raceName);
  console.log(`You chose ${races[index1].name}`);
  console.log('Chose your Class:');
  const className = classes.map((clas) => clas.name);
  const index2 = readlineSync.keyInSelect(className);
  console.log(`You chose ${classes[index2].name}`);
  console.log('Number of hp ?');
  const hp = ['10', '20', '40', '60', '80', '100', '120'];
  const choseenHP = readlineSync.keyInSelect(hp);
  const chosenstr = parseInt(readlineSync.question('number of str : \n'), 10);
  const characterCreated = new Create(
    heroName,
    parseInt(hp[choseenHP], 10),
    chosenstr,
    index2,
    index1,
  );
  return (characterCreated);
}
