const connection = require('./connection');

const getAllTalkers = async () => {
    try {
const [result] = await connection
 .execute(`SELECT name, age, id, JSON_OBJECT('watchedAt',
  talk_watched_at, 'rate', talk_rate) AS talk
 FROM TalkerDB.talkers  ORDER BY id;`);      
        return result;  
    } catch (err) {
        console.log(err);
    }
};
module.exports = {
    getAllTalkers,
};