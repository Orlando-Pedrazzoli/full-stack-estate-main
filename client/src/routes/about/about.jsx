import './about.scss';
import WhatsAppChat from '../../components/whatsapp/WhatsAppChat';

function AboutPage() {
  return (
    <div className='aboutPage'>
      {/* Hero Section */}
      <div className='hero'>
        <div className='heroContent'>
          <div className='heroText'>
            <div className='badge'>Century 21 Portugal</div>
            <h1>Raquel Perez</h1>
            <h2>Consultora Imobiliária Especializada</h2>
            <p className='heroSubtitle'>
              Advogada de formação com mais de 16 anos de experiência jurídica.
              Especializada em consultoria imobiliária premium com forte atuação
              em Lisboa e conexões internacionais no Brasil, Espanha, EUA e
              Canadá.
            </p>
            <div className='heroStats'>
              <div className='stat'>
                <span className='number'>2000+</span>
                <span className='label'>Propriedades Vendidas</span>
              </div>
              <div className='stat'>
                <span className='number'>16+</span>
                <span className='label'>Anos de Experiência</span>
              </div>
              <div className='stat'>
                <span className='number'>98%</span>
                <span className='label'>Clientes Satisfeitos</span>
              </div>
            </div>
            <div className='heroCTA'>
              <WhatsAppChat contactType='general' />
            </div>
          </div>
          <div className='heroImage'>
            <img
              src='/raquel-foto.png'
              alt='Raquel Perez - Consultora Imobiliária'
            />
            <div className='credentialBadge'>
              <div className='badgeContent'>
                <span className='title'>Consultora Certificada</span>
                <div className='rating'>★★★★★</div>
                <span className='subtitle'>Century 21</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <section className='servicesOverview'>
        <div className='container'>
          <div className='sectionHeader'>
            <h2>Serviços Premium</h2>
            <p>
              Acompanhamento profissional completo para o seu projeto
              imobiliário
            </p>
          </div>

          <div className='servicesGrid'>
            <div className='serviceCard'>
              <div className='serviceIcon'>
                <span className='emoji'>📊</span>
              </div>
              <h3>Avaliação e Análise de Mercado</h3>
              <p>
                Estudo comparativo profissional com ferramentas especializadas
                para posicionamento estratégico de preços.
              </p>
            </div>

            <div className='serviceCard'>
              <div className='serviceIcon'>
                <span className='emoji'>📱</span>
              </div>
              <h3>Marketing Digital Integrado</h3>
              <p>
                Campanhas pagas no Facebook, Instagram e principais portais
                imobiliários nacionais e internacionais.
              </p>
            </div>

            <div className='serviceCard'>
              <div className='serviceIcon'>
                <span className='emoji'>📸</span>
              </div>
              <h3>Home Staging & Fotografia</h3>
              <p>
                Preparação e encenação do imóvel, reportagem fotográfica
                profissional e vídeos promocionais 360°.
              </p>
            </div>

            <div className='serviceCard'>
              <div className='serviceIcon'>
                <span className='emoji'>⚖️</span>
              </div>
              <h3>Apoio Jurídico Especializado</h3>
              <p>
                Validação documental, acompanhamento legal e seguro de
                responsabilidade civil incluído.
              </p>
            </div>

            <div className='serviceCard'>
              <div className='serviceIcon'>
                <span className='emoji'>🌐</span>
              </div>
              <h3>Rede Century 21 Mundial</h3>
              <p>
                Acesso à maior rede imobiliária mundial com motor de busca
                inteligente para compradores qualificados.
              </p>
            </div>

            <div className='serviceCard'>
              <div className='serviceIcon'>
                <span className='emoji'>🏦</span>
              </div>
              <h3>Intermediação de Crédito</h3>
              <p>
                Apoio especializado na obtenção de crédito bancário para
                potenciais compradores do seu imóvel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className='detailedServices'>
        <div className='container'>
          <h2>Processo Completo de Venda</h2>

          {/* Marketing & Promotion */}
          <div className='serviceSection'>
            <div className='serviceContent'>
              <h3>Forte Investimento na Campanha de Divulgação</h3>
              <div className='serviceList'>
                <div className='serviceItem'>
                  <span className='checkmark'>✓</span>
                  <div>
                    <strong>Divulgação paga no Facebook e Instagram</strong>
                    <p>Campanhas segmentadas para o público-alvo ideal</p>
                  </div>
                </div>
                <div className='serviceItem'>
                  <span className='checkmark'>✓</span>
                  <div>
                    <strong>
                      Publicação em portais imobiliários nacionais e
                      internacionais
                    </strong>
                    <p>Máxima exposição em todas as plataformas relevantes</p>
                  </div>
                </div>
                <div className='serviceItem'>
                  <span className='checkmark'>✓</span>
                  <div>
                    <strong>Colocação no site Century 21</strong>
                    <p>Rede líder mundial de mediação imobiliária</p>
                  </div>
                </div>
                <div className='serviceItem'>
                  <span className='checkmark'>✓</span>
                  <div>
                    <strong>Motor de busca inteligente</strong>
                    <p>Contacto direto com compradores qualificados</p>
                  </div>
                </div>
                <div className='serviceItem'>
                  <span className='checkmark'>✓</span>
                  <div>
                    <strong>Networking com outras redes imobiliárias</strong>
                    <p>Partilha do negócio para maximizar oportunidades</p>
                  </div>
                </div>
                <div className='serviceItem'>
                  <span className='checkmark'>✓</span>
                  <div>
                    <strong>Open House profissional</strong>
                    <p>Eventos para profissionais e potenciais clientes</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='serviceImage'>
              <img
                src='/service-marketing-detail.jpg'
                alt='Marketing Imobiliário'
              />
            </div>
          </div>

          {/* Property Preparation */}
          <div className='serviceSection reverse'>
            <div className='serviceImage'>
              <img
                src='/service-preparation-detail.jpg'
                alt='Preparação de Imóveis'
              />
            </div>
            <div className='serviceContent'>
              <h3>Preparação e Valorização do Imóvel</h3>
              <div className='serviceList'>
                <div className='serviceItem'>
                  <span className='checkmark'>✓</span>
                  <div>
                    <strong>Home Staging profissional</strong>
                    <p>
                      Mobilar e decorar para venda ou preparação para fotografia
                    </p>
                  </div>
                </div>
                <div className='serviceItem'>
                  <span className='checkmark'>✓</span>
                  <div>
                    <strong>Imagens virtuais</strong>
                    <p>
                      Alternativa digital quando staging físico não é viável
                    </p>
                  </div>
                </div>
                <div className='serviceItem'>
                  <span className='checkmark'>✓</span>
                  <div>
                    <strong>Reportagem fotográfica profissional</strong>
                    <p>Sessão completa com equipamento especializado</p>
                  </div>
                </div>
                <div className='serviceItem'>
                  <span className='checkmark'>✓</span>
                  <div>
                    <strong>Vídeo promocional ou visita virtual 360°</strong>
                    <p>Tours imersivos para atrair mais interessados</p>
                  </div>
                </div>
                <div className='serviceItem'>
                  <span className='checkmark'>✓</span>
                  <div>
                    <strong>Relatórios mensais de acompanhamento</strong>
                    <p>Transparência total sobre o progresso da venda</p>
                  </div>
                </div>
                <div className='serviceItem'>
                  <span className='checkmark'>✓</span>
                  <div>
                    <strong>Alertas SMS em tempo real</strong>
                    <p>Notificações de visitas e propostas apresentadas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Market Analysis */}
          <div className='serviceSection'>
            <div className='serviceContent'>
              <h3>Análise de Mercado e Suporte Jurídico</h3>
              <div className='serviceDescription'>
                <p>
                  Com formação jurídica e equipa multidisciplinar, oferecemos
                  suporte completo em todas as vertentes da transação
                  imobiliária.
                </p>
              </div>
              <div className='serviceList'>
                <div className='serviceItem'>
                  <span className='checkmark'>✓</span>
                  <div>
                    <strong>Estudo comparativo de mercado</strong>
                    <p>
                      Ferramentas profissionais para posicionamento estratégico
                    </p>
                  </div>
                </div>
                <div className='serviceItem'>
                  <span className='checkmark'>✓</span>
                  <div>
                    <strong>Avaliação independente bancária</strong>
                    <p>Defesa fundamentada do preço junto aos interessados</p>
                  </div>
                </div>
                <div className='serviceItem'>
                  <span className='checkmark'>✓</span>
                  <div>
                    <strong>Diagnóstico documental completo</strong>
                    <p>Validação jurídica de toda a documentação necessária</p>
                  </div>
                </div>
                <div className='serviceItem'>
                  <span className='checkmark'>✓</span>
                  <div>
                    <strong>Qualificação rigorosa de clientes</strong>
                    <p>Gestão profissional de visitas e propostas</p>
                  </div>
                </div>
                <div className='serviceItem'>
                  <span className='checkmark'>✓</span>
                  <div>
                    <strong>Acompanhamento na assinatura</strong>
                    <p>Presença em todas as etapas contratuais</p>
                  </div>
                </div>
                <div className='serviceItem'>
                  <span className='checkmark'>✓</span>
                  <div>
                    <strong>Seguro de responsabilidade civil</strong>
                    <p>Proteção completa durante todo o processo</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='serviceImage'>
              <img
                src='/service-analysis-detail.jpg'
                alt='Análise de Mercado'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className='experience'>
        <div className='container'>
          <div className='experienceContent'>
            <div className='experienceText'>
              <h2>Experiência e Formação</h2>
              <div className='highlight'>
                <h3>Formação Jurídica Especializada</h3>
                <p>
                  Advogada com mais de 10 anos de experiência jurídica,
                  proporcionando segurança e conhecimento técnico em todas as
                  transações imobiliárias.
                </p>
              </div>

              <div className='highlight'>
                <h3>Rede Internacional</h3>
                <p>
                  Conexões estabelecidas no Brasil, Espanha, EUA e Canadá,
                  recebendo frequentemente investidores internacionais
                  interessados no mercado português.
                </p>
              </div>

              <div className='highlight'>
                <h3>Mercado Premium</h3>
                <p>
                  Especialização em propriedades de alto valor em Lisboa e
                  principais cidades portuguesas, com foco em clientes exigentes
                  e investidores sofisticados.
                </p>
              </div>

              <div className='commitment'>
                <h3>O Meu Compromisso</h3>
                <p>
                  Trabalho com ética, transparência e total dedicação. O meu
                  compromisso é com o sucesso do seu negócio e a sua plena
                  satisfação. Cada cliente recebe atenção personalizada e
                  acompanhamento profissional em todas as etapas.
                </p>
              </div>
            </div>

            <div className='experienceImage'>
              <img
                src='/raquel-foto.png'
                alt='Raquel Perez - Experiência Profissional'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='testimonials'>
        <div className='container'>
          <h2>Testemunhos dos Nossos Clientes</h2>
          <div className='testimonialsGrid'>
            <div className='testimonial'>
              <div className='testimonialContent'>
                <div className='quote'>"</div>
                <p>
                  A Raquel foi fundamental para vendermos a nossa propriedade em
                  Cascais. O seu conhecimento do mercado e rede de contactos
                  resultou numa venda rápida e pelo preço desejado.
                </p>
                <div className='testimonialAuthor'>
                  <div className='authorInfo'>
                    <strong>Maria e João Silva</strong>
                    <span>Villa em Cascais - €1.200.000</span>
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
                  as especificidades do mercado português. A Raquel superou
                  todas as expectativas.
                </p>
                <div className='testimonialAuthor'>
                  <div className='authorInfo'>
                    <strong>Carlos Mendes</strong>
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
                  O apoio jurídico da Raquel foi decisivo. A sua formação em
                  Direito garantiu que todos os aspectos legais fossem tratados
                  com rigor e profissionalismo.
                </p>
                <div className='testimonialAuthor'>
                  <div className='authorInfo'>
                    <strong>Ana Costa</strong>
                    <span>Apartamento T4 em Lisboa</span>
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
            <h2>Pronto para Valorizar o Seu Patrimônio?</h2>
            <p>
              Entre em contacto para uma consulta personalizada e descubra como
              posso ajudá-lo a alcançar os seus objetivos imobiliários.
            </p>
            <div className='ctaButtons'>
              <WhatsAppChat contactType='general' />
              <a href='/contact' className='ctaBtn secondary'>
                Contactar por Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
