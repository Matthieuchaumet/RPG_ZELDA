export default class Character {
  Id: number;

  Name: string;

  MaxHP: number;

  HP: number;

  MP: number;

  Strength: number;

  INT: number;

  DEF: number;

  RES: number;

  Speed: number;

  Luck: number;

  Race: number;

  Class: number;

  Rarity: number;

  Coins: number;

  constructor(json: any, statMulti: number) {
    this.Id = json.id;
    this.Name = json.name;
    this.MaxHP = json.hp * statMulti;
    this.HP = json.hp * statMulti;
    this.MP = json.mp * statMulti;
    this.Strength = json.str * statMulti;
    this.INT = json.int * statMulti;
    this.DEF = json.def * statMulti;
    this.RES = json.res * statMulti;
    this.Speed = json.spd * statMulti;
    this.Luck = json.luck * statMulti;
    this.Race = json.race;
    this.Class = json.class;
    this.Rarity = json.rarity;
    this.Coins = 0;
  }

  public get getName() : string {
    return this.Name;
  }

  public set setName(name: string) {
    this.Name = name;
  }

  public get getMaxHP() : number {
    return this.MaxHP;
  }

  public set setMaxHp(maxHp : number) {
    this.MaxHP = maxHp;
  }

  public get getHP() : number {
    return this.HP;
  }

  public get getSTR() : number {
    return this.Strength;
  }

  public set setSTR(str : number) {
    this.MaxHP = str;
  }

  public get getINT() : number {
    return this.INT;
  }

  public get getRace() : number {
    return this.Race;
  }

  public get getClass() : number {
    return this.Class;
  }

  public dealDMG(dmg: number) {
    this.HP -= dmg;
  }

  public heal() {
    this.HP += (this.MaxHP / 2);
    if (this.HP > this.MaxHP) {
      this.HP = this.MaxHP;
    }
  }

  public gainCoins(coins: number) {
    this.Coins += coins;
  }
}
