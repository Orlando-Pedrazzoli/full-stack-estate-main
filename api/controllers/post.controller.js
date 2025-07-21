const prisma = require('../lib/prisma.js');
const jwt = require('jsonwebtoken');

const getPosts = async (req, res) => {
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

const getPost = async (req, res) => {
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

const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  console.log('📝 addPost chamado por usuário:', tokenUserId);
  console.log('📦 Dados recebidos:', JSON.stringify(body, null, 2));

  try {
    // Validação básica dos dados
    if (!body.postData) {
      console.error('❌ postData não fornecido');
      return res.status(400).json({
        message: 'Dados do post são obrigatórios',
        error: 'postData field is required',
      });
    }

    if (!body.postDetail) {
      console.error('❌ postDetail não fornecido');
      return res.status(400).json({
        message: 'Detalhes do post são obrigatórios',
        error: 'postDetail field is required',
      });
    }

    // Validação dos campos obrigatórios do postData
    const requiredFields = [
      'title',
      'price',
      'address',
      'city',
      'bedroom',
      'bathroom',
      'latitude',
      'longitude',
      'type',
      'property',
    ];
    const missingFields = requiredFields.filter(
      field => !body.postData[field] && body.postData[field] !== 0
    );

    if (missingFields.length > 0) {
      console.error('❌ Campos obrigatórios faltando:', missingFields);
      return res.status(400).json({
        message: 'Campos obrigatórios faltando',
        error: `Missing required fields: ${missingFields.join(', ')}`,
        missingFields,
      });
    }

    // Validação dos campos do postDetail
    if (!body.postDetail.desc) {
      console.error('❌ Descrição é obrigatória');
      return res.status(400).json({
        message: 'Descrição é obrigatória',
        error: 'Description is required',
      });
    }

    // Validação de tipos de dados
    const numericFields = [
      'price',
      'bedroom',
      'bathroom',
      'latitude',
      'longitude',
    ];
    for (const field of numericFields) {
      if (body.postData[field] && isNaN(Number(body.postData[field]))) {
        console.error(`❌ Campo ${field} deve ser numérico`);
        return res.status(400).json({
          message: `Campo ${field} deve ser numérico`,
          error: `Field ${field} must be numeric`,
        });
      }
    }

    // Verificar se o usuário existe
    const userExists = await prisma.user.findUnique({
      where: { id: tokenUserId },
    });

    if (!userExists) {
      console.error('❌ Usuário não encontrado:', tokenUserId);
      return res.status(404).json({
        message: 'Usuário não encontrado',
        error: 'User not found',
      });
    }

    console.log('✅ Validações passaram, criando post...');

    // Preparar dados para inserção
    const postDataToInsert = {
      ...body.postData,
      userId: tokenUserId,
      // Garantir que os campos numéricos sejam do tipo correto
      price: parseInt(body.postData.price),
      bedroom: parseInt(body.postData.bedroom),
      bathroom: parseInt(body.postData.bathroom),
      // MongoDB/Prisma espera latitude e longitude como String
      latitude: String(body.postData.latitude),
      longitude: String(body.postData.longitude),
    };

    const postDetailToInsert = {
      ...body.postDetail,
      // Garantir que campos opcionais sejam tratados corretamente
      utilities: body.postDetail.utilities || null,
      pet: body.postDetail.pet || null,
      income: body.postDetail.income || null,
      size: body.postDetail.size ? parseInt(body.postDetail.size) : null,
    };

    console.log('📦 Dados preparados para inserção:');
    console.log('postData:', JSON.stringify(postDataToInsert, null, 2));
    console.log('postDetail:', JSON.stringify(postDetailToInsert, null, 2));

    const newPost = await prisma.post.create({
      data: {
        ...postDataToInsert,
        postDetail: {
          create: postDetailToInsert,
        },
      },
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

    console.log('✅ Post criado com sucesso:', newPost.id);
    res.status(201).json({
      message: 'Post criado com sucesso',
      post: newPost,
    });
  } catch (err) {
    console.error('💥 Erro em addPost:');
    console.error('Tipo do erro:', err.constructor.name);
    console.error('Mensagem:', err.message);
    console.error('Stack:', err.stack);

    // Tratamento específico para erros do Prisma
    if (err.code) {
      console.error('Código do erro Prisma:', err.code);
      console.error('Meta:', err.meta);

      switch (err.code) {
        case 'P2002':
          return res.status(400).json({
            message: 'Dados duplicados',
            error: 'Duplicate data constraint violation',
            details: err.meta,
          });
        case 'P2003':
          return res.status(400).json({
            message: 'Erro de chave estrangeira',
            error: 'Foreign key constraint failed',
            details: err.meta,
          });
        case 'P2025':
          return res.status(404).json({
            message: 'Registro não encontrado',
            error: 'Record not found',
            details: err.meta,
          });
        default:
          return res.status(500).json({
            message: 'Erro do banco de dados',
            error: err.message,
            code: err.code,
          });
      }
    }

    // Erro de validação do Prisma
    if (err.name === 'PrismaClientValidationError') {
      console.error('❌ Erro de validação do Prisma');
      return res.status(400).json({
        message: 'Dados inválidos fornecidos',
        error: 'Invalid data provided',
        details: err.message,
      });
    }

    // Erro de conexão
    if (err.message.includes('connect') || err.message.includes('connection')) {
      console.error('🔌 Problema de conexão com o banco de dados');
      return res.status(500).json({
        message: 'Erro de conexão com o banco de dados',
        error: 'Database connection error',
      });
    }

    res.status(500).json({
      message: 'Failed to create post',
      error:
        process.env.NODE_ENV === 'development'
          ? err.message
          : 'Internal server error',
    });
  }
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const body = req.body;

  console.log(
    '📝 updatePost chamado para ID:',
    id,
    'por usuário:',
    tokenUserId
  );

  try {
    // Verificar se o post existe e se o usuário é o dono
    const existingPost = await prisma.post.findUnique({
      where: { id },
      include: { postDetail: true },
    });

    if (!existingPost) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    if (existingPost.userId !== tokenUserId) {
      return res.status(403).json({ message: 'Não autorizado!' });
    }

    // Atualizar o post e seus detalhes
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        ...body.postData,
        postDetail: {
          update: body.postDetail,
        },
      },
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

    console.log('✅ Post atualizado com sucesso:', id);
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error('💥 Erro em updatePost:', err);
    res.status(500).json({ message: 'Failed to update post' });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: 'Not Authorized!' });
    }

    // Deletar post (o postDetail será deletado automaticamente devido ao cascade)
    await prisma.post.delete({
      where: { id },
    });

    console.log('✅ Post deletado com sucesso:', id);
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    console.error('💥 Erro em deletePost:', err);
    res.status(500).json({ message: 'Failed to delete post' });
  }
};

module.exports = {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
};
