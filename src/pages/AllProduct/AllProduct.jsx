import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/SideBar/Sidebar";
import headphone from "../../assets/Product/headphone.svg"
import path from "../../constants/path";
import { Link } from "react-router-dom";
function AllProduct() {
    const productId = 1; // ID của sản phẩm (có thể thay đổi hoặc lấy từ props)
    return ( 

        <>
            <div className="flex">
                <Sidebar />
                <div className="w-full bg-[#E7E7E3]">
                    <Navbar />
                    <div className="px-8">
                        <div className="flex justify-between items-center mt-6">
                            <div className="text-2xl font-semibold">All Products</div>
                            <button className="rounded bg-[#232321] py-3 px-4 flex gap-3 items-center hover:bg-black">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M14 8C14 4.6875 11.3125 2 8 2C4.6875 2 2 4.6875 2 8C2 11.3125 4.6875 14 8 14C11.3125 14 14 11.3125 14 8Z" stroke="white" strokeWidth="1.5"/>
                                <path d="M8 5.5V10.5ZM10.5 8H5.5Z" fill="white"/>
                                <path d="M8 5.5V10.5M10.5 8H5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <Link to={path.addProduct} className="text-white font-medium text-sm">ADD NEW PRODUCT</Link>
                            </button>
                        </div>
                        <div className="mt-8">
                            <div className="grid grid-cols-12 gap-4">
                                
                                    <Link to={`${path.allProduct}/${productId}`} className="col-span-4 bg-[#FAFAFA] rounded-2xl p-4 hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex gap-4"> 
                                                <img className="p-2 rounded-lg w-20 h-20 bg-zinc-300" src={headphone} alt="" />
                                                <div className="flex flex-col justify-between">
                                                    <div className="text-sm font-semibold">
                                                    Havic HV G-92 Gamepad
                                                    </div>
                                                    <div className="mt-1 font-semibold">$192.00</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-sm">
                                                Description
                                                </div>
                                                <div className="mt-1 text-xs opacity-40">
                                                PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.
                                                </div>
                                            </div>
                                            <div className="border rounded-lg p-4">
                                                <div className="flex justify-between">
                                                    <div className="text-sm font-medium">Sale</div>
                                                    <div className="text-sm opacity-80">123</div>
                                                </div>
                                                <div className="border-b my-3"></div>
                                                <div className="flex justify-between">
                                                    <div className="text-sm font-medium">Remaining Productss</div>
                                                    <div className="text-sm opacity-80">1234</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}

export default AllProduct;