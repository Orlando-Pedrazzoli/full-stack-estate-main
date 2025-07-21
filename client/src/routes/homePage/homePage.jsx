import { useContext, useState, useEffect, useRef } from 'react';
import SearchBar from '../../components/searchBar/SearchBar';
import WhatsAppChat from '../../components/whatsapp/WhatsAppChat';
import './homePage.scss';
import { AuthContext } from '../../context/AuthContext';

// Hook personalizado para animação de contador
const useCountUp = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const startValue = start;
    const endValue = end;

    const animate = currentTime => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Função de easing para uma animação mais suave
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const currentCount = Math.floor(
        startValue + (endValue - startValue) * easeOutQuart
      );
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration, start]);

  return [count, countRef];
};

// Componente para cada estatística animada
const AnimatedStat = ({ number, label, suffix = '', delay = 0 }) => {
  const [count, ref] = useCountUp(number, 2500 + delay);

  return (
    <div className='stat' ref={ref}>
      <span className='number animated-number'>
        {count.toLocaleString('pt-PT')}
        {suffix}
      </span>
      <span className='label'>{label}</span>
    </div>
  );
};

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
              <AnimatedStat
                number={10}
                suffix='+'
                label='Anos de Experiência'
                delay={0}
              />
              <AnimatedStat
                number={35}
                suffix='+'
                label='Prêmios e Reconhecimentos'
                delay={300}
              />
              <AnimatedStat
                number={20}
                suffix='+'
                label='Imóveis Vendidos'
                delay={600}
              />
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
