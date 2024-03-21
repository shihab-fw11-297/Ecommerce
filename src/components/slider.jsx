import React, { useState } from 'react';

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    const index = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  }

  const goToNextSlide = () => {
    const index = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  }

  return (
    <div className="slider">
      <div className="slider-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div className="slide" key={index}>
            <img src={image.url} alt={image.alt} />
          </div>
        ))}
      </div>
      <button className="prev-slide" onClick={goToPrevSlide}>&#10094;</button>
      <button className="next-slide" onClick={goToNextSlide}>&#10095;</button>
    </div>
  );
}

export default Slider;
