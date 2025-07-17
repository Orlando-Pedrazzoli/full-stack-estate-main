// Slider.jsx
import { useState } from 'react';
import './slider.scss';

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);

  const changeSlide = direction => {
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

  return (
    <div className='slider'>
      {imageIndex !== null && (
        <div className='fullSlider'>
          <div className='arrow arrow-left' onClick={() => changeSlide('left')}>
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
          <div className='imgContainer'>
            <img src={images[imageIndex]} alt='' />
          </div>
          <div
            className='arrow arrow-right'
            onClick={() => changeSlide('right')}
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
          <div className='close' onClick={() => setImageIndex(null)}>
            <span>×</span>
          </div>
        </div>
      )}
      <div className='bigImage'>
        <img src={images[0]} alt='' onClick={() => setImageIndex(0)} />
      </div>
      <div className='smallImages'>
        {images.slice(1).map((image, index) => (
          <img
            src={image}
            alt=''
            key={index}
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
