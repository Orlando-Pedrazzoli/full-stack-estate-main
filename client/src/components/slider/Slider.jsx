// Slider.jsx
import { useState, useEffect, useRef } from 'react';
import './slider.scss';

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  // Prevenir scroll quando o modal estiver aberto
  useEffect(() => {
    if (imageIndex !== null) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('slider-open');
    } else {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('slider-open');
    }

    // Cleanup quando o componente for desmontado
    return () => {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('slider-open');
    };
  }, [imageIndex]);

  // Fechar modal com ESC
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape' && imageIndex !== null) {
        setImageIndex(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [imageIndex]);

  // Handle scroll do mobile slider
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const itemWidth = scrollRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(newIndex);
    }
  };

  // Scroll para imagem específica
  const scrollToImage = index => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  // Sincronizar modal com slider mobile
  useEffect(() => {
    if (imageIndex !== null) {
      setCurrentIndex(imageIndex);
    }
  }, [imageIndex]);

  const changeSlide = (direction, event) => {
    // Prevenir que o evento se propague para o overlay
    if (event) {
      event.stopPropagation();
    }

    let newIndex;
    if (direction === 'left') {
      newIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;
    } else {
      newIndex = imageIndex === images.length - 1 ? 0 : imageIndex + 1;
    }

    setImageIndex(newIndex);
    setCurrentIndex(newIndex);
  };

  const closeModal = event => {
    // Apenas fechar se o clique foi no overlay, não nos elementos internos
    if (event && event.target === event.currentTarget) {
      setImageIndex(null);
    } else if (!event) {
      // Chamada direta (ESC ou botão X)
      setImageIndex(null);
    }
  };

  return (
    <div className='slider'>
      {imageIndex !== null && (
        <div className='fullSlider' onClick={closeModal}>
          <div
            className='arrow arrow-left'
            onClick={event => changeSlide('left', event)}
          >
            <svg
              width='50'
              height='50'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M15 18L9 12L15 6'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>

          <div
            className='imgContainer'
            onClick={event => event.stopPropagation()}
          >
            <img src={images[imageIndex]} alt={`Imagem ${imageIndex + 1}`} />
          </div>

          <div
            className='arrow arrow-right'
            onClick={event => changeSlide('right', event)}
          >
            <svg
              width='50'
              height='50'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9 18L15 12L9 6'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>

          {/* Botão de fechar melhorado */}
          <button
            className='close'
            onClick={event => {
              event.stopPropagation();
              closeModal();
            }}
            aria-label='Fechar galeria'
            type='button'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M18 6L6 18M6 6L18 18'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>

          {/* Indicador de posição */}
          <div
            className='slideIndicator'
            onClick={event => event.stopPropagation()}
          >
            {imageIndex + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Layout Desktop - mantém o layout atual */}
      <div className='desktopSlider'>
        <div className='bigImage'>
          <img
            src={images[0]}
            alt='Imagem principal'
            onClick={() => setImageIndex(0)}
          />
          {images.length > 1 && (
            <div className='imageCounter'>
              <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
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
              {images.length} fotos
            </div>
          )}
        </div>

        <div className='smallImages'>
          {images.slice(1).map((image, index) => (
            <img
              src={image}
              alt={`Miniatura ${index + 2}`}
              key={index}
              onClick={() => setImageIndex(index + 1)}
            />
          ))}
        </div>
      </div>

      {/* Layout Mobile - novo design com scroll horizontal */}
      <div className='mobileSlider'>
        <div
          className='mobileImageContainer'
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className='mobileImageItem'
              onClick={() => setImageIndex(index)}
            >
              <img src={image} alt={`Imagem ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* Contador de imagens para mobile */}
        <div className='mobileCounter'>
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
            <circle cx='8.5' cy='8.5' r='1.5' fill='currentColor' />
            <polyline
              points='21,15 16,10 5,21'
              stroke='currentColor'
              strokeWidth='2'
            />
          </svg>
          {currentIndex + 1} / {images.length}
        </div>

        {/* Dots indicator para mobile */}
        {images.length > 1 && (
          <div className='mobileDots'>
            {images.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => scrollToImage(index)}
                aria-label={`Ver imagem ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Slider;
