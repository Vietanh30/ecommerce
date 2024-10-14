import Header from "../../components/Header/Header";
import Banner from "./Banner/Banner";
import FashSales from "./FlashSales/FlashSales";
import Categories from "../../components/Categories/Categories";
import BestSelling from "../../components/BestSelling/BestSelling";
import Loudspeaker from "../../assets/Home/Loudspeaker.svg";
import ps5 from "../../assets/Home/ps5.svg";
import women from "../../assets/Home/women.svg";
import speaker from "../../assets/Home/speaker.svg";
import perfume from "../../assets/Home/perfume.svg";
import delivery from "../../assets/Home/delivery.svg";
import support from "../../assets/Home/support.svg";
import safe from "../../assets/Home/safe.svg";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import Footer from "../../components/Footer/Footer";
import { useCallback, useEffect, useState } from "react";
import userApi from "../../api/userApi";
import Loading from "../../components/Loading/Loading";
import Error from "../Error/Error";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Nhập CSS của AOS
function Home() {
    // Khởi tạo AOS
    useEffect(() => {
        AOS.init();
    }, []);

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [bestSale, setBestSale] = useState([]);
    const [flashSale, setFlashSale] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchDataHome = useCallback(async () => {
        try {
            setLoading(true);
            const response = await userApi.getInforHome();
            const { 
                categories: fetchedCategories, 
                newest_product: fetchedProducts, 
                best_sell: fetchedBestSell, 
                flash_sale: fetchedFlashSell 
            } = response.data.data;
    
            setCategories(fetchedCategories);
            setProducts(fetchedProducts);
            setBestSale(fetchedBestSell);
            setFlashSale(fetchedFlashSell);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);
    
    useEffect(() => {
        fetchDataHome();
    }, [fetchDataHome]);
    
    if (loading) return <Loading />;
    if (error) return <Error />;
    
    return ( 
        <div>
            <Header />    
            <Banner cateories={categories}/>
            <FashSales flashSale={flashSale}/>
            <Categories categories={categories} />
            <BestSelling bestSale={bestSale}/>
            <div className="container mx-auto mt-20">
                <div className="bg-[#000] grid grid-cols-12 max-h-[500px] items-center justify-center py-10" data-aos="fade-up">
                    <div className="col-span-4 col-start-2">
                        <div className="text-[#0F6] font-semibold">Danh Mục</div>
                        <div className="mt-8 text-5xl text-white leading-tight">Nâng Cao Trải Nghiệm Âm Nhạc Của Bạn</div>

                        <div className="flex items-center space-x-4 mt-8">
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold">23</div>
                                <span className="text-white">Giờ</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold">05</div>
                                <span className="text-white">Ngày</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold">59</div>
                                <span className="text-white">Phút</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold">35</div>
                                <span className="text-white">Giây</span>
                            </div>
                        </div>
                        <div className="mt-10">
                            <button className="text-white bg-[#0F6] py-4 px-12 rounded hover:bg-green-400">Mua Ngay</button>
                        </div>
                    </div>
                    <div className="col-span-4 col-start-7 relative" data-aos="fade-left">
                        <div className="relative">
                            <img className="w-auto relative z-20" src={Loudspeaker} alt="" />
                            <div className="absolute w-full h-full z-10 top-0 flex justify-center items-center rounded-full bg-[#D9D9D9] blur-[100px]"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-20" data-aos="fade-up">
                <div className="flex gap-5 items-center">
                    <div className="w-4 h-8 bg-[#da4445] rounded-sm"></div>
                    <div className="text-[#da4445] font-semibold">Sản Phẩm Của Chúng Tôi</div>
                </div>
                <div className="mt-6">
                    <div className="font-inter text-3xl font-semibold">Khám Phá Sản Phẩm Của Chúng Tôi</div>
                    <div className="mt-8">
                        <ProductSlider products={products} />
                    </div>
                    <div className="flex justify-center mt-16">
                        <button className="text-[#FAFAFA] bg-[#DB4444] hover:bg-red-600 py-4 px-12 rounded">Xem Tất Cả Sản Phẩm</button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-20" data-aos="fade-up">
                <div className="flex gap-5 items-center">
                    <div className="w-4 h-8 bg-[#da4445] rounded-sm"></div>
                    <div className="text-[#da4445] font-semibold">Nổi Bật</div>
                </div>
                <div className="mt-6">
                    <div className="font-inter text-3xl font-semibold">Sản Phẩm Mới</div>
                    <div className="mt-8 grid grid-cols-2 gap-8">
                        <div className="col-span-1 relative bg-[#000] px-7 pt-16 rounded" data-aos="fade-up">
                            <img className="mx-auto" src={ps5} alt="" />
                            <div className="absolute bottom-[10%]">
                                <div className="text-white font-inter text-2xl">PlayStation 5</div>
                                <div className="text-sm text-[#dfdada] mt-4">Phiên bản Đen và Trắng của PS5 <br /> sẽ được bán.</div>
                                <div className="underline text-white mt-4">Mua Ngay</div>
                            </div>
                        </div>
                        <div className="col-span-1 flex flex-col gap-7 justify-between">
                            <div className="relative flex items-end justify-between bg-[#0D0D0D] rounded" data-aos="fade-up">
                                <div className="ps-6 pb-6">
                                    <div className="text-white font-inter text-2xl">Bộ Sưu Tập Phụ Nữ</div>
                                    <div className="text-sm text-[#dfdada] mt-4">Bộ sưu tập phụ nữ nổi bật mang đến cho bạn một phong cách mới.</div>
                                    <div className="underline text-white mt-4">Mua Ngay</div>
                                </div>
                                <img src={women} alt="" />
                            </div>
                            <div className="flex gap-7">
                                <div className="relative bg-[#000] pt-16 rounded" data-aos="fade-up">
                                    <img className="mx-auto px-14" src={speaker} alt="" />
                                    <div className="absolute left-[10%] bottom-[10%]">
                                        <div className="text-white font-inter text-2xl">Loa</div>
                                        <div className="text-sm text-[#dfdada] mt-1">Loa không dây Amazon</div>
                                        <div className="underline text-white mt-2">Mua Ngay</div>
                                    </div>
                                </div>
                                <div className="relative bg-[#000] pt-16 rounded" data-aos="fade-up">
                                    <img className="mx-auto px-14" src={perfume} alt="" />
                                    <div className="absolute left-[10%] bottom-[10%]">
                                        <div className="text-white font-inter text-2xl">Nước Hoa</div>
                                        <div className="text-sm text-[#dfdada] mt-1">GUCCI INTENSE OUD EDP</div>
                                        <div className="underline text-white mt-2">Mua Ngay</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto my-24">
                <div className="flex justify-center">
                    <div className="flex gap-44">
                        <div data-aos="fade-up">
                            <img className="mx-auto" src={delivery} alt="" />
                            <div className="mt-6 text-[#000] text-center text-xl font-semibold">GIAO HÀNG MIỄN PHÍ VÀ NHANH CHÓNG</div>
                            <div className="text-sm mt-2 text-center">Giao hàng miễn phí cho tất cả đơn hàng trên $140</div>
                        </div>
                        <div data-aos="fade-up">
                            <img className="mx-auto" src={support} alt="" />
                            <div className="mt-6 text-[#000] text-center text-xl font-semibold">DỊCH VỤ KHÁCH HÀNG 24/7</div>
                            <div className="text-sm text-center mt-2">Hỗ trợ khách hàng thân thiện 24/7</div>
                        </div>
                        <div data-aos="fade-up">
                            <img className="mx-auto" src={safe} alt="" />
                            <div className="mt-6 text-[#000] text-center text-xl font-semibold">ĐẢM BẢO HOÀN TIỀN</div>
                            <div className="text-sm mt-2 text-center">Chúng tôi hoàn lại tiền trong vòng 30 ngày</div>
                        </div>
                    </div>    
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;