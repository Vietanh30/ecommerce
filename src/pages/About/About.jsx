import Header from "../../components/Header/Header";
import story from "../../assets/About/story.svg";
import Services1 from "../../assets/About/Services1.svg";
import Services2 from "../../assets/About/Services2.svg";
import Services3 from "../../assets/About/Services3.svg";
import Services4 from "../../assets/About/Services4.svg";
import Services5 from "../../assets/About/Services5.svg";
import Services6 from "../../assets/About/Services6.svg";
import Services7 from "../../assets/About/Services7.svg";
import famous1 from "../../assets/About/famous1.svg";
import famous2 from "../../assets/About/famous2.svg";
import famous3 from "../../assets/About/famous3.svg";
import Footer from "../../components/Footer/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Đảm bảo bạn đã nhập CSS cho AOS
import { useEffect } from 'react';

function About() {
    // Khởi tạo AOS
    useEffect(() => {
        AOS.init();
    }, []);

    return ( 
        <>
            <Header />
            <div className="container mx-auto mt-20">
                <div className="flex gap-16 items-center">
                    <div>
                        <div className="font-inter text-[54px] font-semibold" data-aos="fade-up">
                            Câu Chuyện Của Chúng Tôi
                        </div>
                        <div className="mt-10 text-base font-normal" data-aos="fade-up">
                            Ra mắt vào năm 2015, Exclusive là nền tảng mua sắm trực tuyến hàng đầu tại Nam Á với sự hiện diện hoạt động tại Bangladesh. Được hỗ trợ bởi nhiều giải pháp tiếp thị, dữ liệu và dịch vụ đa dạng, Exclusive có 10,500 người bán và 300 thương hiệu, phục vụ 3 triệu khách hàng trên toàn khu vực.
                        </div>
                        <div className="mt-6 text-base font-normal" data-aos="fade-up">
                            Exclusive cung cấp hơn 1 triệu sản phẩm, đang phát triển rất nhanh. Chúng tôi cung cấp một loạt các danh mục đa dạng cho người tiêu dùng.
                        </div>
                    </div>
                    <img src={story} alt="Câu chuyện của chúng tôi" data-aos="fade-left" />
                </div>
                <div className="mt-36">
                    <h2 className="text-2xl font-semibold mb-6" data-aos="fade-up">Dịch Vụ Của Chúng Tôi</h2>
                    <div className="grid grid-cols-12 gap-7 px-20">
                        {[
                            { img: Services1, title: "10.5k", desc: "Người bán hoạt động trên trang của chúng tôi" },
                            { img: Services2, title: "33k", desc: "Sản phẩm bán hàng tháng" },
                            { img: Services3, title: "145.5k", desc: "Khách hàng hoạt động trên trang của chúng tôi" },
                            { img: Services4, title: "25k", desc: "Doanh thu hàng năm trên trang của chúng tôi" }
                        ].map((service, index) => (
                            <div key={index} className="col-span-3 border rounded py-5 group cursor-pointer hover:bg-[#DB4444]" data-aos="fade-up">
                                <div className="flex justify-center items-center flex-col">
                                    <img src={service.img} alt={`Dịch vụ ${index + 1}`} />
                                    <div className="mt-6 font-inter text-[32px] font-bold group-hover:text-white">
                                        {service.title}
                                    </div>
                                    <div className="group-hover:text-white text-center px-3">{service.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-36">
                <h2 className="text-2xl font-semibold mb-6" data-aos="fade-up">Nhân Vật Nổi Bật</h2>
                <div className="grid grid-cols-12 gap-7 px-20">
                    {[
                        { img: famous1, name: "Tom Cruise", title: "Người sáng lập & Chủ tịch" },
                        { img: famous2, name: "Emma Watson", title: "Giám đốc Điều hành" },
                        { img: famous3, name: "Will Smith", title: "Nhà thiết kế sản phẩm" }
                    ].map((famous, index) => (
                        <div key={index} className="col-span-4" data-aos="fade-up">
                            <img className="w-full px-16 pt-10 h-80 bg-[#F5F5F5] rounded" src={famous.img} alt={famous.name} />
                            <div className="mt-8 font-inter text-3xl font-medium">
                                {famous.name}
                            </div>
                            <div className="text-base mt-1">{famous.title}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container my-20 mx-auto">
                <h2 className="text-2xl font-semibold mb-6" data-aos="fade-up">Ưu Đãi Của Chúng Tôi</h2>
                <div className="grid grid-cols-12">
                    {[
                        { img: Services5, title: "GIAO HÀNG MIỄN PHÍ VÀ NHANH CHÓNG", desc: "Giao hàng miễn phí cho tất cả đơn hàng trên $140" },
                        { img: Services6, title: "DỊCH VỤ KHÁCH HÀNG 24/7", desc: "Hỗ trợ khách hàng thân thiện 24/7" },
                        { img: Services7, title: "CAM KẾT HOÀN TIỀN", desc: "Chúng tôi hoàn tiền trong vòng 30 ngày" }
                    ].map((service, index) => (
                        <div key={index} className="col-span-4 py-5" data-aos="fade-up">
                            <div className="flex justify-center items-center flex-col">
                                <img src={service.img} alt={`Dịch vụ ${index + 5}`} />
                                <div className="mt-6 font-inter text-xl font-bold group-hover:text-white">
                                    {service.title}
                                </div>
                                <div className="text-sm font-normal">{service.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default About;