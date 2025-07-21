const jwt = require('jsonwebtoken');

const shouldBeLoggedIn = async (req, res) => {
  console.log('🔐 shouldBeLoggedIn chamado');
  console.log('userId do token:', req.userId);

  res.status(200).json({
    message: 'You are Authenticated',
    userId: req.userId,
  });
};

const shouldBeAdmin = async (req, res) => {
  console.log('👑 shouldBeAdmin chamado');

  const token = req.cookies.token;

  if (!token) {
    console.log('❌ Token não encontrado');
    return res.status(401).json({ message: 'Not Authenticated!' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      console.log('❌ Token inválido:', err.message);
      return res.status(403).json({ message: 'Token is not Valid!' });
    }

    console.log('✅ Token válido, payload:', payload);

    if (!payload.isAdmin) {
      console.log('❌ Usuário não é admin');
      return res.status(403).json({ message: 'Not authorized!' });
    }

    console.log('✅ Usuário é admin');
    res.status(200).json({ message: 'You are Authenticated' });
  });
};

module.exports = { shouldBeLoggedIn, shouldBeAdmin };
