const express = require('express');
const { readTalkerData, readTalkerDatailData, PostLoginTalker, PostNewTalker,
   updateTalker, deleteTalker, searchTalker, patchTalker } = require('./utils/fsUtils');
const { emailValidation, passwordValidation, tokenValidator, nameValidation, ageValidation,
  talkValidation, idValidation, intRateValidator, dateValidator, 
  termsValidator, rateInterValidation,
  rateUndefinedValitation } = require('./utils/validator');
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

app.get('/talker/search', tokenValidator,
 intRateValidator, dateValidator, termsValidator, async (req, res) => {
  const searchTerm = req.query.q;
  const rateTerm = req.query.rate;
  const dateTerm = req.query.date;  
  try {
    const talkersArr = await searchTalker(searchTerm, rateTerm, dateTerm);
    return res.status(200).json(talkersArr);
  } catch (err) {   
    return res.status(500).json({ error: err });
  }
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

app.delete('/talker/:id', tokenValidator, async (req, res) => {
  const { id } = req.params;
  await deleteTalker(id);
  return res.status(204).end();
});

app.patch('/talker/rate/:id', idValidation, tokenValidator, rateUndefinedValitation,
 rateInterValidation,
 async (req, res) => {
  try {
    const talkerId = req.params.id;
    const newRate = req.body.rate;    
    await patchTalker(newRate, talkerId);   
    return res.status(204).end();
  } catch (error) {   
    console.error('erro ao atualizar o rate ->', error);
    res.status(500).json({ error: 'erro ao atualizar o rate' });
  }
});
