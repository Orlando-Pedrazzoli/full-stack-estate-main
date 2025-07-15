import { Suspense, useEffect, useState } from 'react';
import { Await, useLoaderData, useSearchParams } from 'react-router-dom';
import Filter from '../../components/filter/Filter';
import Card from '../../components/card/Card';
import Map from '../../components/map/Map';
import './listPage.scss';

function ListPage() {
  const data = useLoaderData();
  const [searchParams] = useSearchParams();
  const [currentFilter, setCurrentFilter] = useState({});

  // Extrair filtros da URL
  useEffect(() => {
    const filters = {
      type: searchParams.get('type'),
      city: searchParams.get('city'),
      minPrice: searchParams.get('minPrice'),
      maxPrice: searchParams.get('maxPrice'),
      bedroom: searchParams.get('bedroom'),
      property: searchParams.get('property'),
    };
    setCurrentFilter(filters);
  }, [searchParams]);

  // Texto descritivo do filtro
  const getFilterDescription = () => {
    const parts = [];
    if (currentFilter.type === 'buy') parts.push('Propriedades à venda');
    else if (currentFilter.type === 'rent')
      parts.push('Propriedades para arrendar');
    else parts.push('Todas as propriedades');

    if (currentFilter.city) parts.push(`em ${currentFilter.city}`);

    if (currentFilter.minPrice || currentFilter.maxPrice) {
      const min = currentFilter.minPrice
        ? `€${parseInt(currentFilter.minPrice).toLocaleString('pt-PT')}`
        : '';
      const max = currentFilter.maxPrice
        ? `€${parseInt(currentFilter.maxPrice).toLocaleString('pt-PT')}`
        : '';
      if (min && max) parts.push(`entre ${min} e ${max}`);
      else if (min) parts.push(`a partir de ${min}`);
      else if (max) parts.push(`até ${max}`);
    }

    if (currentFilter.bedroom)
      parts.push(
        `${currentFilter.bedroom} ${
          currentFilter.bedroom === '1' ? 'quarto' : 'quartos'
        }`
      );

    if (currentFilter.property) {
      const propertyTypes = {
        apartment: 'Apartamentos',
        house: 'Moradias',
        condo: 'Condomínios',
        land: 'Terrenos',
      };
      parts.push(
        propertyTypes[currentFilter.property] || currentFilter.property
      );
    }

    return parts.join(' ');
  };

  return (
    <div className='listPage'>
      <div className='listContainer'>
        <div className='wrapper'>
          <div className='listHeader'>
            <h1 className='listTitle'>{getFilterDescription()}</h1>
            <div className='activeFilters'>
              {Object.entries(currentFilter).map(([key, value]) => {
                if (!value) return null;
                let displayValue = value;
                if (key === 'type')
                  displayValue = value === 'buy' ? 'Venda' : 'Arrendamento';
                else if (key === 'property') {
                  const types = {
                    apartment: 'Apartamento',
                    house: 'Moradia',
                    condo: 'Condomínio',
                    land: 'Terreno',
                  };
                  displayValue = types[value] || value;
                } else if (key === 'minPrice' || key === 'maxPrice') {
                  displayValue = `€${parseInt(value).toLocaleString('pt-PT')}`;
                } else if (key === 'bedroom') {
                  displayValue = `${value} ${
                    value === '1' ? 'quarto' : 'quartos'
                  }`;
                }
                return (
                  <span key={key} className='filterTag'>
                    {displayValue}
                  </span>
                );
              })}
            </div>
          </div>

          <Filter />

          <Suspense
            fallback={<div className='loading'>Carregando propriedades...</div>}
          >
            <Await
              resolve={data.postResponse}
              errorElement={<p>Erro ao carregar as propriedades!</p>}
            >
              {postResponse => {
                const posts = postResponse.data || [];
                return (
                  <>
                    <div className='resultsInfo'>
                      <span className='resultsCount'>
                        {posts.length}{' '}
                        {posts.length === 1
                          ? 'propriedade encontrada'
                          : 'propriedades encontradas'}
                      </span>
                      {posts.length === 0 && (
                        <div className='noResults'>
                          <h3>Nenhuma propriedade encontrada</h3>
                          <p>
                            Tente ajustar os filtros de pesquisa ou explore
                            outras opções.
                          </p>
                        </div>
                      )}
                    </div>
                    <div className='listContent'>
                      {posts.map(item => (
                        <Card key={item.id} item={item} />
                      ))}
                    </div>
                  </>
                );
              }}
            </Await>
          </Suspense>
        </div>
      </div>

      <div className='mapContainer'>
        <Suspense
          fallback={<div className='mapLoading'>Carregando mapa...</div>}
        >
          <Await
            resolve={data.postResponse}
            errorElement={
              <div className='mapError'>Erro ao carregar o mapa</div>
            }
          >
            {postResponse => {
              const posts = postResponse.data || [];
              return <Map items={posts} />;
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
