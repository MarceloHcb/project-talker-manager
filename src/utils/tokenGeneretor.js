function generateRandomToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 16; i += 1) {      
      const randomIndex = Math.floor(Math.random() * characters.length); 
      const char = characters.charAt(randomIndex);
      token += char;
    }
    return token;
  }

  module.exports = generateRandomToken;