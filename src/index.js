const express = require('express');
const { readTalkerData, readTalkerDatailData, PostLoginTalker,
   PostNewTalker, updateTalker } = require('./utils/fsUtils');
const { emailValidation, passwordValidation, tokenValidator,
   nameValidation, ageValidation, talkValidation, idValidation } = require('./utils/validator');
// const generateRandomToken = require('./utils/tokenGeneretor');
const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const data = await readTalkerData();
  return res.status(200).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params; 
  const data = await readTalkerDatailData(id);
  if (data) {
    return res.status(200).json(data);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });  
});

app.post('/login', emailValidation, passwordValidation, async (req, res) => {
  const { email, password } = req.body;  
  const result = PostLoginTalker(email, password);
  return res.status(200).json({ token: result });
});

app.post('/talker', tokenValidator, nameValidation,
 ageValidation, talkValidation, async (req, res) => {  
  const { name, age, talk } = req.body;  
  const result = await PostNewTalker(name, age, talk); 
  return res.status(201).json(result);
});

app.put('/talker/:id', idValidation, nameValidation,
ageValidation, talkValidation, tokenValidator, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
 const talker = await updateTalker(id, name, age, talk);
 return res.status(200).json(talker);
});
