import { useState } from 'react';
import './searchBar.scss';
import { useNavigate } from 'react-router-dom';

const types = ['buy', 'rent'];

function SearchBar() {
  const [query, setQuery] = useState({
    type: 'buy',
    city: '',
    minPrice: 0,
    maxPrice: 0,
  });
  const navigate = useNavigate();

  // ✅ Apenas Lisboa, Sintra, Almada e Mafra (organizado e mais coerente)
  const cities = [
    // Lisboa e arredores
    'Lisboa',
    'Amadora',
    'Cascais',
    'Loures',
    'Odivelas',
    'Oeiras',
    'Vila Franca de Xira',

    // Sintra
    'Agualva',
    'Algueirão–Mem Martins',
    'Belas',
    'Cacém',
    'Colares',
    'Massamá',
    'Mira-Sintra',
    'Queluz',
    'Rio de Mouro',
    'São João das Lampas',
    'Sintra',
    'Terrugem',

    // Almada
    'Almada',
    'Cacilhas',
    'Charneca de Caparica',
    'Costa da Caparica',
    'Feijó',
    'Laranjeiro',
    'Pragal',
    'Sobreda',
    'Trafaria',

    // Mafra
    'Azueira',
    'Carvoeira',
    'Cheleiros',
    'Encarnação',
    'Ericeira',
    'Igreja Nova',
    'Malveira',
    'Mafra',
    'Milharado',
    'Santo Isidoro',
    'Sobral da Abelheira',
    'Venda do Pinheiro',
  ];

  const switchType = val => {
    setQuery(prev => ({ ...prev, type: val }));
  };

  const handleChange = e => {
    setQuery(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = e => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.type) params.append('type', query.type);
    if (query.city) params.append('city', query.city);
    if (query.minPrice > 0) params.append('minPrice', query.minPrice);
    if (query.maxPrice > 0) params.append('maxPrice', query.maxPrice);
    navigate(`/list?${params.toString()}`);
  };

  return (
    <div className='searchBar'>
      <div className='type'>
        {types.map(type => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? 'active' : ''}
          >
            {type === 'buy' ? 'Comprar' : 'Arrendar'}
          </button>
        ))}
      </div>
      <form onSubmit={handleSearch}>
        <input
          type='text'
          name='city'
          placeholder='Localidade ou concelho (ex: Sintra, Ericeira...)'
          onChange={handleChange}
          list='cities'
        />
        <datalist id='cities'>
          {cities.map(city => (
            <option key={city} value={city} />
          ))}
        </datalist>

        <input
          type='number'
          name='minPrice'
          min={0}
          max={10000000}
          placeholder='Preço Mín (€)'
          onChange={handleChange}
        />
        <input
          type='number'
          name='maxPrice'
          min={0}
          max={10000000}
          placeholder='Preço Máx (€)'
          onChange={handleChange}
        />
        <button type='submit' className='searchButton'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='searchIcon'
          >
            <path
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              stroke='currentColor'
              strokeWidth='2.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
