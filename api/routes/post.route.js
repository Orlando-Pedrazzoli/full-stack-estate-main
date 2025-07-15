import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { validatePostData, logRequest } from '../middleware/validatePost.js';
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '../controllers/post.controller.js';

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

export default router;
