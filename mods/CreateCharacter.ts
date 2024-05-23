export default class CreateCharacter {
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

  constructor(Name: string, hp : number, strentgh : number, Class : number, Race : number) {
    this.Id = -1;
    this.Name = Name;
    this.MaxHP = hp;
    this.HP = hp;
    this.MP = 0;
    this.INT = 0;
    this.DEF = 0;
    this.RES = 0;
    this.Speed = 0;
    this.Luck = 0;
    this.Strength = strentgh;
    this.Class = Class;
    this.Race = Race;
    this.Rarity = -1;
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
