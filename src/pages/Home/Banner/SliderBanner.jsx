import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import apple from '../../../assets/Banner/apple.svg';
import iconArrowRight from '../../../assets/Banner/iconArrowRight.svg';
import iphone from '../../../assets/Banner/iphone.svg';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Đảm bảo bạn đã nhập CSS cho AOS
function SliderBanner() {
    // Khởi tạo AOS
  useEffect(() => {
    AOS.init();
  }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, // Tắt mũi tên nếu không cần thiết
    };
    
    return (
        // <Slider {...settings}>
        <div className="bg-black lg:col-span-4 col-span-1 flex flex-col lg:flex-row justify-between items-center px-5" >
            <div className="text-white space-y-5 lg:ms-16 lg:w-2/3">
                <div className="flex items-center gap-5" data-aos="fade-left">
                    <img src={apple} alt="Logo Apple" />
                    <span>Series iPhone 14</span>
                </div>
                <div className="text-4xl lg:text-5xl font-semibold" data-aos="fade-left">
                    Giảm đến 10% Voucher
                </div>
                <div className="flex gap-5 cursor-pointer" data-aos="fade-left">
                    <span className="border-b">Mua Ngay</span>
                    <img src={iconArrowRight} alt="Mũi tên sang phải" />
                </div>
            </div>
            <div className="mt-5 lg:mt-0 lg:w-1/3">
                <img src={iphone} alt="iPhone" className="w-full h-auto" />
            </div>
        </div>
        // </Slider>
    );
}

export default SliderBanner;