import './about.scss';

function AboutPage() {
  return (
    <div className='aboutPage'>
      <div className='hero'>
        <div className='heroContent'>
          <h1>Sobre a Raquel Perez</h1>
          <p>Consultora Imobiliária Especializada no Mercado Português</p>
        </div>
      </div>

      <div className='content'>
        <div className='container'>
          <div className='intro'>
            <div className='textSection'>
              <h2>A Sua Parceira de Confiança no Mercado Imobiliário</h2>
              <p>
                Com mais de 16 anos de experiência no mercado imobiliário
                português, dedico-me a ajudar famílias e investidores a
                encontrar a propriedade ideal. A minha missão é transformar
                sonhos em realidade, oferecendo um serviço personalizado e
                profissional.
              </p>
              <p>
                Especializo-me em propriedades residenciais e comerciais em
                Lisboa, Porto e principais cidades portuguesas, com um
                conhecimento profundo do mercado local e das melhores
                oportunidades de investimento.
              </p>
            </div>
            <div className='imageSection'>
              <img src='/rq-profile.jpg' alt='Raquel Perez' />
            </div>
          </div>

          <div className='services'>
            <h2>Os Meus Serviços</h2>
            <div className='serviceGrid'>
              <div className='serviceCard'>
                <div className='icon'>🏠</div>
                <h3>Compra de Imóveis</h3>
                <p>
                  Ajudo-a a encontrar a casa dos seus sonhos, negociando as
                  melhores condições e preços.
                </p>
              </div>
              <div className='serviceCard'>
                <div className='icon'>💼</div>
                <h3>Venda de Propriedades</h3>
                <p>
                  Marketing profissional e estratégias eficazes para vender o
                  seu imóvel rapidamente.
                </p>
              </div>
              <div className='serviceCard'>
                <div className='icon'>🔑</div>
                <h3>Arrendamento</h3>
                <p>
                  Gestão completa de arrendamentos, desde a procura de
                  inquilinos até à gestão contratual.
                </p>
              </div>
              <div className='serviceCard'>
                <div className='icon'>📊</div>
                <h3>Consultoria de Investimento</h3>
                <p>
                  Análise de mercado e aconselhamento para os melhores
                  investimentos imobiliários.
                </p>
              </div>
              <div className='serviceCard'>
                <div className='icon'>📋</div>
                <h3>Avaliação de Imóveis</h3>
                <p>
                  Avaliações precisas e atualizadas do valor de mercado da sua
                  propriedade.
                </p>
              </div>
              <div className='serviceCard'>
                <div className='icon'>🤝</div>
                <h3>Acompanhamento Legal</h3>
                <p>
                  Suporte completo em todos os aspectos legais e burocráticos da
                  transação.
                </p>
              </div>
            </div>
          </div>

          <div className='stats'>
            <h2>Resultados que Falam por Si</h2>
            <div className='statsGrid'>
              <div className='statCard'>
                <div className='number'>200+</div>
                <div className='label'>Prémios e Reconhecimentos</div>
              </div>
              <div className='statCard'>
                <div className='number'>2000+</div>
                <div className='label'>Propriedades Vendidas</div>
              </div>
              <div className='statCard'>
                <div className='number'>16+</div>
                <div className='label'>Anos de Experiência</div>
              </div>
              <div className='statCard'>
                <div className='number'>98%</div>
                <div className='label'>Clientes Satisfeitos</div>
              </div>
            </div>
          </div>

          <div className='values'>
            <h2>Os Meus Valores</h2>
            <div className='valuesList'>
              <div className='valueItem'>
                <h3>Transparência</h3>
                <p>
                  Comunicação clara e honesta em todas as etapas do processo.
                </p>
              </div>
              <div className='valueItem'>
                <h3>Profissionalismo</h3>
                <p>
                  Serviço de excelência com conhecimento especializado do
                  mercado.
                </p>
              </div>
              <div className='valueItem'>
                <h3>Confiança</h3>
                <p>
                  Construo relacionamentos duradouros baseados na confiança
                  mútua.
                </p>
              </div>
              <div className='valueItem'>
                <h3>Resultados</h3>
                <p>
                  Foco em alcançar os melhores resultados para os meus clientes.
                </p>
              </div>
            </div>
          </div>

          <div className='testimonials'>
            <h2>O Que Dizem os Meus Clientes</h2>
            <div className='testimonialGrid'>
              <div className='testimonial'>
                <p>
                  "A Raquel foi fundamental para encontrarmos a nossa casa de
                  sonho em Cascais. O seu profissionalismo e dedicação são
                  excecionais."
                </p>
                <div className='author'>- Maria Silva, Lisboa</div>
              </div>
              <div className='testimonial'>
                <p>
                  "Vendemos o nosso apartamento em tempo recorde graças à
                  estratégia de marketing da Raquel. Recomendo vivamente!"
                </p>
                <div className='author'>- João Santos, Porto</div>
              </div>
              <div className='testimonial'>
                <p>
                  "Excelente acompanhamento durante todo o processo de compra. A
                  Raquel tornou tudo muito simples e transparente."
                </p>
                <div className='author'>- Ana Costa, Braga</div>
              </div>
            </div>
          </div>

          <div className='contact'>
            <h2>Vamos Conversar?</h2>
            <p>
              Pronta para ajudá-la a encontrar a propriedade ideal ou vender o
              seu imóvel nas melhores condições.
            </p>
            <div className='contactInfo'>
              <div className='contactItem'>
                <strong>Telefone:</strong> +351 912 345 678
              </div>
              <div className='contactItem'>
                <strong>Email:</strong> raquel.perez@email.com
              </div>
              <div className='contactItem'>
                <strong>Escritório:</strong> Av. da Liberdade, 123 - Lisboa
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
