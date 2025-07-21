// api/middleware/validatePost.js
const validatePostData = (req, res, next) => {
  const { postData, postDetail } = req.body;

  console.log('🔍 Validando dados do post...');

  // Verificar se os dados básicos existem
  if (!postData || !postDetail) {
    console.error('❌ Estrutura de dados inválida');
    return res.status(400).json({
      message: 'Estrutura de dados inválida',
      error: 'postData and postDetail are required',
      received: {
        hasPostData: !!postData,
        hasPostDetail: !!postDetail,
      },
    });
  }

  // Campos obrigatórios do postData
  const requiredPostFields = {
    title: 'string',
    price: 'number',
    address: 'string',
    city: 'string',
    bedroom: 'number',
    bathroom: 'number',
    latitude: 'number',
    longitude: 'number',
    type: 'string',
    property: 'string',
  };

  // Validar campos obrigatórios
  const errors = [];

  for (const [field, expectedType] of Object.entries(requiredPostFields)) {
    const value = postData[field];

    if (value === undefined || value === null || value === '') {
      errors.push(`Campo '${field}' é obrigatório`);
      continue;
    }

    // Validar tipo de dados
    if (expectedType === 'number') {
      if (isNaN(Number(value))) {
        errors.push(`Campo '${field}' deve ser um número válido`);
      }
    } else if (expectedType === 'string') {
      if (typeof value !== 'string' || value.trim() === '') {
        errors.push(`Campo '${field}' deve ser uma string não vazia`);
      }
    }
  }

  // Validar campos específicos
  if (postData.type && !['buy', 'rent'].includes(postData.type)) {
    errors.push("Campo 'type' deve ser 'buy' ou 'rent'");
  }

  if (
    postData.property &&
    !['apartment', 'house', 'condo', 'land'].includes(postData.property)
  ) {
    errors.push(
      "Campo 'property' deve ser 'apartment', 'house', 'condo' ou 'land'"
    );
  }

  // Validar ranges numéricos
  if (postData.price && Number(postData.price) <= 0) {
    errors.push('Preço deve ser maior que zero');
  }

  if (postData.bedroom && Number(postData.bedroom) < 0) {
    errors.push('Número de quartos não pode ser negativo');
  }

  if (postData.bathroom && Number(postData.bathroom) < 0) {
    errors.push('Número de banheiros não pode ser negativo');
  }

  // Validar coordenadas
  const lat = Number(postData.latitude);
  const lng = Number(postData.longitude);

  if (lat < -90 || lat > 90) {
    errors.push('Latitude deve estar entre -90 e 90');
  }

  if (lng < -180 || lng > 180) {
    errors.push('Longitude deve estar entre -180 e 180');
  }

  // Validar postDetail
  if (
    !postDetail.desc ||
    typeof postDetail.desc !== 'string' ||
    postDetail.desc.trim() === ''
  ) {
    errors.push('Descrição é obrigatória');
  }

  if (postDetail.size && isNaN(Number(postDetail.size))) {
    errors.push('Tamanho deve ser um número válido');
  }

  // Se houver erros, retornar
  if (errors.length > 0) {
    console.error('❌ Erros de validação:', errors);
    return res.status(400).json({
      message: 'Dados inválidos',
      errors: errors,
      receivedData: {
        postData: Object.keys(postData),
        postDetail: Object.keys(postDetail),
      },
    });
  }

  // Sanitizar e normalizar dados
  req.body.postData = {
    ...postData,
    title: postData.title.trim(),
    address: postData.address.trim(),
    city: postData.city.trim(),
    price: parseInt(postData.price),
    bedroom: parseInt(postData.bedroom),
    bathroom: parseInt(postData.bathroom),
    // Para MongoDB, latitude e longitude devem ser strings
    latitude: String(postData.latitude),
    longitude: String(postData.longitude),
    type: postData.type.toLowerCase(),
    property: postData.property.toLowerCase(),
  };

  req.body.postDetail = {
    ...postDetail,
    desc: postDetail.desc.trim(),
    utilities: postDetail.utilities || null,
    pet: postDetail.pet || null,
    income: postDetail.income || null,
    size: postDetail.size ? parseInt(postDetail.size) : null,
  };

  console.log('✅ Validação concluída com sucesso');
  next();
};

// Middleware para log de requests
const logRequest = (req, res, next) => {
  console.log('\n' + '='.repeat(50));
  console.log(`📥 ${req.method} ${req.originalUrl}`);
  console.log('🕐 Timestamp:', new Date().toISOString());
  console.log('🆔 User ID:', req.userId);
  console.log('📦 Body keys:', Object.keys(req.body));
  console.log('🔍 Query:', req.query);
  console.log('🍪 Cookies:', Object.keys(req.cookies));
  console.log('='.repeat(50) + '\n');

  next();
};

module.exports = { validatePostData, logRequest };
