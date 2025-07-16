import { useState } from 'react';
import './filter.scss';
import { useSearchParams } from 'react-router-dom';

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get('type') || '',
    city: searchParams.get('city') || '',
    property: searchParams.get('property') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedroom: searchParams.get('bedroom') || '',
  });

  // Cidades portuguesas principais
  const cities = [
    'Lisboa',
    'Porto',
    'Braga',
    'Coimbra',
    'Faro',
    'Setúbal',
    'Aveiro',
    'Évora',
    'Leiria',
    'Viseu',
    'Guimarães',
    'Cascais',
    'Vila Nova de Gaia',
    'Almada',
    'Funchal',
    'Sintra',
    'Odivelas',
    'Loures',
    'Matosinhos',
    'Gondomar',
  ];

  const handleChange = e => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  const handleClearFilters = () => {
    const clearedQuery = {
      type: '',
      city: '',
      property: '',
      minPrice: '',
      maxPrice: '',
      bedroom: '',
    };
    setQuery(clearedQuery);
    setSearchParams({});
  };

  const cityName = searchParams.get('city');
  const resultCount = searchParams.toString() ? 'resultados' : 'propriedades';

  return (
    <div className='filter'>
      <div className='header'>
        <h1>
          {cityName ? (
            <>
              Resultados de pesquisa para <b>{cityName}</b>
            </>
          ) : (
            'Pesquisar Propriedades'
          )}
        </h1>
        {searchParams.toString() && (
          <button className='clearButton' onClick={handleClearFilters}>
            Limpar filtros
          </button>
        )}
      </div>

      <div className='filterForm'>
        <div className='top'>
          <div className='item'>
            <label htmlFor='city'>Localização</label>
            <input
              type='text'
              id='city'
              name='city'
              placeholder='Escolha uma cidade'
              onChange={handleChange}
              value={query.city}
              list='cities'
            />
            <datalist id='cities'>
              {cities.map(city => (
                <option key={city} value={city} />
              ))}
            </datalist>
          </div>
        </div>

        <div className='bottom'>
          <div className='item'>
            <label htmlFor='type'>Tipo de Negócio</label>
            <select
              name='type'
              id='type'
              onChange={handleChange}
              value={query.type}
            >
              <option value=''>Qualquer</option>
              <option value='buy'>Comprar</option>
              <option value='rent'>Arrendar</option>
            </select>
          </div>

          <div className='item'>
            <label htmlFor='property'>Tipo de Imóvel</label>
            <select
              name='property'
              id='property'
              onChange={handleChange}
              value={query.property}
            >
              <option value=''>Qualquer</option>
              <option value='apartment'>Apartamento</option>
              <option value='house'>Moradia</option>
              <option value='condo'>Condomínio</option>
              <option value='land'>Terreno</option>
            </select>
          </div>

          <div className='item'>
            <label htmlFor='minPrice'>Preço Mínimo (€)</label>
            <input
              type='number'
              id='minPrice'
              name='minPrice'
              placeholder='Ex: 100000'
              onChange={handleChange}
              value={query.minPrice}
              min='0'
              step='1000'
            />
          </div>

          <div className='item'>
            <label htmlFor='maxPrice'>Preço Máximo (€)</label>
            <input
              type='number'
              id='maxPrice'
              name='maxPrice'
              placeholder='Ex: 500000'
              onChange={handleChange}
              value={query.maxPrice}
              min='0'
              step='1000'
            />
          </div>

          <div className='item'>
            <label htmlFor='bedroom'>Nº de Quartos</label>
            <select
              name='bedroom'
              id='bedroom'
              onChange={handleChange}
              value={query.bedroom}
            >
              <option value=''>Qualquer</option>
              <option value='1'>T1 (1 quarto)</option>
              <option value='2'>T2 (2 quartos)</option>
              <option value='3'>T3 (3 quartos)</option>
              <option value='4'>T4 (4 quartos)</option>
              <option value='5'>T5+ (5+ quartos)</option>
            </select>
          </div>

          <div className='buttonGroup'>
            <button className='searchButton' onClick={handleFilter}>
              <img src='/search.png' alt='Pesquisar' />
              <span>Pesquisar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
