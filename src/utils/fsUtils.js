const fs = require('fs').promises;
const path = require('path');

const TALKER_DATA_PATH = '../talker.json';

const readTalkerData = async () => {
  try {
    const resolve = await fs.readFile(
      path.resolve(__dirname, TALKER_DATA_PATH),
    );
    const data = JSON.parse(resolve);
    return data;
  } catch (err) {
    console.log(err); 
  }
  return [];
};

const readTalkerDatailData = async (talkerId) => {
  try {
    const talker = await readTalkerData();
    const talkerDetail = talker.find(({ id }) => id === +talkerId);
    return talkerDetail;
  } catch (err) {
console.log(err);
  }
};

module.exports = { 
  readTalkerData,
  readTalkerDatailData,
 };
