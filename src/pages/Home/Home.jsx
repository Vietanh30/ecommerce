import Header from "../../components/Header/Header";
import Banner from "./Banner/Banner";
import FashSales from "./FlashSales/FlashSales";
import Categories from "../../components/Categories/Categories";
import BestSelling from "../../components/BestSelling/BestSelling";
import Loudspeaker from "../../assets/Home/Loudspeaker.svg"
import ps5 from "../../assets/Home/ps5.svg"
import women from "../../assets/Home/women.svg"
import speaker from "../../assets/Home/speaker.svg"
import perfume from "../../assets/Home/perfume.svg"
import delivery from "../../assets/Home/delivery.svg"
import support from "../../assets/Home/support.svg"
import safe from "../../assets/Home/safe.svg"
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import Footer from "../../components/Footer/Footer";
function Home() {
    return ( 
        <div>
            <Header />    
            <Banner/>
            <FashSales/>
            <Categories/>
            <BestSelling/>
            <div className="container mx-auto mt-20">
                <div className="bg-[#000] grid grid-cols-12 max-h-[500px] items-center justify-center py-10 ">
                    <div className="col-span-4 col-start-2">
                        <div className="text-[#0F6] font-semibold">Categories</div>
                        <div className="mt-8 text-5xl text-white leading-tight">Enhance Your Music Experience</div>

                        <div className="flex items-center space-x-4 mt-8">
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold">
                                    23
                                </div>
                                <span className="text-white">Hours</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold">
                                    05
                                </div>
                                <span className="text-white">Days</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold">
                                    59
                                </div>
                                <span className="text-white">Minutes</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold">
                                    35
                                </div>
                                <span className="text-white">Seconds</span>
                            </div>
                        </div>
                        <div className="mt-10">
                            <button className="text-white bg-[#0F6] py-4 px-12 rounded hover:bg-green-400">Buy Now</button>
                        </div>
                    </div>
                    <div className="col-span-4 col-start-7 relative">
                    <div className="relative">
                        <img className="w-auto relative z-20" src={Loudspeaker} alt="" />
                        <div className="absolute w-full h-full z-10 top-0 flex justify-center items-center rounded-full bg-[#D9D9D9] blur-[100px]">
                        </div>
                    </div> 
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-20">
                <div className="flex gap-5 items-center">
                    <div className="w-4 h-8 bg-[#da4445] rounded-sm"></div>
                    <div className="text-[#da4445] font-semibold">Our Products</div>
                </div>
                <div className="mt-6">
                    <div className="font-inter text-3xl font-semibold">Explore Our Products</div>
                    <div className="mt-8">
                        <ProductSlider/>
                    </div>
                    <div className="flex justify-center mt-16">
                        <button className="text-[#FAFAFA] bg-[#DB4444] hover:bg-red-600 py-4 px-12 rounded">View All Products</button>
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-20">
                <div className="flex gap-5 items-center">
                    <div className="w-4 h-8 bg-[#da4445] rounded-sm"></div>
                    <div className="text-[#da4445] font-semibold">Featured</div>
                </div>
                <div className="mt-6">
                    <div className="font-inter text-3xl font-semibold">New Arrival</div>
                    <div className="mt-8 grid grid-cols-2 gap-8">
                        <div className="col-span-1 relative bg-[#000] px-7 pt-16 rounded">
                            <img className="mx-auto" src={ps5} alt="" />
                            <div className="absolute bottom-[10%]">
                                <div className="text-white font-inter text-2xl">PlayStation 5</div>
                                <div className="text-sm text-[#dfdada] mt-4">Black and White version of the PS5 <br /> coming out on sale.</div>
                                <div className="underline text-white mt-4">Shop Now</div>
                            </div>
                        </div>
                        <div className="col-span-1 flex flex-col gap-7 justify-between">
                            <div className="relative flex items-end justify-between bg-[#0D0D0D] rounded">
                                <div className="ps-6 pb-6">
                                    <div className="text-white font-inter text-2xl">Women’s Collections</div>
                                    <div className="text-sm text-[#dfdada] mt-4">Featured woman collections that <br /> give you another vibe.</div>
                                    <div className="underline text-white mt-4">Shop Now</div>
                                </div>
                                <img  src={women} alt="" />
                            </div>
                            <div className="flex gap-7">
                                <div className="relative bg-[#000]  pt-16 rounded">
                                    <img className="mx-auto px-14" src={speaker} alt="" />
                                    <div className="absolute left-[10%] bottom-[10%]">
                                        <div className="text-white font-inter text-2xl">Speakers</div>
                                        <div className="text-sm text-[#dfdada] mt-1">Amazon wireless speakers</div>
                                        <div className="underline text-white mt-2">Shop Now</div>
                                    </div>
                                </div>
                                <div className="relative bg-[#000]  pt-16 rounded">
                                    <img className="mx-auto px-14" src={perfume} alt="" />
                                    <div className="absolute left-[10%] bottom-[10%]">
                                        <div className="text-white font-inter text-2xl">Perfume</div>
                                        <div className="text-sm text-[#dfdada] mt-1">GUCCI INTENSE OUD EDP</div>
                                        <div className="underline text-white mt-2">Shop Now</div>
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
                        <div>
                            <img className="mx-auto" src={delivery} alt="" />
                            <div className="mt-6 text-[#000] text-center text-xl font-semibold">
                                FREE AND FAST DELIVERY
                            </div>
                            <div className="text-sm mt-2 text-center">
                                Free delivery for all orders over $140
                            </div>

                        </div>
                        <div>
                            <img className="mx-auto" src={support} alt="" />
                            <div className="mt-6 text-[#000] text-center text-xl font-semibold">
                                F24/7 CUSTOMER SERVICE
                            </div>
                            <div className="text-sm text-center mt-2">
                                Friendly 24/7 customer support
                            </div>

                        </div>
                        <div>
                            <img className="mx-auto" src={safe} alt="" />
                            <div className="mt-6 text-[#000] text-center text-xl font-semibold">
                                MONEY BACK GUARANTEE
                            </div>
                            <div className="text-sm mt-2 text-center">
                                We reurn money within 30 days
                            </div>

                        </div>
                    </div>    
                </div>
            </div>
            <Footer />
        </div>
     );
}

export default Home;