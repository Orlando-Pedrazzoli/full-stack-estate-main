// client/src/lib/loaders.js
import { defer } from 'react-router-dom';
import apiRequest from './apiRequest';

// Loader para página de listagem de posts
export const listPageLoader = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.toString();

    console.log('🔄 Carregando lista de posts...');

    const postPromise = apiRequest
      .get('/posts?' + query)
      .then(res => {
        console.log('✅ Posts carregados com sucesso');
        return res;
      })
      .catch(error => {
        console.error('❌ Erro ao carregar posts:', error);
        throw error;
      });

    return defer({
      postResponse: postPromise,
    });
  } catch (error) {
    console.error('💥 Erro crítico no listPageLoader:', error);
    throw new Response('Erro ao carregar posts', { status: 500 });
  }
};

// Loader para página do perfil
export const profilePageLoader = async () => {
  try {
    console.log('🔄 Carregando dados do perfil...');

    const postPromise = apiRequest
      .get('/users/profilePosts')
      .then(res => {
        console.log('✅ Dados do perfil carregados com sucesso');
        return res;
      })
      .catch(error => {
        console.error('❌ Erro ao carregar dados do perfil:', error);

        // Verificar se é erro de conexão
        if (
          error.code === 'ERR_NETWORK' ||
          error.code === 'ERR_CONNECTION_REFUSED'
        ) {
          console.error(
            '🔌 Servidor não está acessível em http://localhost:3000'
          );
          console.error(
            '👉 Verifique se o servidor está rodando com: npm run dev'
          );
        }

        // Verificar se é erro de autenticação
        if (error.response?.status === 401) {
          console.error('🔒 Usuário não autenticado');
          throw new Response('Não autorizado', { status: 401 });
        }

        throw error;
      });

    return defer({
      postResponse: postPromise,
    });
  } catch (error) {
    console.error('💥 Erro crítico no profilePageLoader:', error);

    if (error.status === 401) {
      throw new Response('Redirecionando para login', {
        status: 302,
        headers: { Location: '/login' },
      });
    }

    throw new Response('Erro ao carregar dados do perfil', { status: 500 });
  }
};

// Loader para página de post individual
export const singlePageLoader = async ({ params }) => {
  try {
    console.log(`🔄 Carregando post ${params.id}...`);

    const postPromise = apiRequest
      .get(`/posts/${params.id}`)
      .then(res => {
        console.log('✅ Post carregado com sucesso');
        return res;
      })
      .catch(error => {
        console.error('❌ Erro ao carregar post:', error);
        throw error;
      });

    return defer({
      postResponse: postPromise,
    });
  } catch (error) {
    console.error('💥 Erro crítico no singlePageLoader:', error);
    throw new Response('Erro ao carregar post', { status: 500 });
  }
};

// Loader para atualização de perfil
export const profileUpdatePageLoader = async () => {
  try {
    console.log('🔄 Carregando dados para atualização...');

    const postPromise = apiRequest
      .get('/users/profilePosts')
      .then(res => {
        console.log('✅ Dados para atualização carregados');
        return res;
      })
      .catch(error => {
        console.error('❌ Erro ao carregar dados para atualização:', error);

        if (error.response?.status === 401) {
          throw new Response('Não autorizado', { status: 401 });
        }

        throw error;
      });

    return defer({
      postResponse: postPromise,
    });
  } catch (error) {
    console.error('💥 Erro crítico no profileUpdatePageLoader:', error);

    if (error.status === 401) {
      throw new Response('Redirecionando para login', {
        status: 302,
        headers: { Location: '/login' },
      });
    }

    throw new Response('Erro ao carregar dados', { status: 500 });
  }
};

// Loader genérico para páginas que precisam verificar autenticação
export const authRequiredLoader = async () => {
  try {
    // Fazer uma requisição simples para verificar se está autenticado
    await apiRequest.get('/test/should-be-logged-in');
    return null;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Response('Redirecionando para login', {
        status: 302,
        headers: { Location: '/login' },
      });
    }
    throw error;
  }
};
