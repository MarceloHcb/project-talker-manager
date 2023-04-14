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

const tokenGenerator = (email, password) => {
  const combinedString = email.toString() + password.toString();
  const charArray = Array.from(combinedString);
  charArray.sort(() => Math.random() - 0.5);
  for (let i = charArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
  }
  const randomToken = charArray.slice(0, 16).join('');
  return randomToken;
};

const PostTalker = (email, password) => {  
  const randomToken = tokenGenerator(email, password);
  return randomToken;
};

module.exports = { 
  readTalkerData,
  readTalkerDatailData,
  PostTalker,
 };
