// client/src/components/imageModal/ImageModal.jsx
import { useState, useEffect } from 'react';
import './imageModal.scss';

function ImageModal({ images, isOpen, onClose, initialIndex = 0 }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Prevenir scroll quando modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  // Fechar modal com ESC
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        if (selectedImage !== null) {
          setSelectedImage(null); // Voltar ao grid
        } else if (isOpen) {
          onClose(); // Fechar modal
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, selectedImage, onClose]);

  // Reset ao fechar modal
  useEffect(() => {
    if (!isOpen) {
      setSelectedImage(null);
    }
  }, [isOpen]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      if (selectedImage !== null) {
        setSelectedImage(null); // Voltar ao grid
      } else {
        onClose(); // Fechar modal
      }
    }
  };

  const handleImageClick = index => {
    setSelectedImage(index);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='imageModal' onClick={handleOverlayClick}>
      <div className='modalContent'>
        {/* Cabeçalho do Modal */}
        <div className='modalHeader'>
          <h3>Galeria de Imagens ({images.length} fotos)</h3>
          <button
            className='closeButton'
            onClick={handleCloseModal}
            aria-label='Fechar galeria'
          >
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path
                d='M18 6L6 18M6 6L18 18'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>

        {/* Visualização de Imagem Ampliada */}
        {selectedImage !== null && (
          <div className='imageViewer' onClick={handleOverlayClick}>
            <div className='imageViewerContent'>
              <img
                src={images[selectedImage]}
                alt={`Imagem ${selectedImage + 1}`}
                onClick={handleCloseImage}
                style={{ cursor: 'pointer' }}
                title='Clique para voltar ao grid'
              />
              <button
                className='backButton'
                onClick={handleCloseImage}
                aria-label='Voltar ao grid'
              >
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M18 6L6 18M6 6L18 18'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
              <div className='imageCounter'>
                {selectedImage + 1} / {images.length}
              </div>
            </div>
          </div>
        )}

        {/* Grid de Imagens */}
        {selectedImage === null && (
          <div className='imageGrid'>
            {images.map((image, index) => (
              <div
                key={index}
                className='gridItem'
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  loading='lazy'
                />
                <div className='imageOverlay'>
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                    <path
                      d='M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageModal;
