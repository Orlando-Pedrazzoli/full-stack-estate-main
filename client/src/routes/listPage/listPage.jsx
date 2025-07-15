// client/src/routes/listPage/listPage.jsx
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
    console.log('🔍 Filtros atuais da URL:', filters);
  }, [searchParams]);

  // Função para obter texto descritivo do filtro
  const getFilterDescription = () => {
    const parts = [];

    if (currentFilter.type === 'buy') {
      parts.push('Propriedades à venda');
    } else if (currentFilter.type === 'rent') {
      parts.push('Propriedades para arrendar');
    } else {
      parts.push('Todas as propriedades');
    }

    if (currentFilter.city) {
      parts.push(`em ${currentFilter.city}`);
    }

    if (currentFilter.minPrice || currentFilter.maxPrice) {
      const min = currentFilter.minPrice
        ? `€${parseInt(currentFilter.minPrice).toLocaleString('pt-PT')}`
        : '';
      const max = currentFilter.maxPrice
        ? `€${parseInt(currentFilter.maxPrice).toLocaleString('pt-PT')}`
        : '';

      if (min && max) {
        parts.push(`entre ${min} e ${max}`);
      } else if (min) {
        parts.push(`a partir de ${min}`);
      } else if (max) {
        parts.push(`até ${max}`);
      }
    }

    if (currentFilter.bedroom) {
      const bedrooms = parseInt(currentFilter.bedroom);
      parts.push(`${bedrooms} ${bedrooms === 1 ? 'quarto' : 'quartos'}`);
    }

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
          {/* Cabeçalho com filtros ativos */}
          <div className='listHeader'>
            <h1 className='listTitle'>{getFilterDescription()}</h1>
            <div className='activeFilters'>
              {Object.entries(currentFilter).map(([key, value]) => {
                if (!value) return null;

                let displayValue = value;
                if (key === 'type') {
                  displayValue = value === 'buy' ? 'Venda' : 'Arrendamento';
                } else if (key === 'property') {
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

          {/* Componente de Filtros */}
          <Filter />

          {/* Lista de Resultados com Loading */}
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
                          <div className='noResultsIcon'>🏠</div>
                          <h3>Nenhuma propriedade encontrada</h3>
                          <p>
                            Tente ajustar os filtros de pesquisa ou explore
                            outras opções.
                          </p>
                          <div className='suggestions'>
                            <h4>Sugestões:</h4>
                            <ul>
                              <li>
                                Verifique se a cidade está escrita corretamente
                              </li>
                              <li>
                                Experimente uma faixa de preços mais ampla
                              </li>
                              <li>
                                Remova alguns filtros para ver mais resultados
                              </li>
                            </ul>
                          </div>
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

      {/* Container do Mapa */}
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

              return (
                <div className='mapWrapper'>
                  <div className='mapHeader'>
                    <h3>📍 Localização das Propriedades</h3>
                    <div className='mapLegend'>
                      <div className='legendItem'>
                        <span className='legendIcon buy'></span>
                        <span>Venda</span>
                      </div>
                      <div className='legendItem'>
                        <span className='legendIcon rent'></span>
                        <span>Arrendamento</span>
                      </div>
                    </div>
                  </div>

                  <Map
                    items={posts}
                    className={posts.length === 0 ? 'no-results' : ''}
                  />

                  {posts.length > 0 && (
                    <div className='mapFooter'>
                      <small>
                        Clique nos pins para ver detalhes das propriedades
                      </small>
                    </div>
                  )}
                </div>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
