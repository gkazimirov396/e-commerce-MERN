import { useState } from 'react';

import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { sliderItems } from '@data/sliderItems';

import './Carousel.scss';

const Carousel = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();

  const handleClick = direction => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <div className="carousel">
      <div className="arrow-left" onClick={() => handleClick('left')}>
        <CaretLeftOutlined />
      </div>
      <div
        className="carousel__wrapper"
        style={{ transform: `translateX(${slideIndex * -100 + 'vw'})` }}
      >
        {sliderItems.map(item => (
          <div
            className="carousel__slide"
            style={{ backgroundColor: item.bg }}
            key={item.id}
          >
            <div className="carousel__image-container">
              <img src={item.img} alt={item.title} className="carousel__image" />
            </div>
            <div className="carousel__info-container">
              <h1 className="carousel__title">{item.title}</h1>
              <p className="carousel__description">{item.desc}</p>
              <button
                className="carousel__button"
                onClick={() => navigate('/products')}
              >
                SHOP NOW
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="arrow-right" onClick={() => handleClick('right')}>
        <CaretRightOutlined />
      </div>
    </div>
  );
};

export default Carousel;
