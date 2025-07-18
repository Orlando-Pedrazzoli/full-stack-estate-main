import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import WhatsAppChat from '../../components/whatsapp/WhatsAppChat';
import './sellProperty.scss';

function SellPropertyPage() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    propertyType: '',
    location: '',
    estimatedValue: '',
    timeframe: '',
    contactMethod: 'whatsapp',
  });

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuickContact = () => {
    const message = `Olá Raquel! 👋

Tenho interesse em vender o meu imóvel e gostaria de conhecer os seus serviços profissionais.

🏠 *Detalhes do Imóvel:*
Tipo: ${formData.propertyType || 'A definir'}
Localização: ${formData.location || 'A definir'}
Valor estimado: ${formData.estimatedValue || 'A avaliar'}
Prazo: ${formData.timeframe || 'Flexível'}

${
  currentUser
    ? `
👤 *Os meus dados:*
Nome: ${currentUser.username}
Email: ${currentUser.email}
`
    : ''
}

Poderia entrar em contacto para conversarmos sobre a melhor estratégia de venda?

Obrigado(a)! 🙏`;

    const whatsappURL = `https://wa.me/351933859122?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, '_blank');
  };

  const handleCreateListing = () => {
    if (!currentUser) {
      navigate('/register');
    } else {
      navigate('/add');
    }
  };

  return (
    <div className='sell-property-page'>
      {/* Hero Section */}
      <section className='hero-section'>
        <div className='hero-content'>
          <div className='hero-text'>
            <h1>Venda o Seu Imóvel com Confiança</h1>
            <p className='hero-subtitle'>
              Mais de 2000 propriedades vendidas com sucesso. Deixe-nos cuidar
              de todo o processo para si.
            </p>
            <div className='hero-stats'>
              <div className='stat'>
                <span className='number'>16+</span>
                <span className='label'>Anos de Experiência</span>
              </div>
              <div className='stat'>
                <span className='number'>2000+</span>
                <span className='label'>Propriedades Vendidas</span>
              </div>
              <div className='stat'>
                <span className='number'>98%</span>
                <span className='label'>Clientes Satisfeitos</span>
              </div>
            </div>
          </div>
          <div className='hero-image'>
            <img
              src='/raquel-foto.png'
              alt='Raquel Perez - Consultora Imobiliária'
            />
            <div className='credential-badge'>
              <span>Consultora Certificada</span>
              <div className='rating'>★★★★★</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className='services-section'>
        <div className='container'>
          <h2>Serviços e Marketing</h2>
          <p className='services-subtitle'>
            O que temos para os nossos clientes?
          </p>

          {/* Professional Support */}
          <div className='service-highlight'>
            <div className='service-content'>
              <h3>
                Acompanhamento e Apoio Profissional ao Longo de Todo o Processo
              </h3>
              <div className='service-details'>
                <div className='service-item'>
                  <strong>
                    Divulgação e promoção paga no Facebook e Instagram
                  </strong>
                </div>
                <div className='service-item'>
                  <strong>
                    Publicação e promoção paga em portais de imobiliário
                    nacionais e internacionais
                  </strong>
                </div>
                <div className='service-item'>
                  <strong>Colocação no site Century 21:</strong>
                  <p>Rede líder mundial de mediação imobiliária;</p>
                </div>
                <div className='service-item'>
                  <strong>Motor de busca inteligente na rede Century 21</strong>
                  <p>
                    Para contactar compradores qualificados para o perfil do
                    imóvel.
                  </p>
                </div>
              </div>
            </div>
            <div className='service-image'>
              <img
                src='/service-marketing.jpg'
                alt='Marketing Digital Profissional'
              />
            </div>
          </div>

          {/* Investment in Marketing */}
          <div className='service-highlight reverse'>
            <div className='service-image'>
              <img
                src='/service-team.jpg'
                alt='Equipa Profissional Century 21'
              />
            </div>
            <div className='service-content'>
              <h3>Forte Investimento na Campanha de Divulgação do Imóvel</h3>
              <div className='service-details'>
                <div className='service-item'>
                  <strong>
                    Divulgação e promoção paga no Facebook e Instagram
                  </strong>
                </div>
                <div className='service-item'>
                  <strong>
                    Publicação e promoção paga em portais de imobiliário
                    nacionais e internacionais
                  </strong>
                </div>
                <div className='service-item'>
                  <strong>Colocação no site Century 21:</strong>
                  <p>Rede líder mundial de mediação imobiliária;</p>
                </div>
                <div className='service-item'>
                  <strong>Motor de busca inteligente na rede Century 21</strong>
                  <p>
                    Para contactar compradores qualificados para o perfil do
                    imóvel.
                  </p>
                </div>
                <div className='service-item'>
                  <strong>Contacto com outras redes imobiliárias</strong>
                  <p>Para partilha do negócio;</p>
                </div>
                <div className='service-item'>
                  <strong>
                    Promoção em grupos de profissionais (do setor imobiliário)
                  </strong>
                </div>
                <div className='service-item'>
                  <strong>Brochura do imóvel para entrega nas visitas</strong>
                </div>
                <div className='service-item'>
                  <strong>
                    Divulgação da brochura de venda (em locais de impacto)
                  </strong>
                </div>
                <div className='service-item'>
                  <strong>Open House</strong>
                  <p>Para profissionais da mediação e potenciais clientes.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Property Preparation */}
          <div className='service-highlight'>
            <div className='service-content'>
              <h3>Preparação e Valorização do Imóvel para Venda</h3>
              <div className='service-details'>
                <div className='service-item'>
                  <strong>Home Staging (serviço de encenação):</strong>
                  <p>
                    Mobilar e decorar o imóvel para venda, ou caso esteja
                    habitado, serviço de decoração e preparação para sessão
                    fotográfica e venda;
                  </p>
                </div>
                <div className='service-item'>
                  <strong>Imagens virtuais:</strong>
                  <p>Caso o home staging real não seja viável;</p>
                </div>
                <div className='service-item'>
                  <strong>Reportagem fotográfica profissional</strong>
                </div>
                <div className='service-item'>
                  <strong>
                    Serviço de vídeo promocional ou visita virtual 360°
                  </strong>
                </div>
                <div className='service-item'>
                  <strong>Relatórios mensais</strong>
                  <p>
                    De acompanhamento e reuniões de revisão do plano de promoção
                    se necessário;
                  </p>
                </div>
                <div className='service-item'>
                  <strong>Qualificação de clientes e gestão de visitas</strong>
                </div>
                <div className='service-item'>
                  <strong>
                    Apoio do departamento de intermediação de crédito
                  </strong>
                  <p>
                    Para a obtenção de crédito bancário aos potenciais clientes;
                  </p>
                </div>
                <div className='service-item'>
                  <strong>Serviço de alerta por SMS</strong>
                  <p>
                    A cada marcação de visita e a cada proposta apresentada para
                    transparência máxima do processo.
                  </p>
                </div>
                <div className='service-item'>
                  <strong>Acompanhamento na assinatura dos contratos</strong>
                </div>
                <div className='service-item'>
                  <strong>Seguro de responsabilidade civil</strong>
                </div>
              </div>
            </div>
            <div className='service-image'>
              <img
                src='/service-preparation.jpg'
                alt='Preparação e Valorização de Imóveis'
              />
            </div>
          </div>

          {/* Market Analysis */}
          <div className='service-highlight reverse'>
            <div className='service-image'>
              <img
                src='/service-analysis.jpg'
                alt='Análise de Mercado Profissional'
              />
            </div>
            <div className='service-content'>
              <h3>
                Definição do Valor de Mercado e Preparação Documental do Imóvel
              </h3>
              <div className='service-description'>
                <p>
                  Já que é fundamental que a par das competências comerciais,
                  estamos totalmente apoiados por uma equipa multidisciplinar
                  que apoia o sucesso da transação em todas as vertentes:
                </p>
              </div>
              <div className='service-details'>
                <div className='service-item'>
                  <strong>Estudo comparativo de mercado:</strong>
                  <p>
                    Com recurso a diversas ferramentas profissionais para melhor
                    entender e definir o posicionamento de preço;
                  </p>
                </div>
                <div className='service-item'>
                  <strong>Avaliação independente (bancária):</strong>
                  <p>
                    Que ajudará a defender o preço junto de eventuais
                    interessados;
                  </p>
                </div>
                <div className='service-item'>
                  <strong>
                    Diagnóstico e levantamento de toda a documentação
                    necessária:
                  </strong>
                  <p>
                    Respetiva análise e validação pelo Departamento Jurídico.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Strategy */}
          <div className='pricing-strategy'>
            <div className='strategy-content'>
              <h3>A Importância do Seu Imóvel Estar com o Preço Correto</h3>
              <div className='strategy-text'>
                <p>
                  Colocar o imóvel à venda pelo preço correto é fundamental para
                  o sucesso da venda.
                </p>
                <p>
                  As primeiras 6 semanas são muito importantes já que existe um
                  pico de procura e de interesse.
                </p>
                <p>
                  Nessa fase, para potenciar o número de clientes, o valor do
                  imóvel deverá estar no valor de mercado correto.
                </p>
              </div>
            </div>
            <div className='strategy-image'>
              <img src='/pricing-strategy.jpg' alt='Estratégia de Preços' />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className='contact-section'>
        <div className='container'>
          <div className='contact-grid'>
            <div className='contact-info'>
              <h2>Interessado em Vender?</h2>
              <p>
                Preencha os dados básicos e entraremos em contacto consigo para
                uma consulta gratuita.
              </p>

              <div className='contact-form'>
                <div className='form-group'>
                  <label>Tipo de Imóvel</label>
                  <select
                    name='propertyType'
                    value={formData.propertyType}
                    onChange={handleInputChange}
                  >
                    <option value=''>Selecione o tipo</option>
                    <option value='apartamento'>Apartamento</option>
                    <option value='moradia'>Moradia</option>
                    <option value='terreno'>Terreno</option>
                    <option value='comercial'>Espaço Comercial</option>
                    <option value='escritorio'>Escritório</option>
                  </select>
                </div>

                <div className='form-group'>
                  <label>Localização</label>
                  <input
                    type='text'
                    name='location'
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder='Cidade e zona'
                  />
                </div>

                <div className='form-group'>
                  <label>Valor Estimado</label>
                  <select
                    name='estimatedValue'
                    value={formData.estimatedValue}
                    onChange={handleInputChange}
                  >
                    <option value=''>Selecione a faixa</option>
                    <option value='ate-200k'>Até 200.000€</option>
                    <option value='200k-400k'>200.000€ - 400.000€</option>
                    <option value='400k-600k'>400.000€ - 600.000€</option>
                    <option value='600k-1m'>600.000€ - 1.000.000€</option>
                    <option value='acima-1m'>Acima de 1.000.000€</option>
                  </select>
                </div>

                <div className='form-group'>
                  <label>Prazo para Venda</label>
                  <select
                    name='timeframe'
                    value={formData.timeframe}
                    onChange={handleInputChange}
                  >
                    <option value=''>Selecione o prazo</option>
                    <option value='urgente'>Urgente (1-2 meses)</option>
                    <option value='normal'>Normal (3-6 meses)</option>
                    <option value='flexivel'>Flexível (6+ meses)</option>
                  </select>
                </div>

                <div className='form-actions'>
                  <button
                    onClick={handleQuickContact}
                    className='contact-btn primary'
                  >
                    <img src='/whatsapp.png' alt='WhatsApp' />
                    Contacto Rápido
                  </button>

                  <button
                    onClick={handleCreateListing}
                    className='contact-btn secondary'
                  >
                    {currentUser ? 'Criar Anúncio' : 'Registar e Criar Anúncio'}
                  </button>
                </div>
              </div>
            </div>

            <div className='testimonials'>
              <h3>O Que Dizem os Nossos Clientes</h3>

              <div className='testimonial'>
                <div className='testimonial-content'>
                  <p>
                    "Vendemos a nossa casa em apenas 3 semanas! O
                    profissionalismo da Raquel é excecional."
                  </p>
                  <div className='testimonial-author'>
                    <strong>Maria Silva</strong>
                    <span>Cascais - Villa €850.000</span>
                  </div>
                </div>
                <div className='testimonial-rating'>★★★★★</div>
              </div>

              <div className='testimonial'>
                <div className='testimonial-content'>
                  <p>
                    "Conseguiu um preço acima das nossas expectativas. Recomendo
                    vivamente!"
                  </p>
                  <div className='testimonial-author'>
                    <strong>João Santos</strong>
                    <span>Porto - Apartamento T3</span>
                  </div>
                </div>
                <div className='testimonial-rating'>★★★★★</div>
              </div>

              <div className='testimonial'>
                <div className='testimonial-content'>
                  <p>
                    "Acompanhamento impecável do início ao fim. Senti-me sempre
                    segura."
                  </p>
                  <div className='testimonial-author'>
                    <strong>Ana Costa</strong>
                    <span>Lisboa - Moradia T4</span>
                  </div>
                </div>
                <div className='testimonial-rating'>★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className='process-section'>
        <div className='container'>
          <h2>Como Funciona</h2>
          <div className='process-steps'>
            <div className='step'>
              <div className='step-number'>1</div>
              <div className='step-content'>
                <h3>Contacto Inicial</h3>
                <p>
                  Entre em contacto connosco para uma consulta gratuita sobre a
                  venda do seu imóvel.
                </p>
              </div>
            </div>
            <div className='step'>
              <div className='step-number'>2</div>
              <div className='step-content'>
                <h3>Avaliação Profissional</h3>
                <p>
                  Visitamos o seu imóvel e fazemos uma avaliação detalhada do
                  valor de mercado.
                </p>
              </div>
            </div>
            <div className='step'>
              <div className='step-number'>3</div>
              <div className='step-content'>
                <h3>Estratégia Personalizada</h3>
                <p>
                  Criamos um plano de marketing específico para o seu imóvel e
                  definimos o preço ideal.
                </p>
              </div>
            </div>
            <div className='step'>
              <div className='step-number'>4</div>
              <div className='step-content'>
                <h3>Marketing & Divulgação</h3>
                <p>
                  Promovemos o seu imóvel através de fotografias profissionais e
                  múltiplos canais de venda.
                </p>
              </div>
            </div>
            <div className='step'>
              <div className='step-number'>5</div>
              <div className='step-content'>
                <h3>Negociação & Venda</h3>
                <p>
                  Negociamos em seu nome e acompanhamos todo o processo até à
                  escritura final.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='cta-section'>
        <div className='container'>
          <div className='cta-content'>
            <h2>Pronto para Vender o Seu Imóvel?</h2>
            <p>
              Não perca tempo. Comece hoje mesmo o processo de venda com uma
              consultora de confiança.
            </p>
            <div className='cta-buttons'>
              <WhatsAppChat contactType='sell' />
              <button
                onClick={handleCreateListing}
                className='cta-btn secondary'
              >
                {currentUser ? 'Criar Anúncio Agora' : 'Registar e Começar'}
              </button>
            </div>
            <div className='guarantee'>
              <p>
                <strong>Garantia:</strong> Avaliação gratuita e sem compromisso
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SellPropertyPage;
