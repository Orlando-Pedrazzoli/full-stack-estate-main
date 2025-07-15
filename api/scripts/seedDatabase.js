// api/scripts/seedDatabase.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedDatabase() {
  console.log('🌱 Iniciando seed do banco de dados...\n');

  try {
    // Limpar dados existentes (opcional)
    console.log('🧹 Limpando dados existentes...');
    await prisma.savedPost.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Dados existentes removidos\n');

    // Criar usuários de teste
    console.log('👥 Criando usuários de teste...');

    const hashedPassword = await bcrypt.hash('123456', 10);

    const users = await Promise.all([
      prisma.user.create({
        data: {
          username: 'admin',
          email: 'admin@teste.com',
          password: hashedPassword,
          avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        },
      }),
      prisma.user.create({
        data: {
          username: 'joao',
          email: 'joao@teste.com',
          password: hashedPassword,
          avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        },
      }),
      prisma.user.create({
        data: {
          username: 'maria',
          email: 'maria@teste.com',
          password: hashedPassword,
          avatar:
            'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        },
      }),
    ]);

    console.log(`✅ ${users.length} usuários criados\n`);

    // Criar posts de teste
    console.log('🏠 Criando posts de teste...');

    const postsData = [
      {
        postData: {
          title: 'Apartamento Moderno no Centro',
          price: 350000,
          address: 'Rua das Flores, 123',
          city: 'São Paulo',
          bedroom: 2,
          bathroom: 2,
          latitude: -23.5505,
          longitude: -46.6333,
          type: 'buy',
          property: 'apartment',
          images: [
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
          ],
          userId: users[0].id,
        },
        postDetail: {
          desc: 'Lindo apartamento moderno com vista para a cidade. Localizado em área nobre, próximo ao metrô e shopping centers. Acabamento de primeira qualidade.',
          utilities: 'Internet, TV, Água',
          pet: 'Permitido',
          income: 'Mínimo 3x o valor do aluguel',
          size: 85,
        },
      },
      {
        postData: {
          title: 'Casa Familiar com Jardim',
          price: 2500,
          address: 'Rua dos Girassóis, 456',
          city: 'Campinas',
          bedroom: 3,
          bathroom: 2,
          latitude: -22.9099,
          longitude: -47.0626,
          type: 'rent',
          property: 'house',
          images: [
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800',
          ],
          userId: users[1].id,
        },
        postDetail: {
          desc: 'Casa espaçosa ideal para famílias. Possui quintal amplo, churrasqueira e área de lazer. Localizada em bairro residencial tranquilo.',
          utilities: 'Todos inclusos',
          pet: 'Permitido',
          income: 'Comprovação de renda',
          size: 150,
        },
      },
      {
        postData: {
          title: 'Cobertura de Luxo',
          price: 850000,
          address: 'Av. Atlântica, 789',
          city: 'Rio de Janeiro',
          bedroom: 4,
          bathroom: 3,
          latitude: -22.9068,
          longitude: -43.1729,
          type: 'buy',
          property: 'condo',
          images: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
          ],
          userId: users[2].id,
        },
        postDetail: {
          desc: 'Cobertura duplex com vista panorâmica para o mar. Acabamento de alto padrão, piscina privativa e área gourmet completa.',
          utilities: 'Completa',
          pet: 'Não permitido',
          income: 'Consultar',
          size: 220,
        },
      },
      {
        postData: {
          title: 'Kitnet Estudantil',
          price: 800,
          address: 'Rua Universitária, 321',
          city: 'Belo Horizonte',
          bedroom: 1,
          bathroom: 1,
          latitude: -19.9191,
          longitude: -43.9386,
          type: 'rent',
          property: 'apartment',
          images: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
          ],
          userId: users[0].id,
        },
        postDetail: {
          desc: 'Kitnet compacta e funcional, perfeita para estudantes. Próxima às principais universidades da cidade.',
          utilities: 'Internet incluída',
          pet: 'Não permitido',
          income: 'Comprovação de matrícula',
          size: 25,
        },
      },
      {
        postData: {
          title: 'Terreno para Construção',
          price: 180000,
          address: 'Loteamento Verde Vale, Lote 15',
          city: 'Sorocaba',
          bedroom: 0,
          bathroom: 0,
          latitude: -23.5015,
          longitude: -47.4526,
          type: 'buy',
          property: 'land',
          images: [
            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
          ],
          userId: users[1].id,
        },
        postDetail: {
          desc: 'Terreno plano em condomínio fechado. Infraestrutura completa com asfalto, água, luz e esgoto. Ideal para construção residencial.',
          utilities: 'Infraestrutura disponível',
          pet: 'N/A',
          income: 'Financiamento disponível',
          size: 300,
        },
      },
    ];

    // Criar posts com seus detalhes
    const createdPosts = [];
    for (const postInfo of postsData) {
      const post = await prisma.post.create({
        data: {
          ...postInfo.postData,
          postDetail: {
            create: postInfo.postDetail,
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
      createdPosts.push(post);
    }

    console.log(`✅ ${createdPosts.length} posts criados\n`);

    // Criar alguns posts salvos
    console.log('💾 Criando posts salvos...');

    await prisma.savedPost.createMany({
      data: [
        { userId: users[0].id, postId: createdPosts[1].id },
        { userId: users[0].id, postId: createdPosts[2].id },
        { userId: users[1].id, postId: createdPosts[0].id },
        { userId: users[2].id, postId: createdPosts[3].id },
      ],
    });

    console.log('✅ Posts salvos criados\n');

    // Estatísticas finais
    const finalStats = {
      users: await prisma.user.count(),
      posts: await prisma.post.count(),
      postDetails: await prisma.postDetail.count(),
      savedPosts: await prisma.savedPost.count(),
    };

    console.log('📊 Estatísticas finais:');
    console.log(`   👥 Usuários: ${finalStats.users}`);
    console.log(`   🏠 Posts: ${finalStats.posts}`);
    console.log(`   📝 Detalhes: ${finalStats.postDetails}`);
    console.log(`   💾 Posts salvos: ${finalStats.savedPosts}`);

    console.log('\n🎉 Seed concluído com sucesso!');
    console.log('\n🔑 Credenciais de teste:');
    console.log('   Username: admin | Password: 123456');
    console.log('   Username: joao | Password: 123456');
    console.log('   Username: maria | Password: 123456');
  } catch (error) {
    console.error('\n💥 Erro durante o seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar seed se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().catch(error => {
    console.error(error);
    process.exit(1);
  });
}

export default seedDatabase;
