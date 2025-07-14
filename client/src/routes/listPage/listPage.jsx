// client/src/routes/listPage/listPage.jsx
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import './listPage.scss';
import Filter from '../../components/filter/Filter';
import Card from '../../components/card/Card';
import Map from '../../components/map/Map';

function ListPage() {
  const data = useLoaderData();

  return (
    <div className='listPage'>
      <div className='listContainer'>
        <div className='wrapper'>
          <Filter />
          <Suspense
            fallback={<div className='loading'>A carregar propriedades...</div>}
          >
            <Await
              resolve={data.postResponse}
              errorElement={
                <div className='error-message'>
                  <p>Erro ao carregar propriedades!</p>
                  <button onClick={() => window.location.reload()}>
                    Tentar novamente
                  </button>
                </div>
              }
            >
              {postResponse => {
                const posts = postResponse?.data || [];

                if (posts.length === 0) {
                  return (
                    <div className='no-results'>
                      <h3>Nenhuma propriedade encontrada</h3>
                      <p>Tente ajustar os filtros de pesquisa</p>
                    </div>
                  );
                }

                return posts.map(post => <Card key={post.id} item={post} />);
              }}
            </Await>
          </Suspense>
        </div>
      </div>

      <div className='mapContainer'>
        <Suspense
          fallback={<div className='map-loading'>A carregar mapa...</div>}
        >
          <Await
            resolve={data.postResponse}
            errorElement={
              <div className='map-error'>
                <p>📍 Erro ao carregar localização</p>
              </div>
            }
          >
            {postResponse => {
              const posts = postResponse?.data || [];

              // Debug: verificar se há posts com coordenadas válidas
              console.log('Posts for map:', posts);
              const validPosts = posts.filter(
                post =>
                  post &&
                  typeof post.latitude === 'number' &&
                  typeof post.longitude === 'number' &&
                  !isNaN(post.latitude) &&
                  !isNaN(post.longitude)
              );

              console.log('Valid posts for map:', validPosts);

              return <Map items={validPosts} />;
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
