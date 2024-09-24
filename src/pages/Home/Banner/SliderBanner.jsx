import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import apple from '../../../assets/Banner/apple.svg';
import iconArrowRight from '../../../assets/Banner/iconArrowRight.svg';
import iphone from '../../../assets/Banner/iphone.svg';

function SliderBanner() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, // Disable arrows if not needed
    };
    
    return (
        // <Slider {...settings}>
        <div className="bg-black lg:col-span-4 col-span-1 flex flex-col lg:flex-row justify-between items-center px-5">
            <div className="text-white space-y-5 lg:ms-16 lg:w-2/3">
            <div className="flex items-center gap-5">
                <img src={apple} alt="Apple logo" />
                <span>iPhone 14 Series</span>
            </div>
            <div className="text-4xl lg:text-5xl font-semibold">
                Up to 10% off Voucher
            </div>
            <div className="flex gap-5 cursor-pointer">
                <span className="border-b">Shop Now</span>
                <img src={iconArrowRight} alt="Arrow Right" />
            </div>
            </div>
            <div className="mt-5 lg:mt-0 lg:w-1/3">
            <img src={iphone} alt="iPhone" className="w-full h-auto" />
            </div>
        
        </div>
        //  </Slider>
    );
}

export default SliderBanner;
