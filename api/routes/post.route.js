const express = require('express');
const { verifyToken } = require('../middleware/verifyToken.js');
const {
  validatePostData,
  logRequest,
} = require('../middleware/validatePost.js');
const {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} = require('../controllers/post.controller.js');

const router = express.Router();

// Rotas públicas (não precisam de autenticação)
router.get('/', getPosts);
router.get('/:id', getPost);

// Rotas protegidas (precisam de autenticação)
router.post(
  '/',
  logRequest, // Log da requisição
  verifyToken, // Verificar token
  validatePostData, // Validar dados
  addPost // Criar post
);

router.put('/:id', logRequest, verifyToken, validatePostData, updatePost);

router.delete('/:id', logRequest, verifyToken, deletePost);

module.exports = router;
