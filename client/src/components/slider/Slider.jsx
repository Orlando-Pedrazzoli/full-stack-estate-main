// Slider.jsx
import { useState, useEffect } from 'react';
import './slider.scss';

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);

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

  const changeSlide = (direction, event) => {
    // Prevenir que o evento se propague para o overlay
    if (event) {
      event.stopPropagation();
    }

    if (direction === 'left') {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
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
  );
}

export default Slider;
