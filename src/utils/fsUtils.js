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

const PostLoginTalker = (email, password) => {
  const randomToken = tokenGenerator(email, password);
  return randomToken;
};

const PostNewTalker = async (name, age, talk) => {
  try {
    const oldTalkes = await readTalkerData();
    const newTalker = {
      name,
      age,
      id: oldTalkes[oldTalkes.length - 1].id + 1,
      talk,
    };
    const oldWithNewTalkers = JSON.stringify([...oldTalkes, newTalker]);
    await fs.writeFile(
      path.resolve(__dirname, TALKER_DATA_PATH),
      oldWithNewTalkers,
    );
    return newTalker;
  } catch (err) {
    console.log(err);
  }
};
const updateTalker = async (id, name, age, talk) => {
  try {
    const allTalkers = await readTalkerData();
    const talkerToUpdate = allTalkers.filter((tlk) => Number(tlk.id) !== Number(id));
    const newTalker = {
      name,
      age,
      id: Number(id),
      talk,
    };
    const newTalkerList = JSON.stringify([...talkerToUpdate, newTalker]);
    await fs.writeFile(
      path.resolve(__dirname, TALKER_DATA_PATH),
      newTalkerList,
    );
    return newTalker;
  } catch (err) {
    console.log(err);
  }
};

const deleteTalker = async (id) => {
  const allTalkers = await readTalkerData();
  const newTalkerList = JSON.stringify(
    allTalkers.filter((talker) => talker.id !== Number(id)),
  );
  try {
    await fs.writeFile(
      path.resolve(__dirname, TALKER_DATA_PATH),
      newTalkerList,
    );
    return false;
  } catch (err) {
    console.log(err);
  }
};

const searchTermFilter = (talker, searchTerm) => !searchTerm || talker.name.includes(searchTerm);

const rateTermFilter = (talker, rateTerm) => !rateTerm || talker.talk.rate === Number(rateTerm);

const dateTermFilter = (talker, dateTerm) => !dateTerm || talker.talk.watchedAt === dateTerm;

const searchTalker = async (searchTerm, rateTerm, dateTerm) => {
  const allTalkers = await readTalkerData();
  const filteredTalkers = allTalkers.filter((talker) => {
    const search = searchTermFilter(talker, searchTerm);
    const rate = rateTermFilter(talker, rateTerm);
    const date = dateTermFilter(talker, dateTerm);
    return search && rate && date;
  });

  return filteredTalkers;
};

const patchTalker = async (newRate, talkerId) => {
  const allTalkers = await readTalkerData();
  const talkerToUpdate = allTalkers.find(({ id }) => id === Number(talkerId));
  const talkersWithout = allTalkers.filter(({ id }) => id !== Number(talkerId));
  const newTalker = {
   ...talkerToUpdate,
   talk: {
    ...talkerToUpdate.talk,
    rate: newRate,
   },
  };
  const newTalkerList = JSON.stringify([...talkersWithout, newTalker]);
  await fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), newTalkerList);
};

module.exports = {
  readTalkerData,
  readTalkerDatailData,
  PostLoginTalker,
  PostNewTalker,
  updateTalker,
  deleteTalker,  
  searchTalker,
  patchTalker,
};
