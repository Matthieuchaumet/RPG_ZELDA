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

  constructor(json: any) {
    this.Id = json.id;
    this.Name = json.name;
    this.MaxHP = json.hp;
    this.HP = json.hp;
    this.MP = json.mp;
    this.Strength = json.str;
    this.INT = json.int;
    this.DEF = json.def;
    this.RES = json.res;
    this.Speed = json.spd;
    this.Luck = json.luck;
    this.Race = json.race;
    this.Class = json.class;
    this.Rarity = json.rarity;
  }

  public get getName() : string {
    return this.Name;
  }

  public get getMaxHP() : number {
    return this.MaxHP;
  }

  public get getHP() : number {
    return this.HP;
  }

  public get getSTR() : number {
    return this.Strength;
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
}
