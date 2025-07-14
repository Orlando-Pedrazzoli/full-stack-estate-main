// client/src/lib/apiRequest.js
import axios from 'axios';

const apiRequest = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  timeout: 10000, // 10 segundos timeout
});

// Interceptor para debugging
apiRequest.interceptors.request.use(
  config => {
    console.log(`🔄 ${config.method?.toUpperCase()} ${config.url}`);
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

    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    console.groupEnd();

    // Tratamento específico para erros de conexão
    if (
      error.code === 'ERR_NETWORK' ||
      error.code === 'ERR_CONNECTION_REFUSED'
    ) {
      console.error(
        '🔌 Verifique se o servidor backend está rodando em http://localhost:3000'
      );
    }

    return Promise.reject(error);
  }
);

export default apiRequest;
