const { readTalkerData } = require('./fsUtils');

const passwordValidation = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
      return res.status(400).send({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
      return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    return next();
  };
  
  const emailValidation = (req, res, next) => {
    const { email } = req.body;    
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (email === undefined) {
     return res.status(400).send({ message: 'O campo "email" é obrigatório' });
    }
   if (!regex.test(email)) {
      return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    return next();
  };

  const notNull = (variable, stat, msg, res) => {
    if (!variable || variable === '' || variable === undefined) {
      return res.status(stat).json({ message: `${msg}` });
    }
  };
  const notNullRate = (variable, stat, msg, res) => {
    if (variable === undefined) {
      return res.status(stat).json({ message: `${msg}` });
    }
  };

  const tokenValidator = (req, res, next) => {
    const token = req.headers.authorization;
    notNull(token, 401, 'Token não encontrado', res);   
    if (token.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    return next();
  }; 

  const nameValidation = (req, res, next) => {
    const { name } = req.body;
    notNull(name, 400, 'O campo "name" é obrigatório', res);    
    if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    return next();
  };

  const ageValidation = (req, res, next) => {
    const { age } = req.body;
    notNull(age, 400, 'O campo "age" é obrigatório', res);   
    if (typeof age !== 'number' || !Number.isInteger(age) || age < 18) {
      return res.status(400)
      .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
    }
    return next();
  };

  const talkValidation = (req, res, next) => {
    const { talk } = req.body;    
    notNull(talk, 400, 'O campo "talk" é obrigatório', res);
    notNull(talk.watchedAt, 400, 'O campo "watchedAt" é obrigatório', res);  
    const dataRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!dataRegex.test(talk.watchedAt)) {
      return res.status(400).json({ message:
         'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    } 
    notNullRate(talk.rate, 400, 'O campo "rate" é obrigatório', res);
   
    if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
      return res.status(400).json({ message: 
        'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }    
    next();
  };

  const idValidation = async (req, res, next) => {
    const { id } = req.params;
    const allTalkers = await readTalkerData();
    const validID = allTalkers.some((talker) => Number(talker.id) === Number(id));    
    if (!validID) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return next();
  };

  module.exports = {
    passwordValidation,
    emailValidation,
    tokenValidator,
    nameValidation,
    ageValidation,
    talkValidation,
    idValidation,
  };