// client/src/components/ApiTest.jsx
import { useState } from 'react';
import apiRequest from '../lib/apiRequest';

function ApiTest() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const addResult = (test, status, message, data = null) => {
    setResults(prev => [
      ...prev,
      {
        test,
        status,
        message,
        data,
        time: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const clearResults = () => {
    setResults([]);
  };

  const testConnection = async () => {
    setIsLoading(true);
    clearResults();

    try {
      // Teste 1: Health check direto
      addResult('Health Check', 'testing', 'Testando health check...');
      try {
        const response = await fetch('http://localhost:3000/');
        const data = await response.json();
        addResult('Health Check', 'success', 'API respondendo!', data);
      } catch (error) {
        addResult('Health Check', 'error', `Erro: ${error.message}`);
      }

      // Teste 2: Posts endpoint
      addResult('Posts Endpoint', 'testing', 'Testando /api/posts...');
      try {
        const response = await apiRequest.get('/posts');
        addResult(
          'Posts Endpoint',
          'success',
          `${response.data.length} posts encontrados`,
          response.data.slice(0, 2)
        );
      } catch (error) {
        addResult(
          'Posts Endpoint',
          'error',
          `Erro: ${error.response?.data?.message || error.message}`
        );
      }

      // Teste 3: Rota protegida (deve falhar)
      addResult('Rota Protegida', 'testing', 'Testando rota protegida...');
      try {
        await apiRequest.get('/test/should-be-logged-in');
        addResult(
          'Rota Protegida',
          'warning',
          'Acessível sem login (inesperado)'
        );
      } catch (error) {
        if (error.response?.status === 401) {
          addResult(
            'Rota Protegida',
            'success',
            'Protegida corretamente (401)'
          );
        } else {
          addResult(
            'Rota Protegida',
            'error',
            `Erro inesperado: ${error.message}`
          );
        }
      }
    } catch (error) {
      addResult('Geral', 'error', `Erro geral: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 9999,
          fontSize: '18px',
        }}
      >
        🧪
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'white',
        border: '2px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '400px',
        maxHeight: '80vh',
        overflow: 'auto',
        zIndex: 9999,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px',
        }}
      >
        <h3 style={{ margin: 0, color: '#333' }}>🧪 Teste de API</h3>
        <button
          onClick={() => setIsVisible(false)}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: '#666',
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={testConnection}
          disabled={isLoading}
          style={{
            background: isLoading ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            marginRight: '10px',
          }}
        >
          {isLoading ? 'Testando...' : 'Testar Conexão'}
        </button>

        <button
          onClick={clearResults}
          style={{
            background: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Limpar
        </button>
      </div>

      <div style={{ fontSize: '14px' }}>
        {results.length === 0 && !isLoading && (
          <div style={{ color: '#666', fontStyle: 'italic' }}>
            Clique em "Testar Conexão" para começar
          </div>
        )}

        {results.map((result, index) => (
          <div
            key={index}
            style={{
              marginBottom: '10px',
              padding: '8px',
              borderRadius: '4px',
              background:
                result.status === 'success'
                  ? '#d4edda'
                  : result.status === 'error'
                  ? '#f8d7da'
                  : result.status === 'warning'
                  ? '#fff3cd'
                  : '#e2e3e5',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              {result.status === 'success'
                ? '✅'
                : result.status === 'error'
                ? '❌'
                : result.status === 'warning'
                ? '⚠️'
                : '🔄'}
              {result.test}
            </div>
            <div>{result.message}</div>
            {result.data && (
              <details style={{ marginTop: '4px' }}>
                <summary style={{ cursor: 'pointer' }}>Ver dados</summary>
                <pre
                  style={{
                    fontSize: '12px',
                    overflow: 'auto',
                    background: '#f8f9fa',
                    padding: '8px',
                    borderRadius: '4px',
                    margin: '4px 0',
                  }}
                >
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </details>
            )}
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              {result.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApiTest;
