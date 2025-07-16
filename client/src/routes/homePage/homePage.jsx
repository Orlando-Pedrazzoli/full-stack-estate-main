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
    </div>
  );
}

export default HomePage;
