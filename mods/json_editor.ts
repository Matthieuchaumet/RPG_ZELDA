import * as fs from 'fs';
import * as path from 'path';
import * as readlineSync from 'readline-sync';

interface JsonData {
  id: number;
  [key: string]: any;
}

function addJson(data: JsonData[], fullFilePath: string) {
  const newObj: JsonData = {
    id: -1,
  };

  const templateExample = data[0];

  for (const key in templateExample) {
    if (key !== 'id') {
      let value: any;
      while (value === undefined || value === '') {
        value = readlineSync.question(`Enter a value for ${key}\n:`);
      }
      newObj[key] = value;
    }
  }

  const maxId = data.reduce((max, obj) => (obj.id > max ? obj.id : max), 0);
  newObj.id = maxId + 1;

  data.push(newObj);

  fs.writeFileSync(fullFilePath, JSON.stringify(data, null, 2));
}

function modifyJson(data: JsonData[], fullFilePath: string) {
  let correctId = false;
  let correctProperty = false;
  let correctVal = false;
  let objIndex = 0;
  let objProperty = '';
  let newValue = 0;

  while (!correctId) {
    let id: any = readlineSync.question('\nEnter the id of the object you want to modify\n:');
    id = Number(id);

    const index = data.findIndex((obj: { id: number; }) => obj.id === id);

    if (index === -1) {
      console.log(`Object with id ${id} does not exist in the JSON file.`);
    } else {
      objIndex = index;
      correctId = true;
    }
  }

  const obj = data[objIndex];
  console.log('\nCurrent object:', obj);

  while (!correctProperty) {
    const property: string = readlineSync.question('\nEnter the name of the property you want to modify\n:');

    if (!(property in obj)) {
      console.log(`Property ${property} does not exist.`);
    } else if (property === 'id' || property === 'name') {
      console.log(`You can't change the value of the ${property}`);
    } else {
      objProperty = property;
      correctProperty = true;
    }
  }

  console.log('\nCurrent property:\n', objProperty, obj[objProperty]);

  while (!correctVal) {
    const newValueStr = readlineSync.question(`\nEnter the new value for ${objProperty}\n:`);
    newValue = Number(newValueStr);

    if (Number.isNaN(newValue)) {
      console.log('Invalid input. Please enter a number.');
    } else {
      correctVal = true;
    }
  }

  obj[objProperty] = newValue;

  fs.writeFileSync(fullFilePath, JSON.stringify(data, null, 2));
}

function deleteJson(data: JsonData[], fullFilePath: string) {
  let correctId = false;
  let objIndex = -1;

  while (!correctId) {
    let id: any = readlineSync.question('\nEnter the id of the object you want to delete\n:');
    id = Number(id);

    objIndex = data.findIndex((obj: { id: number; }) => obj.id === id);

    if (objIndex === -1) {
      console.log(`Object with id ${id} does not exist in the JSON file.`);
    } else {
      console.log(`Deleted the object with id ${id}.`);
      correctId = true;
    }
  }

  data.splice(objIndex, 1);

  fs.writeFileSync(fullFilePath, JSON.stringify(data, null, 2));
}

export default function jsonEditor() {
  let correctOption = false;
  let correctAction = false;
  let filePath: string = '';

  while (!correctOption) {
    let option: any = readlineSync.question('1: player\n2: enemies\n3: bosses\n4: classes\n5: races\n6: traps\n:');
    option = Number(option);
    if (option === 1) {
      filePath = '/player.json';
      correctOption = true;
    } else if (option === 2) {
      filePath = '/enemies.json';
      correctOption = true;
    } else if (option === 3) {
      filePath = '/bosses.json';
      correctOption = true;
    } else if (option === 4) {
      filePath = '/classes.json';
      correctOption = true;
    } else if (option === 5) {
      filePath = '/races.json';
      correctOption = true;
    } else if (option === 6) {
      filePath = '/traps.json';
      correctOption = true;
    } else {
      console.log('\nIncorrect input!\n');
    }
  }

  const fullFilePath = path.join(__dirname, filePath);
  const data: JsonData[] = JSON.parse(fs.readFileSync(fullFilePath, 'utf-8'));
  console.log('\nCurrent data:', data);

  while (!correctAction) {
    let action: any = readlineSync.question('1: add\n2: modify\n3: delete\n:');
    action = Number(action);
    if (action === 1) {
      addJson(data, fullFilePath);
      correctAction = true;
    } else if (action === 2) {
      modifyJson(data, fullFilePath);
      correctAction = true;
    } else if (action === 3) {
      deleteJson(data, fullFilePath);
      correctAction = true;
    }
  }
}
