import ProductSlider from "../ProductSlider/ProductSlider";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Đảm bảo bạn đã nhập CSS cho AOS
import { useEffect } from 'react';

function BestSelling({ bestSale }) {
    // Khởi tạo AOS
    useEffect(() => {
        AOS.init();
    }, []);

    return ( 
        <div className="container mx-auto mt-20" data-aos="fade-up">
            <div className="flex gap-5 items-center" data-aos="fade-right">
                <div className="w-4 h-8 bg-[#da4445] rounded-sm"></div>
                <div className="text-[#da4445] font-semibold">Tháng Này</div>
            </div>
            <div className="mt-6" data-aos="fade-up">
                <div className="font-inter text-3xl font-semibold">Sản Phẩm Bán Chạy Nhất</div>
                <div className="mt-8">
                    <ProductSlider products={bestSale} data-aos="fade-up" />
                </div>
            </div>
        </div>
    );
}

export default BestSelling;