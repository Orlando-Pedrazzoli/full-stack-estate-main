// client/src/routes/privacyPolicy/PrivacyPolicy.jsx
import './privacyPolicy.scss';

function PrivacyPolicy() {
  return (
    <div className='privacy-policy-page'>
      <div className='container'>
        <h1>Política de Privacidade e Cookies</h1>
        <p className='last-updated'>
          Última atualização: {new Date().toLocaleDateString('pt-PT')}
        </p>

        <section>
          <h2>1. Informações Gerais</h2>
          <p>
            A Raquel Perez - Consultoria Imobiliária respeita a sua privacidade
            e está comprometida em proteger os seus dados pessoais. Esta
            política explica como recolhemos, utilizamos e protegemos as suas
            informações.
          </p>
        </section>

        <section>
          <h2>2. Cookies que Utilizamos</h2>

          <h3>Cookies Essenciais</h3>
          <ul>
            <li>
              <strong>Cookies de Sessão:</strong> Necessários para o
              funcionamento básico do site
            </li>
            <li>
              <strong>Cookies de Autenticação:</strong> Para manter a sua sessão
              ativa após login
            </li>
            <li>
              <strong>Cookies de Preferências:</strong> Para lembrar as suas
              escolhas (idioma, etc.)
            </li>
          </ul>

          <h3>Cookies de Análise</h3>
          <ul>
            <li>
              <strong>Google Analytics:</strong> Para compreender como utiliza o
              nosso site
            </li>
            <li>
              <strong>Hotjar:</strong> Para análise de comportamento e melhorar
              a experiência
            </li>
          </ul>

          <h3>Cookies de Marketing</h3>
          <ul>
            <li>
              <strong>Facebook Pixel:</strong> Para publicidade direcionada
            </li>
            <li>
              <strong>Google Ads:</strong> Para remarketing e análise de
              conversões
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Como Utilizamos os Seus Dados</h2>
          <ul>
            <li>Prestar os nossos serviços de consultoria imobiliária</li>
            <li>Responder às suas consultas e pedidos de informação</li>
            <li>
              Enviar atualizações sobre propriedades que possam interessar-lhe
            </li>
            <li>Melhorar a qualidade dos nossos serviços</li>
            <li>Cumprir obrigações legais</li>
          </ul>
        </section>

        <section>
          <h2>4. Os Seus Direitos</h2>
          <p>Tem o direito de:</p>
          <ul>
            <li>Aceder aos seus dados pessoais</li>
            <li>Retificar dados incorretos</li>
            <li>Solicitar a eliminação dos seus dados</li>
            <li>Opor-se ao processamento dos seus dados</li>
            <li>Portabilidade dos dados</li>
            <li>Retirar o consentimento a qualquer momento</li>
          </ul>
        </section>

        <section>
          <h2>5. Gestão de Cookies</h2>
          <p>
            Pode gerir as suas preferências de cookies através das configurações
            do seu navegador ou utilizando os controlos disponíveis neste site.
            Note que desativar certos cookies pode afetar a funcionalidade do
            site.
          </p>

          <div className='cookie-controls'>
            <h3>Controlos de Cookies</h3>
            <button
              className='cookie-control-btn'
              onClick={() => window.location.reload()}
            >
              🍪 Gerir Preferências de Cookies
            </button>
          </div>
        </section>

        <section>
          <h2>6. Contacto</h2>
          <p>
            Para exercer os seus direitos ou esclarecer dúvidas sobre esta
            política, pode contactar-nos através de:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> raquel.perez@email.com
            </li>
            <li>
              <strong>Telefone:</strong> +351 912 345 678
            </li>
            <li>
              <strong>Morada:</strong> Av. da Liberdade, 123 - Lisboa
            </li>
          </ul>
        </section>

        <section>
          <h2>7. Alterações a Esta Política</h2>
          <p>
            Reservamo-nos o direito de atualizar esta política periodicamente.
            As alterações serão comunicadas através do nosso site.
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
