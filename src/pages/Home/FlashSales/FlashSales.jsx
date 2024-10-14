import ProductSlider from "../../../components/ProductSlider/ProductSlider";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Đảm bảo bạn đã nhập CSS cho AOS
import { useEffect } from 'react';

function FlashSales({ flashSale }) {
    // Khởi tạo AOS
    useEffect(() => {
        AOS.init();
    }, []);

    return ( 
        <div className="container mx-auto mt-20" data-aos="fade-up">
            <div className="flex gap-5 items-center" data-aos="fade-right">
                <div className="w-4 h-8 bg-[#da4445] rounded-sm"></div>
                <div className="text-[#da4445] font-semibold">Hôm Nay</div>
            </div>
            <div className="mt-6" data-aos="fade-up">
                <div className="font-inter text-3xl font-semibold">Giảm Giá</div>
                <div className="mt-8">
                    <ProductSlider products={flashSale} />
                    <div className="flex justify-center mt-16" data-aos="fade-up">
                        <button className="text-[#FAFAFA] bg-[#DB4444] hover:bg-red-600 py-4 px-12 rounded">Xem Tất Cả Sản Phẩm</button>
                    </div>
                    <div className="mt-14 border-b" data-aos="fade-up"></div>
                </div>
            </div>
        </div>
    );
}

export default FlashSales;