import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';

export const getPosts = async (req, res) => {
  const query = req.query;

  console.log('📝 getPosts chamado com query:', query);

  try {
    // Teste de conexão com o banco
    console.log('🔍 Testando conexão com o banco...');

    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });

    console.log(`✅ Posts encontrados: ${posts.length}`);
    res.status(200).json(posts);
  } catch (err) {
    console.error('💥 Erro em getPosts:');
    console.error('Tipo do erro:', err.constructor.name);
    console.error('Mensagem:', err.message);
    console.error('Stack:', err.stack);

    // Verificar se é erro do Prisma
    if (err.code) {
      console.error('Código do erro Prisma:', err.code);
    }

    // Verificar se é erro de conexão
    if (err.message.includes('connect') || err.message.includes('connection')) {
      console.error('🔌 Problema de conexão com o banco de dados');
      return res.status(500).json({
        message: 'Erro de conexão com o banco de dados',
        details: err.message,
      });
    }

    res.status(500).json({
      message: 'Failed to get posts',
      error:
        process.env.NODE_ENV === 'development' ? err.message : 'Erro interno',
    });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  console.log('📝 getPost chamado para ID:', id);

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    if (!post) {
      console.log('❌ Post não encontrado');
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });
          return res
            .status(200)
            .json({ ...post, isSaved: saved ? true : false });
        }
        res.status(200).json({ ...post, isSaved: false });
      });
    } else {
      res.status(200).json({ ...post, isSaved: false });
    }
  } catch (err) {
    console.error('💥 Erro em getPost:', err);
    res.status(500).json({ message: 'Failed to get post' });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  console.log('📝 addPost chamado por usuário:', tokenUserId);

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });

    console.log('✅ Post criado com sucesso:', newPost.id);
    res.status(200).json(newPost);
  } catch (err) {
    console.error('💥 Erro em addPost:', err);
    res.status(500).json({ message: 'Failed to create post' });
  }
};

export const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to update posts' });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: 'Not Authorized!' });
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to delete post' });
  }
};
