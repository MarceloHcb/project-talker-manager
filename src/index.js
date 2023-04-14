const express = require('express');
const { readTalkerData, readTalkerDatailData, PostTalker } = require('./utils/fsUtils');

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

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = PostTalker(email, password);
  return res.status(200).json({ token: result });
});
