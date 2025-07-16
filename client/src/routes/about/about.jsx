import './about.scss';
import WhatsAppChat from '../../components/whatsapp/WhatsAppChat';

function AboutPage() {
  return (
    <div className='aboutPage'>
      {/* Professional Header */}
      <section className='professionalHeader'>
        <div className='container'>
          <div className='headerContent'>
            <div className='profileSection'>
              <div className='profileImageContainer'>
                <img
                  src='/raquel-foto.png'
                  alt='Raquel Perez - Consultora Imobiliária'
                />
                <div className='certificationBadge'>
                  <span>Certificada</span>
                  <div className='certIcon'>✓</div>
                </div>
              </div>
              <div className='contactInfo'>
                <a href='/contact' className='email-contact'>
                  Email Profissional
                </a>
              </div>
            </div>

            <div className='profileDetails'>
              <div className='titleSection'>
                <span className='company'>Century 21 Portugal</span>
                <h1>Raquel Perez</h1>
                <h2>Consultora Imobiliária Especializada</h2>
              </div>

              <div className='credentials'>
                <div className='credential'>
                  <div className='icon'>🎓</div>
                  <div className='details'>
                    <h3>Formação Jurídica</h3>
                    <p>Advogada com mais de 16 anos de experiência</p>
                  </div>
                </div>
                <div className='credential'>
                  <div className='icon'>🌍</div>
                  <div className='details'>
                    <h3>Rede Internacional</h3>
                    <p>Conexões no Brasil, Espanha, EUA e Canadá</p>
                  </div>
                </div>
                <div className='credential'>
                  <div className='icon'>🏆</div>
                  <div className='details'>
                    <h3>Resultados Comprovados</h3>
                    <p>Mais de 2000 propriedades vendidas</p>
                  </div>
                </div>
              </div>

              <div className='metricsGrid'>
                <div className='metric'>
                  <span className='value'>16+</span>
                  <span className='label'>Anos de Experiência</span>
                </div>
                <div className='metric'>
                  <span className='value'>2000+</span>
                  <span className='label'>Propriedades Vendidas</span>
                </div>
                <div className='metric'>
                  <span className='value'>98%</span>
                  <span className='label'>Clientes Satisfeitos</span>
                </div>
                <div className='metric'>
                  <span className='value'>200+</span>
                  <span className='label'>Prêmios Recebidos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Matrix */}
      <section className='servicesMatrix'>
        <div className='container'>
          <div className='sectionTitle'>
            <h2>Serviços Especializados</h2>
            <p>Consultoria imobiliária completa com padrão internacional</p>
          </div>

          <div className='servicesGrid'>
            <div className='serviceBlock primary'>
              <div className='serviceHeader'>
                <span className='serviceIcon'>📊</span>
                <h3>Análise de Mercado</h3>
              </div>
              <ul className='serviceFeatures'>
                <li>Estudo comparativo profissional</li>
                <li>Avaliação bancária independente</li>
                <li>Posicionamento estratégico de preços</li>
                <li>Relatórios de tendências do mercado</li>
              </ul>
            </div>

            <div className='serviceBlock secondary'>
              <div className='serviceHeader'>
                <span className='serviceIcon'>🎯</span>
                <h3>Marketing Digital Integrado</h3>
              </div>
              <ul className='serviceFeatures'>
                <li>Campanhas pagas Facebook/Instagram</li>
                <li>Portais nacionais e internacionais</li>
                <li>Motor de busca inteligente Century 21</li>
                <li>Networking com outras redes</li>
              </ul>
            </div>

            <div className='serviceBlock accent'>
              <div className='serviceHeader'>
                <span className='serviceIcon'>📸</span>
                <h3>Apresentação Premium</h3>
              </div>
              <ul className='serviceFeatures'>
                <li>Home Staging profissional</li>
                <li>Fotografia especializada</li>
                <li>Vídeos promocionais 360°</li>
                <li>Tours virtuais imersivos</li>
              </ul>
            </div>

            <div className='serviceBlock legal'>
              <div className='serviceHeader'>
                <span className='serviceIcon'>⚖️</span>
                <h3>Apoio Jurídico</h3>
              </div>
              <ul className='serviceFeatures'>
                <li>Validação documental completa</li>
                <li>Acompanhamento legal especializado</li>
                <li>Seguro responsabilidade civil</li>
                <li>Gestão de contratos e escrituras</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Process */}
      <section className='professionalProcess'>
        <div className='container'>
          <h2>Processo Profissional de Venda</h2>

          <div className='processSteps'>
            <div className='processStep'>
              <div className='stepNumber'>01</div>
              <div className='stepContent'>
                <h3>Análise Inicial</h3>
                <p>
                  Avaliação completa do imóvel, estudo de mercado comparativo e
                  definição da estratégia de venda personalizada.
                </p>
              </div>
            </div>

            <div className='processStep'>
              <div className='stepNumber'>02</div>
              <div className='stepContent'>
                <h3>Preparação & Staging</h3>
                <p>
                  Home staging profissional, sessão fotográfica especializada e
                  criação de conteúdo promocional de alta qualidade.
                </p>
              </div>
            </div>

            <div className='processStep'>
              <div className='stepNumber'>03</div>
              <div className='stepContent'>
                <h3>Campanha de Marketing</h3>
                <p>
                  Lançamento de campanhas digitais segmentadas e divulgação em
                  múltiplas plataformas nacionais e internacionais.
                </p>
              </div>
            </div>

            <div className='processStep'>
              <div className='stepNumber'>04</div>
              <div className='stepContent'>
                <h3>Gestão & Negociação</h3>
                <p>
                  Qualificação rigorosa de clientes, gestão profissional de
                  visitas e negociação estratégica de propostas.
                </p>
              </div>
            </div>

            <div className='processStep'>
              <div className='stepNumber'>05</div>
              <div className='stepContent'>
                <h3>Finalização Legal</h3>
                <p>
                  Acompanhamento jurídico completo, validação documental e
                  presença em todas as etapas contratuais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Expertise */}
      <section className='experienceSection'>
        <div className='container'>
          <div className='experienceGrid'>
            <div className='experienceContent'>
              <h2>Experiência & Especialização</h2>

              <div className='expertiseAreas'>
                <div className='expertiseArea'>
                  <h3>Formação Jurídica Sólida</h3>
                  <p>
                    Advogada com mais de 16 anos de experiência em direito
                    imobiliário, proporcionando segurança jurídica completa em
                    todas as transações. Esta formação garante o tratamento
                    rigoroso de todos os aspectos legais.
                  </p>
                </div>

                <div className='expertiseArea'>
                  <h3>Mercado Premium de Lisboa</h3>
                  <p>
                    Especialização em propriedades de alto valor na região de
                    Lisboa e arredores, com profundo conhecimento das dinâmicas
                    do mercado luxury e relacionamento estabelecido com
                    investidores sofisticados.
                  </p>
                </div>

                <div className='expertiseArea'>
                  <h3>Investidores Internacionais</h3>
                  <p>
                    Rede consolidada de contatos no Brasil, Espanha, Estados
                    Unidos e Canadá, recebendo regularmente investidores
                    internacionais interessados no mercado imobiliário
                    português.
                  </p>
                </div>
              </div>

              <div className='commitment'>
                <h3>Compromisso de Excelência</h3>
                <p>
                  Cada projeto é tratado com dedicação total, aplicando
                  estratégias personalizadas e acompanhamento constante. O
                  sucesso dos meus clientes é a minha prioridade absoluta,
                  sempre com ética, transparência e resultados comprovados.
                </p>
              </div>
            </div>

            <div className='experienceVisual'>
              <div className='achievementCards'>
                <div className='achievementCard gold'>
                  <div className='cardIcon'>🏆</div>
                  <h4>Top Performer</h4>
                  <p>Century 21 Portugal</p>
                  <span>2023</span>
                </div>
                <div className='achievementCard silver'>
                  <div className='cardIcon'>⭐</div>
                  <h4>Excellence Award</h4>
                  <p>Customer Satisfaction</p>
                  <span>2022</span>
                </div>
                <div className='achievementCard bronze'>
                  <div className='cardIcon'>💎</div>
                  <h4>Premium Expert</h4>
                  <p>Luxury Properties</p>
                  <span>2021</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Professional */}
      <section className='testimonialsSection'>
        <div className='container'>
          <h2>Testemunhos de Clientes</h2>

          <div className='testimonialsCarousel'>
            <div className='testimonialCard featured'>
              <div className='testimonialHeader'>
                <div className='clientInfo'>
                  <h4>Maria & João Silva</h4>
                  <span>Villa em Cascais - €1.200.000</span>
                </div>
                <div className='rating'>★★★★★</div>
              </div>
              <blockquote>
                "A Raquel foi fundamental para vendermos a nossa propriedade em
                Cascais. O seu conhecimento do mercado, estratégia de marketing
                e rede de contactos resultaram numa venda rápida e pelo preço
                desejado. Profissionalismo exemplar."
              </blockquote>
            </div>

            <div className='testimonialCard'>
              <div className='testimonialHeader'>
                <div className='clientInfo'>
                  <h4>Carlos Mendes</h4>
                  <span>Investidor Internacional - Brasil</span>
                </div>
                <div className='rating'>★★★★★</div>
              </div>
              <blockquote>
                "Como investidor brasileiro, precisava de alguém que entendesse
                as especificidades do mercado português. A Raquel superou todas
                as expectativas com seu conhecimento e rede internacional."
              </blockquote>
            </div>

            <div className='testimonialCard'>
              <div className='testimonialHeader'>
                <div className='clientInfo'>
                  <h4>Ana Costa</h4>
                  <span>Apartamento T4 - Lisboa</span>
                </div>
                <div className='rating'>★★★★★</div>
              </div>
              <blockquote>
                "O apoio jurídico da Raquel foi decisivo. Sua formação em
                Direito garantiu que todos os aspectos legais fossem tratados
                com rigor e profissionalismo. Recomendo sem hesitação."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Professional */}
      <section className='ctaProfessional'>
        <div className='container'>
          <div className='ctaContent'>
            <h2>Agende uma Consulta Profissional</h2>
            <p>
              Descubra como posso valorizar o seu patrimônio com estratégias
              personalizadas e resultados comprovados.
            </p>

            <div className='ctaActions'>
              <WhatsAppChat contactType='general' />
              <a href='/contact' className='ctaButton secondary'>
                Contacto por Email
              </a>
            </div>

            <div className='professionalNote'>
              <p>
                ✓ Consulta inicial gratuita • ✓ Avaliação profissional • ✓
                Estratégia personalizada
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
