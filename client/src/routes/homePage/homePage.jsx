import { useContext } from 'react';
import SearchBar from '../../components/searchBar/SearchBar';
import './homePage.scss';
import { AuthContext } from '../../context/AuthContext';

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='homePage'>
      <div className='textContainer'>
        <div className='wrapper'>
          <h1 className='title'>
            Encontre o Imóvel Ideal com Quem Entende do Assunto
          </h1>
          <p>
            Sou advogada de formação, com mais de 10 anos de experiência
            jurídica. Desde que me mudei para Portugal, abracei a consultoria
            imobiliária com entusiasmo — uma profissão dinâmica e apaixonante.
            Com forte atuação em Lisboa e outras regiões do país, mantenho uma
            ampla rede de conexões no Brasil, Espanha, EUA e Canadá, recebendo
            frequentemente investidores internacionais. Ofereço um serviço
            completo e personalizado, que inclui:
            <br />
            ✔️ Estudo de Mercado aprofundado
            <br />
            ✔️ Plano de Marketing estratégico
            <br />
            ✔️ Apoio Jurídico e Processual durante todo o processo Trabalho com
            ética, transparência e total dedicação. Meu compromisso é com o
            sucesso do seu negócio e a sua plena satisfação.
          </p>
          <SearchBar />
          <div className='boxes'>
            <div className='box'>
              <h1>5+</h1>
              <h2>Anos de Experiência</h2>
            </div>
            <div className='box'>
              <h1>20</h1>
              <h2>Prêmios e Reconhecimentos</h2>
            </div>
            <div className='box'>
              <h1>200+</h1>
              <h2>Imóveis Disponíveis</h2>
            </div>
          </div>
        </div>
      </div>
      <div className='imgContainer'>
        <img src='/raquel-foto.png' alt='' />
      </div>
    </div>
  );
}

export default HomePage;
