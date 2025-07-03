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
            {type === 'buy' ? 'Comprar' : 'Arrendar'} {/* ← Português */}
          </button>
        ))}
      </div>
      <form>
        <input
          type='text'
          name='city'
          placeholder='Cidade (ex: Lisboa, Porto...)'
          onChange={handleChange}
          list='cities' // ← Adiciona autocomplete
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
          <button>
            <img src='/search.png' alt='' />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
