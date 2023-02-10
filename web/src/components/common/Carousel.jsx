import React, { useState } from "react";

function Carousel({ items, batchSize }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex(
      currentIndex - batchSize < 0
        ? items.length - batchSize
        : currentIndex - batchSize
    );
  };

  const handleNextClick = () => {
    setCurrentIndex(
      currentIndex + batchSize >= items.length ? 0 : currentIndex + batchSize
    );
  };

  return (
    <div>
      <button onClick={handlePrevClick}>Prev</button>
      <div>{items.slice(currentIndex, currentIndex + batchSize)}</div>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
}

export default Carousel;
