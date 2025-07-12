import { useContext } from 'react';
import SearchBar from '../../components/searchBar/SearchBar';
import WhatsAppChat from '../../components/whatsapp/WhatsAppChat';
import './homePage.scss';
import { AuthContext } from '../../context/AuthContext';

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='homePage'>
      {/* Hero Section */}
      <section className='heroSection'>
        <div className='heroContent'>
          <div className='heroText'>
            <div className='heroBadge'>
              <span>Century 21 Portugal</span>
            </div>
            <h1>Encontre o Imóvel Ideal com Quem Entende do Assunto</h1>
            <p className='heroDescription'>
              Advogada de formação com mais de 16 anos de experiência jurídica.
              Especializada em consultoria imobiliária premium com ampla rede de
              conexões no Brasil, Espanha, EUA e Canadá. Ofereço um serviço
              completo e personalizado que garante o sucesso do seu projeto
              imobiliário.
            </p>

            <div className='heroFeatures'>
              <div className='feature'>
                <span className='icon'>✓</span>
                <span>Estudo de Mercado Aprofundado</span>
              </div>
              <div className='feature'>
                <span className='icon'>✓</span>
                <span>Plano de Marketing Estratégico</span>
              </div>
              <div className='feature'>
                <span className='icon'>✓</span>
                <span>Apoio Jurídico Especializado</span>
              </div>
            </div>

            <SearchBar />

            <div className='heroStats'>
              <div className='stat'>
                <span className='number'>16+</span>
                <span className='label'>Anos de Experiência</span>
              </div>
              <div className='stat'>
                <span className='number'>200+</span>
                <span className='label'>Prêmios e Reconhecimentos</span>
              </div>
              <div className='stat'>
                <span className='number'>2000+</span>
                <span className='label'>Imóveis Vendidos</span>
              </div>
            </div>
          </div>

          <div className='heroImage'>
            <div className='imageContainer'>
              <img
                src='/raquel-foto.png'
                alt='Raquel Perez - Consultora Imobiliária'
                loading='lazy'
              />
              <div className='imageBadge'>
                <div className='badgeContent'>
                  <span className='title'>Consultora Premiada</span>
                  <div className='rating'>★★★★★</div>
                  <span className='subtitle'>98% Clientes Satisfeitos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className='servicesPreview'>
        <div className='container'>
          <div className='sectionHeader'>
            <h2>Serviços Premium</h2>
            <p>Acompanhamento profissional completo do início ao fim</p>
          </div>

          <div className='servicesGrid'>
            <div className='serviceCard'>
              <div className='serviceIcon'>
                <span>📊</span>
              </div>
              <h3>Avaliação Profissional</h3>
              <p>
                Análise completa do valor de mercado com ferramentas
                especializadas e avaliação bancária independente.
              </p>
            </div>

            <div className='serviceCard'>
              <div className='serviceIcon'>
                <span>📱</span>
              </div>
              <h3>Marketing Digital</h3>
              <p>
                Campanhas pagas no Facebook, Instagram e principais portais
                imobiliários nacionais e internacionais.
              </p>
            </div>

            <div className='serviceCard'>
              <div className='serviceIcon'>
                <span>📸</span>
              </div>
              <h3>Home Staging</h3>
              <p>
                Preparação profissional do imóvel, fotografia especializada e
                vídeos promocionais 360°.
              </p>
            </div>

            <div className='serviceCard'>
              <div className='serviceIcon'>
                <span>⚖️</span>
              </div>
              <h3>Apoio Jurídico</h3>
              <p>
                Validação documental completa e acompanhamento legal em todas as
                etapas da transação.
              </p>
            </div>
          </div>

          <div className='servicesAction'>
            <a href='/about' className='btn-secondary'>
              Ver Todos os Serviços
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className='whyChoose'>
        <div className='container'>
          <div className='whyContent'>
            <div className='whyText'>
              <h2>Por Que Escolher a Raquel Perez?</h2>
              <div className='advantagesList'>
                <div className='advantage'>
                  <div className='advantageIcon'>
                    <span>🎓</span>
                  </div>
                  <div className='advantageContent'>
                    <h3>Formação Jurídica Especializada</h3>
                    <p>
                      Advogada com mais de 16 anos de experiência, garantindo
                      segurança jurídica em todas as transações.
                    </p>
                  </div>
                </div>

                <div className='advantage'>
                  <div className='advantageIcon'>
                    <span>🌍</span>
                  </div>
                  <div className='advantageContent'>
                    <h3>Rede Internacional</h3>
                    <p>
                      Conexões estabelecidas no Brasil, Espanha, EUA e Canadá
                      para investidores internacionais.
                    </p>
                  </div>
                </div>

                <div className='advantage'>
                  <div className='advantageIcon'>
                    <span>🏆</span>
                  </div>
                  <div className='advantageContent'>
                    <h3>Resultados Comprovados</h3>
                    <p>
                      Mais de 2000 propriedades vendidas com 98% de satisfação
                      dos clientes.
                    </p>
                  </div>
                </div>

                <div className='advantage'>
                  <div className='advantageIcon'>
                    <span>🤝</span>
                  </div>
                  <div className='advantageContent'>
                    <h3>Atendimento Personalizado</h3>
                    <p>
                      Cada cliente recebe atenção individual e estratégia
                      customizada para seus objetivos.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='whyImage'>
              <img
                src='/professional-consultation.jpg'
                alt='Consultoria Profissional'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='testimonials'>
        <div className='container'>
          <h2>O Que Dizem os Nossos Clientes</h2>
          <div className='testimonialsGrid'>
            <div className='testimonial'>
              <div className='testimonialContent'>
                <div className='quote'>"</div>
                <p>
                  A Raquel vendeu nossa propriedade em Lisboa em apenas 4
                  semanas. Seu conhecimento do mercado e estratégia de marketing
                  foram fundamentais.
                </p>
                <div className='testimonialAuthor'>
                  <div className='authorInfo'>
                    <strong>Carlos & Maria Santos</strong>
                    <span>Apartamento T3 - Lisboa</span>
                  </div>
                  <div className='rating'>★★★★★</div>
                </div>
              </div>
            </div>

            <div className='testimonial'>
              <div className='testimonialContent'>
                <div className='quote'>"</div>
                <p>
                  Como investidor brasileiro, precisava de alguém que entendesse
                  ambos os mercados. A Raquel superou todas as expectativas.
                </p>
                <div className='testimonialAuthor'>
                  <div className='authorInfo'>
                    <strong>Roberto Silva</strong>
                    <span>Investidor Internacional</span>
                  </div>
                  <div className='rating'>★★★★★</div>
                </div>
              </div>
            </div>

            <div className='testimonial'>
              <div className='testimonialContent'>
                <div className='quote'>"</div>
                <p>
                  O apoio jurídico da Raquel foi decisivo. Sua formação em
                  Direito garantiu que todos os aspectos legais fossem
                  impecáveis.
                </p>
                <div className='testimonialAuthor'>
                  <div className='authorInfo'>
                    <strong>Ana Costa</strong>
                    <span>Moradia T4 - Cascais</span>
                  </div>
                  <div className='rating'>★★★★★</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='ctaSection'>
        <div className='container'>
          <div className='ctaContent'>
            <h2>Pronto para o Seu Próximo Projeto Imobiliário?</h2>
            <p>
              Entre em contacto para uma consulta personalizada e descubra como
              posso ajudá-lo a alcançar os seus objetivos.
            </p>
            <div className='ctaButtons'>
              <WhatsAppChat contactType='general' />
              <a href='/sell-property' className='btn-secondary'>
                Quero Vender
              </a>
              <a href='/contact' className='btn-outline'>
                Contactar
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
