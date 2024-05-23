import Character from './Character';

export default function levelexp(xp :number) {
  let xpgain = Math.round(Math.random() * 50);
  if (xpgain < 15) {
    xpgain += 15;
  }
  console.log(`You won ${xpgain} xp!`);
  xp += xpgain;
  return xp;
}

export function levelup(level: number, char : Character) {
  console.log('You won 1 level.');
  level += 1;
  char.Strength = char.getSTR + Math.round(Math.random() * 5);
  char.MaxHP = char.getMaxHP + Math.round(Math.random() * 20);
  console.log(` ${char.getMaxHP} Hp`);
  console.log(` ${char.Strength} str`);
  return level;
}
