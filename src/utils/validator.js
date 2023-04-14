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

  module.exports = {
    passwordValidation,
    emailValidation,
  };