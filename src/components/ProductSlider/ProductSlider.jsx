import React, { useRef } from 'react';
import Slider from 'react-slick'; // Import react-slick
import Product from '../Product/Product'; // Import the Product component
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; // Import slick theme
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function ProductSlider({products}) {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="my-8 relative">
      <button
        onClick={previous}
        className="absolute right-[7%] top-[-15%] z-10 py-1 px-3 bg-gray-200 rounded-full shadow hover:bg-white"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-gray-600" />
      </button>
      <Slider ref={sliderRef} {...settings}>
      {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id}> {/* Đảm bảo có khóa duy nhất */}
                            <Product product = {product} />
                        </div>
                    ))
                ) : (
                    <div>No products.</div>
                )}
      </Slider>
      <button
        onClick={next}
        className="absolute right-[3%] top-[-15%] z-10 py-1 px-3 bg-gray-200 rounded-full shadow hover:bg-white"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-gray-600" />
      </button>
    </div>
  );
}

export default ProductSlider;