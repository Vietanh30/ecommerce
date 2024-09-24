import Header from "../Header/Header";
import monitor from "../../assets/Cart/monitor.svg"
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import path from "../../constants/path";
function Cart() {
    return ( 
        <div>
            <Header />
            <div className="container mx-auto mt-20">
                <div className="grid grid-cols-12 px-10 py-6 bg-white rounded" style={{boxShadow: '0px 1px 13px 0px rgba(0, 0, 0, 0.05)'}}>
                    <div className="col-span-4 font-normal text-base">
                        Product
                    </div>
                    <div className="col-span-3 font-normal text-base">
                        Price
                    </div>
                    <div className="col-span-3 font-normal text-base">
                        Quantity
                    </div>
                    <div className="col-span-1 col-start-12 font-normal text-base">
                        Subtotal
                    </div>
                </div>
                <div className="grid grid-cols-12 px-10 py-5 bg-white rounded mt-10" style={{boxShadow: '0px 1px 13px 0px rgba(0, 0, 0, 0.05)'}}>
                    <div className="col-span-4 font-normal text-base">
                        <div className="flex gap-5 items-center">
                            <div className="relative">
                                <img className="w-12 h-10" src={monitor} alt="" />
                                <button className="bg-red-600 text-white px-2 py-1 rounded-full absolute top-[-25%] left-[-25%] flex items-center text-xs font-semibold">x</button>
                            </div>
                            <div className="text-base font-normal">LCD Monitor</div>
                        </div>
                    </div>
                    <div className="col-span-3 font-normal text-base flex items-center">
                        $650
                    </div>
                    <div className="col-span-3 font-normal text-base flex items-center">
                        <input className="w-16 h-9 px-2 border rounded border-black" type="number" min={0} />
                    </div>
                    <div className="col-span-1 col-start-12 font-normal text-base flex items-center">
                        $650
                    </div>
                </div>
                <div className="mt-6 flex justify-between">
                    <Link to={path.home} className="border border-zinc-400 px-12 py-3 font-medium text-base rounded focus:bg-[#DB4444] focus:text-white 
                                        focus:border-[#DB4444] hover:bg-[#DB4444] 
                                        hover:text-white hover:border-[#DB4444]">
                        Return To Shop
                    </Link>
                    <button className="border border-zinc-400 px-12 py-3 font-medium text-base rounded focus:bg-[#DB4444] focus:text-white 
                                        focus:border-[#DB4444] hover:bg-[#DB4444] 
                                        hover:text-white hover:border-[#DB4444]">
                        Update Cart
                    </button>
                </div>
                <div className="grid grid-cols-12 my-20">
                    <div className="col-span-4 col-start-9 px-6 py-8 border-2 border-black rounded font-inter">
                        <div className="text-xl font-semibold">
                            Cart Total
                        </div>
                        <div className="mt-6 flex justify-between font-normal">
                            <div>
                            Subtotal:
                            </div>
                            <div>$1750</div>
                        </div>
                        <div className="border-b mt-3"></div>
                        <div className="mt-6 flex justify-between font-normal">
                            <div>
                            Shipping:
                            </div>
                            <div>Free</div>
                        </div>
                        <div className="border-b mt-3"></div>
                        <div className="mt-6 flex justify-between font-normal">
                            <div>
                            Total:
                            </div>
                            <div>$1750</div>
                        </div>
                        <div className="mt-3 flex justify-center">
                            <button className="px-12 py-2 bg-[#DB4444] hover:bg-red-700 focus:bg-red-700 text-white rounded">Process to check out</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
     );
}

export default Cart;