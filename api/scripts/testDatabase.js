// api/scripts/testDatabase.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testDatabase() {
  console.log('🔍 Iniciando teste de conexão com o banco de dados...\n');

  try {
    // Teste 1: Conexão básica
    console.log('1️⃣ Testando conexão básica...');
    await prisma.$connect();
    console.log('✅ Conexão com o banco estabelecida com sucesso!\n');

    // Teste 2: Verificar usuários
    console.log('2️⃣ Testando consulta de usuários...');
    const userCount = await prisma.user.count();
    console.log(`✅ Total de usuários no banco: ${userCount}\n`);

    // Teste 3: Verificar posts
    console.log('3️⃣ Testando consulta de posts...');
    const postCount = await prisma.post.count();
    console.log(`✅ Total de posts no banco: ${postCount}\n`);

    // Teste 4: Verificar estrutura das tabelas
    console.log('4️⃣ Testando estrutura das tabelas...');

    // Buscar um usuário exemplo (se existir)
    const sampleUser = await prisma.user.findFirst();
    if (sampleUser) {
      console.log('✅ Exemplo de usuário encontrado:');
      console.log('   ID:', sampleUser.id);
      console.log('   Username:', sampleUser.username);
      console.log('   Email:', sampleUser.email);
      console.log('   Created:', sampleUser.createdAt);
    } else {
      console.log('ℹ️ Nenhum usuário encontrado no banco');
    }

    // Buscar um post exemplo (se existir)
    const samplePost = await prisma.post.findFirst({
      include: {
        postDetail: true,
        user: true,
      },
    });

    if (samplePost) {
      console.log('✅ Exemplo de post encontrado:');
      console.log('   ID:', samplePost.id);
      console.log('   Title:', samplePost.title);
      console.log('   Price:', samplePost.price);
      console.log('   User:', samplePost.user.username);
      console.log('   Has Detail:', !!samplePost.postDetail);
    } else {
      console.log('ℹ️ Nenhum post encontrado no banco');
    }

    console.log('\n5️⃣ Testando inserção de dados...');

    // Teste 5: Criar um usuário de teste (se não existir)
    const testUserEmail = 'test-user-db@example.com';
    let testUser = await prisma.user.findUnique({
      where: { email: testUserEmail },
    });

    if (!testUser) {
      console.log('🔨 Criando usuário de teste...');
      testUser = await prisma.user.create({
        data: {
          username: 'test-user-db',
          email: testUserEmail,
          password: 'hashed-password-test',
        },
      });
      console.log('✅ Usuário de teste criado:', testUser.id);
    } else {
      console.log('✅ Usuário de teste já existe:', testUser.id);
    }

    // Teste 6: Tentar criar um post de teste
    console.log('\n6️⃣ Testando criação de post...');

    const testPostData = {
      title: 'Teste de Post - DB',
      price: 100000,
      address: 'Rua de Teste, 123',
      city: 'São Paulo',
      bedroom: 2,
      bathroom: 1,
      latitude: '-23.5505', // String para MongoDB
      longitude: '-46.6333', // String para MongoDB
      type: 'rent',
      property: 'apartment',
      userId: testUser.id,
    };

    const testPostDetail = {
      desc: 'Esta é uma descrição de teste para verificar se a criação de posts está funcionando.',
      utilities: 'Included',
      pet: 'Allowed',
      income: 'No requirement',
      size: 80,
    };

    const testPost = await prisma.post.create({
      data: {
        ...testPostData,
        postDetail: {
          create: testPostDetail,
        },
      },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });

    console.log('✅ Post de teste criado com sucesso!');
    console.log('   ID:', testPost.id);
    console.log('   Title:', testPost.title);
    console.log('   Price:', testPost.price);
    console.log('   Detail ID:', testPost.postDetail.id);

    // Limpeza: Deletar o post de teste (primeiro o detalhe, depois o post)
    await prisma.postDetail.delete({
      where: { id: testPost.postDetail.id },
    });
    await prisma.post.delete({
      where: { id: testPost.id },
    });
    console.log('🧹 Post de teste removido');

    console.log(
      '\n🎉 Todos os testes passaram! O banco de dados está funcionando corretamente.'
    );
  } catch (error) {
    console.error('\n💥 Erro durante o teste do banco de dados:');
    console.error('Tipo:', error.constructor.name);
    console.error('Mensagem:', error.message);

    if (error.code) {
      console.error('Código Prisma:', error.code);
    }

    if (error.meta) {
      console.error('Meta:', error.meta);
    }

    console.error('Stack:', error.stack);

    // Diagnósticos específicos
    if (error.message.includes('connect')) {
      console.error('\n🔌 DIAGNÓSTICO: Problema de conexão com o banco');
      console.error(
        '• Verifique se o DATABASE_URL está configurado corretamente'
      );
      console.error('• Verifique se o banco de dados está rodando');
      console.error('• Execute: npx prisma db push');
    }

    if (error.code === 'P2025') {
      console.error('\n🔍 DIAGNÓSTICO: Registro não encontrado');
      console.error('• Verifique se as tabelas existem');
      console.error('• Execute: npx prisma migrate reset');
    }

    if (error.code === 'P2002') {
      console.error('\n🔄 DIAGNÓSTICO: Violação de unicidade');
      console.error('• Dados duplicados detectados');
    }
  } finally {
    await prisma.$disconnect();
    console.log('\n🔌 Conexão com o banco fechada.');
  }
}

// Executar o teste
testDatabase();
