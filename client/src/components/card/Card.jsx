// client/src/components/card/Card.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './card.scss';

function Card({ item }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openWhatsApp = e => {
    e.preventDefault();
    e.stopPropagation();

    const RAQUEL_WHATSAPP = '351933859122';
    const message = encodeURIComponent(`Olá Raquel! 👋

Tenho interesse na seguinte propriedade:

🏠 *${item.title}*
📍 ${item.address}
💰 €${item.price.toLocaleString('pt-PT')}
🛏️ ${item.bedroom} quartos | 🚿 ${item.bathroom} casas de banho

Poderia fornecer mais informações sobre este imóvel?

Obrigado(a)! 🙏`);

    const whatsappURL = `https://wa.me/${RAQUEL_WHATSAPP}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  const toggleSave = e => {
    e.preventDefault();
    e.stopPropagation();
    // Adicionar lógica de salvar/remover favoritos aqui
    console.log('Toggle favorito');
  };

  const nextImage = e => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev =>
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = e => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev =>
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  const goToImage = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  return (
    <div className='modernCard'>
      <Link to={`/post/${item.id}`} className='cardLink'>
        <div className='imageContainer'>
          <img
            src={item.images[currentImageIndex]}
            alt={item.title}
            className='mainImage'
          />

          {/* Contador de imagens */}
          {item.images.length > 1 && (
            <div className='imageCounter'>
              <svg width='12' height='12' viewBox='0 0 24 24' fill='none'>
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
                <circle cx='8.5' cy='8.5' r='1.5' fill='currentColor' />
                <polyline
                  points='21,15 16,10 5,21'
                  stroke='currentColor'
                  strokeWidth='2'
                />
              </svg>
              {currentImageIndex + 1}/{item.images.length}
            </div>
          )}

          {/* Setas de navegação */}
          {item.images.length > 1 && (
            <>
              <button
                className='navArrow navArrow--left'
                onClick={prevImage}
                aria-label='Imagem anterior'
              >
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
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
                className='navArrow navArrow--right'
                onClick={nextImage}
                aria-label='Próxima imagem'
              >
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
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

          {/* Dots indicator */}
          {item.images.length > 1 && (
            <div className='dotsContainer'>
              {item.images.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${
                    index === currentImageIndex ? 'active' : ''
                  }`}
                  onClick={e => goToImage(index, e)}
                  aria-label={`Ver imagem ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Overlay com informações */}
          <div className='overlay'>
            {/* Título */}
            <div className='title'>{item.title}</div>
            {/* Preço */}
            <div className='price'>€{item.price.toLocaleString('pt-PT')}</div>

            {/* Características em linha */}
            <div className='features'>
              <div className='feature'>
                <svg width='14' height='14' viewBox='0 0 24 24' fill='none'>
                  <rect
                    x='3'
                    y='4'
                    width='18'
                    height='18'
                    rx='2'
                    ry='2'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                  <line
                    x1='16'
                    y1='2'
                    x2='16'
                    y2='6'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                  <line
                    x1='8'
                    y1='2'
                    x2='8'
                    y2='6'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                  <line
                    x1='3'
                    y1='10'
                    x2='21'
                    y2='10'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                </svg>
                <span>{item.bedroom}</span>
                <span className='label'>Quartos</span>
              </div>

              <div className='feature'>
                <svg width='14' height='14' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M9 6l6 6l-6 6'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <span>{item.bathroom}</span>
                <span className='label'>WC</span>
              </div>

              {item.postDetail?.size && (
                <div className='feature'>
                  <svg width='14' height='14' viewBox='0 0 24 24' fill='none'>
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
                    <path
                      d='M8 12h8M12 8v8'
                      stroke='currentColor'
                      strokeWidth='2'
                    />
                  </svg>
                  <span>{item.postDetail.size}</span>
                  <span className='label'>M²</span>
                </div>
              )}
            </div>
          </div>

          {/* Ícones de ação */}
          <div className='actionIcons'>
            <button
              className='actionIcon saveIcon'
              onClick={toggleSave}
              aria-label='Salvar propriedade'
            >
              <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>

            <button
              className='actionIcon whatsappIcon'
              onClick={openWhatsApp}
              aria-label='Contactar via WhatsApp'
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.516z' />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
