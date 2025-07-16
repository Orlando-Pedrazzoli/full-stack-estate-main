import { useState } from 'react';
import './searchBar.scss';
import { Link } from 'react-router-dom';

const types = ['buy', 'rent'];

function SearchBar() {
  const [query, setQuery] = useState({
    type: 'buy',
    city: '',
    minPrice: 0,
    maxPrice: 0,
  });

  // Cidades portuguesas populares
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
  ];

  const switchType = val => {
    setQuery(prev => ({ ...prev, type: val }));
  };

  const handleChange = e => {
    setQuery(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
      <form>
        <input
          type='text'
          name='city'
          placeholder='Cidade (ex: Lisboa, Porto...)'
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
        <Link
          to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
        >
          <button className='searchButton'>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className='searchIcon'
            >
              <path 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;