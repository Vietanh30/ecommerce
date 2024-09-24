import React, { useRef } from 'react';
import Slider from 'react-slick'; // Import react-slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; // Import slick theme
import Category from '../Category/Category';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function CategorySlider() {
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
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
                className="absolute right-[7%] top-[-55%] z-10 py-1 px-3 bg-gray-200 rounded-full shadow hover:bg-white"
            >
                <FontAwesomeIcon icon={faChevronLeft} className="text-gray-600" />
            </button>
            <Slider ref={sliderRef} {...settings}>
                <div><Category /></div>
                <div><Category /></div>
                <div><Category /></div>
                <div><Category /></div>
                <div><Category /></div>
                <div><Category /></div>
                {/* Thêm nhiều Category nếu cần */}
            </Slider>
            <button
                onClick={next}
                className="absolute right-[3%] top-[-55%] z-10 py-1 px-3 bg-gray-200 rounded-full shadow hover:bg-white"
            >
                <FontAwesomeIcon icon={faChevronRight} className="text-gray-600" />
            </button>
        </div>
    );
}

export default CategorySlider;