// client/src/routes/singlePage/singlePage.jsx
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import Slider from '../../components/slider/Slider';
import Map from '../../components/map/Map';
import './singlePage.scss';

function SinglePage() {
  const data = useLoaderData();

  return (
    <div className='singlePage'>
      <div className='details'>
        <div className='wrapper'>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading post!</p>}
            >
              {postResponse => {
                const post = postResponse.data;

                return (
                  <div className='content'>
                    {/* Lado Esquerdo - Conteúdo Principal */}
                    <div className='left'>
                      <div className='content-inner'>
                        {/* Slider de Imagens */}
                        <Slider images={post.images} />

                        {/* Informações Principais */}
                        <div className='info'>
                          <div className='top'>
                            <div className='post'>
                              <h1>{post.title}</h1>
                              <div className='address'>
                                <img src='/pin.png' alt='' />
                                <span>{post.address}</span>
                              </div>
                              <div className='price'>
                                € {post.price.toLocaleString('pt-PT')}
                              </div>
                            </div>
                            <div className='user'>
                              <img
                                src={post.user.avatar || '/noavatar.jpg'}
                                alt={`Avatar de ${post.user.username}`}
                              />
                              <span>{post.user.username}</span>
                            </div>
                          </div>

                          {/* Descrição */}
                          <div className='bottom'>
                            <div className='description'>
                              <h2>Descrição</h2>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: post.postDetail.desc,
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Características */}
                        <div className='features'>
                          <div className='wrapper'>
                            <p className='title'>Características</p>
                            <div className='listVertical'>
                              <div className='feature'>
                                <img src='/utility.png' alt='Despesas' />
                                <div className='featureText'>
                                  <span>Despesas</span>
                                  <p>
                                    {post.postDetail.utilities ||
                                      'Não especificado'}
                                  </p>
                                </div>
                              </div>
                              <div className='feature'>
                                <img src='/pet.png' alt='Política de Animais' />
                                <div className='featureText'>
                                  <span>Política de Animais</span>
                                  <p>
                                    {post.postDetail.pet || 'Não especificado'}
                                  </p>
                                </div>
                              </div>
                              <div className='feature'>
                                <img
                                  src='/fee.png'
                                  alt='Requisitos de Rendimento'
                                />
                                <div className='featureText'>
                                  <span>Requisitos de Rendimento</span>
                                  <p>
                                    {post.postDetail.income ||
                                      'Não especificado'}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className='listHorizontal'>
                              <div className='size'>
                                <img src='/size.png' alt='Área' />
                                <span>{post.postDetail.size || '-'} m²</span>
                              </div>
                              <div className='size'>
                                <img src='/bed.png' alt='Quartos' />
                                <span>{post.bedroom} quartos</span>
                              </div>
                              <div className='size'>
                                <img src='/bath.png' alt='Casas de banho' />
                                <span>
                                  {post.bathroom} casa
                                  {post.bathroom > 1 ? 's' : ''} de banho
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Proximidades */}
                        {(post.postDetail.school ||
                          post.postDetail.bus ||
                          post.postDetail.restaurant) && (
                          <div className='proximities'>
                            <div className='wrapper'>
                              <p className='title'>Proximidades</p>
                              <div className='listVertical'>
                                {post.postDetail.school && (
                                  <div className='feature'>
                                    <img src='/school.png' alt='Escola' />
                                    <div className='featureText'>
                                      <span>Escola</span>
                                      <p>
                                        {post.postDetail.school}m de distância
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {post.postDetail.bus && (
                                  <div className='feature'>
                                    <img
                                      src='/bus.png'
                                      alt='Paragem de Autocarro'
                                    />
                                    <div className='featureText'>
                                      <span>Paragem de Autocarro</span>
                                      <p>{post.postDetail.bus}m de distância</p>
                                    </div>
                                  </div>
                                )}
                                {post.postDetail.restaurant && (
                                  <div className='feature'>
                                    <img
                                      src='/restaurant.png'
                                      alt='Restaurante'
                                    />
                                    <div className='featureText'>
                                      <span>Restaurante</span>
                                      <p>
                                        {post.postDetail.restaurant}m de
                                        distância
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Botões de Ação */}
                        <div className='actions'>
                          <button
                            className='contactBtn'
                            onClick={() => {
                              // Adicionar lógica de contacto aqui
                              console.log('Contactar sobre imóvel');
                            }}
                          >
                            <img src='/chat.png' alt='' />
                            Contactar sobre este imóvel
                          </button>
                          <button
                            className='saveBtn'
                            onClick={() => {
                              // Adicionar lógica para salvar/remover favoritos
                              console.log('Toggle favorito');
                            }}
                          >
                            <img src='/save.png' alt='' />
                            {post.isSaved
                              ? 'Remover dos Favoritos'
                              : 'Guardar Imóvel'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Lado Direito - Mapa */}
                    <div className='right'>
                      <div className='mapSection'>
                        <div className='mapHeader'>
                          <h3>📍 Localização do Imóvel</h3>
                          <div className='propertyInfo'>
                            <span className='propertyType'>
                              {post.type === 'buy' ? 'Venda' : 'Arrendamento'}
                            </span>
                          </div>
                        </div>

                        <div className='mapContainer'>
                          <Map
                            items={[post]}
                            center={[
                              parseFloat(post.latitude),
                              parseFloat(post.longitude),
                            ]}
                            zoom={15}
                            singleProperty={true}
                          />
                        </div>

                        <div className='mapFooter'>
                          <div className='locationDetails'>
                            <div className='addressFull'>
                              <strong>{post.address}</strong>
                              <span>{post.city}, Portugal</span>
                            </div>

                            {/* Botões de Contacto */}
                            <div className='contactActions'>
                              <button
                                className='whatsappBtn'
                                onClick={() => {
                                  const RAQUEL_WHATSAPP = '351912164220';
                                  const message =
                                    encodeURIComponent(`Olá Raquel! 👋

Tenho interesse na seguinte propriedade:

🏠 *${post.title}*
📍 ${post.address}
💰 €${post.price.toLocaleString('pt-PT')}
🛏️ ${post.bedroom} quartos | 🚿 ${post.bathroom} casas de banho

Poderia fornecer mais informações sobre este imóvel?

Obrigado(a)! 🙏`);
                                  const whatsappURL = `https://wa.me/${RAQUEL_WHATSAPP}?text=${message}`;
                                  window.open(whatsappURL, '_blank');
                                }}
                                aria-label='Contactar via WhatsApp'
                              >
                                <img src='/whatsapp.png' alt='WhatsApp' />
                                Contactar via WhatsApp
                              </button>

                              <button
                                className='directionsBtn'
                                onClick={() => {
                                  const lat = parseFloat(post.latitude);
                                  const lng = parseFloat(post.longitude);
                                  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                                  window.open(googleMapsUrl, '_blank');
                                }}
                                aria-label='Ver direções no Google Maps'
                              >
                                <img src='/directions.png' alt='Direções' />
                                Ver Direções
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
