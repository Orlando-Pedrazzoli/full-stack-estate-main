// client/src/routes/singlePage/singlePage.jsx
import { Suspense, useState } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import ImageModal from '../../components/imageModal/ImageModal';
import Map from '../../components/map/Map';
import './singlePage.scss';

function SinglePage() {
  const data = useLoaderData();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

                // Preparar informações para o slider
                const propertyInfo = {
                  title: post.title,
                  address: post.address,
                  price: post.price,
                  bedroom: post.bedroom,
                  bathroom: post.bathroom,
                };

                return (
                  <div className='content'>
                    {/* Lado Esquerdo - Conteúdo Principal */}
                    <div className='left'>
                      <div className='content-inner'>
                        {/* Carousel de Imagens */}
                        <div className='propertyCarousel'>
                          <div className='carouselContainer'>
                            <img
                              src={post.images[currentImageIndex || 0]}
                              alt={`${post.title} - Imagem ${
                                (currentImageIndex || 0) + 1
                              }`}
                              onClick={() => setIsModalOpen(true)}
                              style={{ cursor: 'pointer' }}
                            />

                            {/* Setas de Navegação */}
                            {post.images.length > 1 && (
                              <>
                                <button
                                  className='carouselArrow carouselArrow--left'
                                  onClick={e => {
                                    e.stopPropagation();
                                    const newIndex =
                                      (currentImageIndex || 0) === 0
                                        ? post.images.length - 1
                                        : (currentImageIndex || 0) - 1;
                                    setCurrentImageIndex(newIndex);
                                  }}
                                  aria-label='Imagem anterior'
                                >
                                  <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                  >
                                    <path
                                      d='M15 18L9 12L15 6'
                                      stroke='currentColor'
                                      strokeWidth='2'
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                    />
                                  </svg>
                                </button>

                                <button
                                  className='carouselArrow carouselArrow--right'
                                  onClick={e => {
                                    e.stopPropagation();
                                    const newIndex =
                                      (currentImageIndex || 0) ===
                                      post.images.length - 1
                                        ? 0
                                        : (currentImageIndex || 0) + 1;
                                    setCurrentImageIndex(newIndex);
                                  }}
                                  aria-label='Próxima imagem'
                                >
                                  <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                  >
                                    <path
                                      d='M9 18L15 12L9 6'
                                      stroke='currentColor'
                                      strokeWidth='2'
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                    />
                                  </svg>
                                </button>
                              </>
                            )}

                            {/* Contador de Imagens */}
                            {post.images.length > 1 && (
                              <div className='imageCounter'>
                                <svg
                                  width='16'
                                  height='16'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                >
                                  <rect
                                    x='3'
                                    y='3'
                                    width='18'
                                    height='18'
                                    rx='2'
                                    ry='2'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                  />
                                  <circle
                                    cx='8.5'
                                    cy='8.5'
                                    r='1.5'
                                    fill='currentColor'
                                  />
                                  <polyline
                                    points='21,15 16,10 5,21'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                  />
                                </svg>
                                {(currentImageIndex || 0) + 1} /{' '}
                                {post.images.length}
                              </div>
                            )}

                            {/* Indicadores de Posição */}
                            {post.images.length > 1 && (
                              <div className='carouselIndicators'>
                                {post.images.map((_, index) => (
                                  <button
                                    key={index}
                                    className={`indicator ${
                                      (currentImageIndex || 0) === index
                                        ? 'active'
                                        : ''
                                    }`}
                                    onClick={e => {
                                      e.stopPropagation();
                                      setCurrentImageIndex(index);
                                    }}
                                    aria-label={`Ir para imagem ${index + 1}`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Modal com Grid de Imagens */}
                        <ImageModal
                          images={post.images}
                          isOpen={isModalOpen}
                          onClose={() => setIsModalOpen(false)}
                          initialIndex={currentImageIndex}
                        />

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
                                  const RAQUEL_WHATSAPP = '351933859122';
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
