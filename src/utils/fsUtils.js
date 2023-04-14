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

module.exports = { readTalkerData };
