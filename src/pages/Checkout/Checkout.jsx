import Header from "../../components/Header/Header";
import product1 from "../../assets/Checkout/product1.svg"
import Footer from "../../components/Footer/Footer";
function Checkout() {
    return ( 
        <>
            <Header/>
            <div className="container mx-auto my-20">
                <div className="font-inter text-4xl font-medium">Billing Details</div>
                <div className="grid grid-cols-2 mt-12 gap-28">
                    <div className="col-span-1">
                        <div>
                            <div className="text-sm font-normal opacity-40">Name <span className="text-[#DB4444]">*</span></div>
                            <input className="bg-[#F5F5F5] rounded py-2 w-full mt-2 px-4 text-base outline-none" type="text" />
                        </div>
                        <div className="mt-5">
                            <div className="text-sm font-normal opacity-40">Phone Number <span className="text-[#DB4444]">*</span></div>
                            <input className="bg-[#F5F5F5] rounded py-2 w-full mt-2 px-4 text-base outline-none" type="number" />
                        </div>
                        <div className="mt-5">
                            <div className="text-sm font-normal opacity-40">Email Number <span className="text-[#DB4444]">*</span></div>
                            <input className="bg-[#F5F5F5] rounded py-2 w-full mt-2 px-4 text-base outline-none" type="text" />
                        </div>
                        <div className="mt-5">
                            <div className="text-sm font-normal opacity-40">Province <span className="text-[#DB4444]">*</span></div>
                            <input className="bg-[#F5F5F5] rounded py-2 w-full mt-2 px-4 text-base outline-none" type="text" />
                        </div>
                        <div className="mt-5">
                            <div className="text-sm font-normal opacity-40">District <span className="text-[#DB4444]">*</span></div>
                            <input className="bg-[#F5F5F5] rounded py-2 w-full mt-2 px-4 text-base outline-none" type="text" />
                        </div>
                        <div className="mt-5">
                            <div className="text-sm font-normal opacity-40">Ward<span className="text-[#DB4444]">*</span></div>
                            <input className="bg-[#F5F5F5] rounded py-2 w-full mt-2 px-4 text-base outline-none" type="text" />
                        </div>
                        <div className="mt-5">
                            <div className="text-sm font-normal opacity-40">NumberHome<span className="text-[#DB4444]">*</span></div>
                            <input className="bg-[#F5F5F5] rounded py-2 w-full mt-2 px-4 text-base outline-none" type="text" />
                        </div>
                        <div className="mt-5">
                            <div className="text-sm font-normal opacity-40">Notes<span className="text-[#DB4444]"></span></div>
                            <textarea className="bg-[#F5F5F5] rounded py-2 w-full mt-2 px-4 text-base outline-none" type="text" />
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="mt-8 flex items-center justify-between w-4/5">
                            <div className="flex justify-center items-center gap-5">
                                <img className="w-14 h-14" src={product1} alt="" />
                                <div className="text-base">LCD Monitor</div>
                            </div>
                            <div>
                                $650
                            </div>
                        </div>
                        <div className="mt-6 flex justify-between w-4/5">
                            <div>Subtotal:</div>
                            <div>$650</div>
                        </div>
                        <div className="border-b border-2 w-4/5 mt-3"></div>
                        <div className="mt-6 flex justify-between w-4/5">
                            <div>Shipping:</div>
                            <div>Free</div>
                        </div>
                        <div className="border-b border-2 w-4/5 mt-3"></div>
                        <div className="mt-6 flex justify-between w-4/5">
                            <div>Total:</div>
                            <div>$650</div>
                        </div>
                        <div className="mt-6">
                            <button className="px-10 py-3 bg-[#DB4444] hover:bg-red-700 focus:bg-red-700 text-white rounded">Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
        );
}

export default Checkout;