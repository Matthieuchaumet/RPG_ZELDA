import * as readlineSync from 'readline-sync';
import displayCharacteristics, { strengthChar, weaknessChar } from './basic_characteristics';
import alignmentChar, { skill } from './basic_characteristics_2';
import Character from './Character';

enum CombatOption {
  Attack = '1',
  Skill = '2',
  Heal = '3',
  Protect = '4',
  CharacterInfo = '5',
  Escape = '6',
}

function betterCombatOptions(
  floor: number,
  plr: Character,
  monster: Character,
  level : number,
  xp : number,
  limit : number,
) {
  console.log(`=== ${floor} ===`);
  console.log(`\x1b[35666666666m${plr.getName}\x1b[0m(lvl ${level}):${plr.getHP}/${plr.getMaxHP}`);
  console.log(`${monster.getName}:${monster.getHP}/${monster.getMaxHP}`);
  console.log(`xp : ${xp} / 50`);
  console.log('-----');
  console.log(`Limit Break gauge: ${limit}`);
  console.log('-----');

  let correctAction = false;

  const plrWeak1 = weaknessChar(plr).weak1;
  const plrWeak2 = weaknessChar(plr).weak2;
  const plrStrengh1 = strengthChar(plr).strength1;
  const plrStrengh2 = strengthChar(plr).strength2;
  const enemyWeak1 = weaknessChar(monster).weak1;
  const enemyWeak2 = weaknessChar(monster).weak2;
  const enemyStrengh1 = strengthChar(monster).strength1;
  const enemyStrengh2 = strengthChar(monster).strength2;
  const plrAlignment = alignmentChar(plr);

  let protection = false;

  while (!correctAction) {
    let action: any = readlineSync.question(`Enter an action:${CombatOption.Attack}: Attack | ${CombatOption.Skill}: Skill | ${CombatOption.Heal}: Heal | ${CombatOption.Protect}: Protect | ${CombatOption.CharacterInfo}: Character | ${CombatOption.Escape}: Escape\n`);
    action = action.trim().toLowerCase();
    switch (action) {
      case CombatOption.Attack.toString().toLowerCase():
      case 'attack':
        if (plrStrengh2 !== '' && plrStrengh1.some((item) => enemyWeak1.includes(item)) && plrStrengh2.some((item: number) => enemyWeak2.includes(item))) {
          console.log('Crushing hit.');
          console.log(`\nDealt ${plr.getSTR * 4} damage to ${monster.getName}!\n`);
          monster.dealDMG(plr.getSTR * 4);
          correctAction = true;
        } else if (plrStrengh2 !== '' && (plrStrengh1.some((item) => enemyWeak1.includes(item)) || plrStrengh2.some((item: number) => enemyWeak2.includes(item)))) {
          console.log('Crushing hit.');
          console.log(`\nDealt ${plr.getSTR * 2} damage to ${monster.getName}!\n`);
          monster.dealDMG(plr.getSTR * 2);
          correctAction = true;
        } else {
          console.log(`\nDealt ${plr.getSTR} damage to ${monster.getName}!\n`);
          monster.dealDMG(plr.getSTR);
          correctAction = true;
        }
        break;

      case CombatOption.Skill.toString().toLowerCase():
      case 'skill':
        if (level >= 2) {
          console.log(limit);
          if (limit === 0) {
            limit = skill(plr, monster, plrAlignment, level, limit);
            console.log(limit);
            correctAction = true;
          } else {
            console.log('Skill not available');
          }
        } else if (level < 2) {
          console.log('Skill not available');
        }
        break;

      case CombatOption.Heal.toString().toLowerCase():
      case 'heal':
        console.log(`Healed ${plr.getMaxHP / 2} HP!`);
        plr.heal();
        correctAction = true;
        break;

      case CombatOption.Protect.toString().toLowerCase():
      case 'protect':
        protection = true;
        console.log(`${plr.getName} is protecting!`);
        correctAction = true;
        break;

      case CombatOption.CharacterInfo.toString().toLowerCase():
      case 'character':
        displayCharacteristics(monster);
        break;

      case CombatOption.Escape.toString().toLowerCase():
      case 'escape':
        console.log(`${plr.getName} has fled from the fight!`);
        process.exit(0);
        break;

      default:
        console.log('Invalid action! Please try again.');
        break;
    }
  }

  let dmgAfterProtectCalc: number = monster.getSTR;
  if (protection) {
    dmgAfterProtectCalc = monster.getSTR / 2;
  }

  if (enemyStrengh2 !== '' && enemyStrengh1.some((item) => plrWeak1.includes(item) && enemyStrengh2.some((item2: number) => plrWeak2.includes(item2)))) {
    plr.dealDMG(dmgAfterProtectCalc * 4);
    console.log('Crushing hit.');
    console.log(`${monster.getName} Dealt ${dmgAfterProtectCalc * 4} damage to ${plr.getName}!\n`);
  } else if (enemyStrengh2 !== '' && (enemyStrengh1.some((item) => plrWeak1.includes(item) || enemyStrengh2.some((item2: number) => plrWeak2.includes(item2))))) {
    plr.dealDMG(dmgAfterProtectCalc * 2);
    console.log('Crushing hit.');
    console.log(`${monster.getName} Dealt ${dmgAfterProtectCalc * 2} damage to ${plr.getName}!\n`);
  } else {
    plr.dealDMG(dmgAfterProtectCalc);
    console.log(`${monster.getName} Dealt ${dmgAfterProtectCalc} damage to ${plr.getName}!\n`);
  }
  return (limit);
}

export default betterCombatOptions;
