import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/SideBar/Sidebar";
import headphone from "../../assets/Product/headphone.svg";
import path from "../../constants/path";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import { getAccessTokenFromLS } from "../../utils/auth";
import ErrorAdmin from "../ErrorAdmin/ErrorAdmin";
import Loading from "../../components/Loading/Loading";

function AllProduct() {
    const [products, setProducts] = useState([]); // State để lưu trữ sản phẩm
    const [loading, setLoading] = useState(true); // State để quản lý trạng thái tải
    const [error, setError] = useState(null); // State để lưu trữ lỗi
    const [accessToken, setAccessToken] = useState("");

    // Lấy accessToken từ localStorage
    useEffect(() => {
        const token = getAccessTokenFromLS();
        setAccessToken(token);
    }, []);

    // Gọi API để lấy danh sách sản phẩm khi accessToken có sẵn
    useEffect(() => {
        const fetchProducts = async () => {
            if (!accessToken) return; // Nếu không có accessToken, không gọi API

            try {
                const response = await productApi.getAllProduct(accessToken); // Gọi API                
                setProducts(response.data.data.data); // Giả sử response.data chứa danh sách sản phẩm
                console.log(response.data.data.data);
            } catch (err) {
                setError(err.message); // Lưu trữ lỗi nếu có
            } finally {
                setLoading(false); // Cập nhật trạng thái tải
            }
        };

        fetchProducts();
    }, [accessToken]); // Thêm accessToken vào dependency array

    if (loading) return <Loading />; // Hiển thị loading khi đang tải
    if (error) return <ErrorAdmin />; // Hiển thị lỗi nếu có

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
                                {products.map((product) => (
                                    <Link
                                        key={product.id} // Giả sử mỗi sản phẩm có id duy nhất
                                        to={`${path.allProduct}/${product.id}`}
                                        className="col-span-4 h-full bg-[#FAFAFA] rounded-2xl p-4 hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out"
                                    >
                                        <div className="flex flex-col gap-4">
                                            <div className="flex gap-4"> 
                                                <img className="p-2 rounded-lg w-20 h-20 bg-zinc-300" src={product.img || headphone} alt={product.name} />
                                                <div className="flex flex-col justify-between">
                                                    <div className="text-sm font-semibold">
                                                        {product.name}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-xs">
                                                            <span className="opacity-75">Cost price:</span> ${product.cost_price}
                                                        </div>
                                                        <div className="mt-1 font-semibold text-xs">
                                                            <span className="opacity-75">Sale price:</span> ${product.selling_price}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium">Description</div>
                                                <div className="mt-1 text-xs opacity-60 line-clamp-2 min-h-8">
                                                    {product.description}
                                                </div>
                                            </div>
                                            <div className="border rounded-lg p-4">
                                                <div className="flex justify-between">
                                                    <div className="text-sm font-medium">Sale</div>
                                                    <div className="text-sm opacity-80">{product.sale}</div>
                                                </div>
                                                <div className="border-b my-3"></div>
                                                <div className="flex justify-between">
                                                    <div className="text-sm font-medium">Remaining Products</div>
                                                    <div className="text-sm opacity-80">{product.remaining}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllProduct;