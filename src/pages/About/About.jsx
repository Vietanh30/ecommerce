import Header from "../../components/Header/Header";
import story from "../../assets/About/story.svg"
import Services1 from "../../assets/About/Services1.svg"
import Services2 from "../../assets/About/Services2.svg"
import Services3 from "../../assets/About/Services3.svg"
import Services4 from "../../assets/About/Services4.svg"
import Services5 from "../../assets/About/Services5.svg"
import Services6 from "../../assets/About/Services6.svg"
import Services7 from "../../assets/About/Services7.svg"
import famous1 from "../../assets/About/famous1.svg"
import famous2 from "../../assets/About/famous2.svg"
import famous3 from "../../assets/About/famous3.svg"
import Footer from "../../components/Footer/Footer";
function About() {
    return ( 
            <>
            <Header />
            <div className="container mx-auto mt-20">
                <div className="flex gap-16 items-center">
                    <div>
                        <div className="font-inter text-[54px] font-semibold">
                            Our Story
                        </div>
                        <div className="mt-10 text-base font-normal">
                        Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. 
                        </div>
                        <div className="mt-6 text-base font-normal">
                        Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.                        </div>
                    </div>
                    <img src={story} alt="" />
                </div>
                <div className="mt-36 grid grid-cols-12 gap-7 px-20">
                    <div className="col-span-3 border rounded py-5 group cursor-pointer hover:bg-[#DB4444]">
                        <div className="flex justify-center items-center flex-col">
                            <img src={Services1} alt="" />
                            <div className="mt-6 font-inter text-[32px] font-bold group-hover:text-white">
                                10.5k 
                            </div>
                            <div className="group-hover:text-white">Sallers active our site</div>
                        </div>
                    </div>
                    <div className="col-span-3 border rounded py-5 group cursor-pointer hover:bg-[#DB4444]">
                        <div className="flex justify-center items-center flex-col">
                            <img src={Services2} alt="" />
                            <div className="mt-6 font-inter text-[32px] font-bold group-hover:text-white">
                                33k
                            </div>
                            <div className="group-hover:text-white">Monthly Produduct Sale</div>
                        </div>
                    </div>
                    <div className="col-span-3 border rounded py-5 group cursor-pointer hover:bg-[#DB4444]">
                        <div className="flex justify-center items-center flex-col">
                            <img src={Services3} alt="" />
                            <div className="mt-6 font-inter text-[32px] font-bold group-hover:text-white">
                                145.5k
                            </div>
                            <div className="group-hover:text-white">Customer active in our site</div>
                        </div>
                    </div>
                    <div className="col-span-3 border rounded py-5 group cursor-pointer hover:bg-[#DB4444]">
                        <div className="flex justify-center items-center flex-col">
                            <img src={Services4} alt="" />
                            <div className="mt-6 font-inter text-[32px] font-bold group-hover:text-white">
                                25k 
                            </div>
                            <div className="group-hover:text-white">SAnual gross sale in our site</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-36">
                <div className="grid grid-cols-12 gap-7 px-20">
                    <div className="col-span-4">
                        <img className="w-full px-16 pt-10 h-80 bg-[#F5F5F5] rounded" src={famous1} alt="" />
                        <div className="mt-8 font-inter text-3xl font-medium">
                            Tom Cruise
                        </div>
                        <div className="text-base mt-1">Founder & Chairman</div>
                    </div>
                    <div className="col-span-4">
                        <img className="w-full px-16 pt-10 h-80 bg-[#F5F5F5] rounded" src={famous2} alt="" />
                        <div className="mt-8 font-inter text-3xl font-medium">
                        Emma Watson
                        </div>
                        <div className="text-base mt-1">Managing Director</div>
                    </div>
                    <div className="col-span-4">
                        <img className="w-full px-16 pt-10 h-80 bg-[#F5F5F5] rounded" src={famous3} alt="" />
                        <div className="mt-8 font-inter text-3xl font-medium">
                        Will Smith
                        </div>
                        <div className="text-base mt-1">Product Designer</div>
                    </div>
                </div>
            </div>
            <div className="container my-20 mx-auto">
                <div className="grid grid-cols-12">
                    <div className="col-span-4 py-5">
                        <div className="flex justify-center items-center flex-col">
                            <img src={Services5} alt="" />
                            <div className="mt-6 font-inter text-xl font-bold group-hover:text-white">
                                FREE AND FAST DELIVERY
                            </div>
                            <div className="text-sm font-normal">Free delivery for all orders over $140</div>
                        </div>
                    </div>
                    <div className="col-span-4 py-5">
                        <div className="flex justify-center items-center flex-col">
                            <img src={Services6} alt="" />
                            <div className="mt-6 font-inter text-xl font-bold group-hover:text-white">
                                24/7 CUSTOMER SERVICE
                            </div>
                            <div className="text-sm font-normal">Friendly 24/7 customer support</div>
                        </div>
                    </div>
                    <div className="col-span-4 py-5">
                        <div className="flex justify-center items-center flex-col">
                            <img src={Services7} alt="" />
                            <div className="mt-6 font-inter text-xl font-bold group-hover:text-white">
                                MONEY BACK GUARANTEE
                            </div>
                            <div className="text-sm font-normal">We reurn money within 30 days</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            </>
        
     );
}

export default About;