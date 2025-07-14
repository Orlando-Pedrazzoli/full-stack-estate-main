// client/src/lib/apiRequest.js
import axios from 'axios';

// URL da API baseada no ambiente
const getApiUrl = () => {
  // Em desenvolvimento
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_URL || 'http://localhost:3000';
  }

  // Em produção
  return import.meta.env.VITE_API_URL || 'https://sua-api.vercel.app';
};

const apiRequest = axios.create({
  baseURL: `${getApiUrl()}/api`,
  withCredentials: true,
  timeout: 15000, // 15 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para debugging e logging
apiRequest.interceptors.request.use(
  config => {
    console.log(
      `🔄 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`
    );
    console.log('Headers:', config.headers);

    if (config.data) {
      console.log('Request Data:', config.data);
    }

    return config;
  },
  error => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

apiRequest.interceptors.response.use(
  response => {
    console.log(
      `✅ ${response.config.method?.toUpperCase()} ${
        response.config.url
      } - Status: ${response.status}`
    );
    return response;
  },
  error => {
    // Log detalhado do erro
    console.group('❌ API Error Details');
    console.error('Message:', error.message);
    console.error('Code:', error.code);
    console.error('URL:', error.config?.url);
    console.error('Method:', error.config?.method);
    console.error('Base URL:', error.config?.baseURL);

    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Status Text:', error.response.statusText);
      console.error('Response Data:', error.response.data);
      console.error('Response Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request made but no response received:', error.request);
    }
    console.groupEnd();

    // Tratamento específico para erros comuns
    if (error.code === 'ERR_NETWORK') {
      console.error('🔌 Erro de rede - Verifique se o servidor está rodando');
      console.error(`📍 Tentando conectar com: ${getApiUrl()}`);
    }

    if (error.code === 'ERR_CONNECTION_REFUSED') {
      console.error('🚫 Conexão recusada - Servidor pode estar offline');
      console.error(`📍 URL: ${getApiUrl()}`);
    }

    if (error.response?.status === 401) {
      console.error('🔒 Não autorizado - Token pode ter expirado');
    }

    if (error.response?.status === 403) {
      console.error('🚫 Acesso negado - Permissões insuficientes');
    }

    if (error.response?.status === 404) {
      console.error('🔍 Rota não encontrada');
    }

    return Promise.reject(error);
  }
);

export default apiRequest;
