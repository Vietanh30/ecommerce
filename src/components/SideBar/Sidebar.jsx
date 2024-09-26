import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import path from "../../constants/path";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Lấy vị trí hiện tại

    // const toggleDropdown = () => {
    //     setIsOpen(!isOpen);
    // };

    return (
        <div className="bg-[#E7E7E3]">
            <div className="flex flex-col min-h-screen h-full w-60 bg-white text-[#232321] p-5 border-r-2 rounded-ee-2xl">
                <h2 className="text-2xl font-bold mb-6 cursor-pointer">Exclusive</h2>
                <Link
                    to={path.dashboard}// Đường dẫn cho Dashboard
                    className={`mb-4 p-2 rounded-lg ${location.pathname === path.dashboard ? "bg-[#003F62] text-white" : "hover:bg-[#003F62] hover:text-white"}`}
                >
                    Dashboard
                </Link>
                <Link
                    to={path.allCategories} // Đường dẫn cho All Products
                    className={`mb-4 p-2 rounded-lg ${location.pathname === path.allCategories ? "bg-[#003F62] text-white" : "hover:bg-[#003F62] hover:text-white"}`}
                >
                    All Categories
                </Link>
                <Link
                    to={path.allProduct} // Đường dẫn cho All Products
                    className={`mb-4 p-2 rounded-lg ${location.pathname === path.allProduct ? "bg-[#003F62] text-white" : "hover:bg-[#003F62] hover:text-white"}`}
                >
                    All Products
                </Link>
                <Link
                    to={path.orderList} // Đường dẫn cho All Products
                    className={`mb-4 p-2 rounded-lg ${location.pathname === path.orderList ? "bg-[#003F62] text-white" : "hover:bg-[#003F62] hover:text-white"}`}
                >
                    Order List
                </Link>
                {/* <div className="mt-4">
                    <div
                        className="cursor-pointer mb-2 hover:bg-[#003F62] hover:text-white p-2 rounded-lg"
                        onClick={toggleDropdown}
                    >
                        Categories
                    </div>
                    {isOpen && (
                        <div className="ml-4">
                            <Link
                                to="/categories/1" // Đường dẫn cho Categories 1
                                className={`block mb-2 p-2 rounded-lg ${location.pathname === "/categories/1" ? "bg-[#003F62] text-white" : "hover:bg-[#003F62] hover:text-white"}`}
                            >
                                Categories 1
                            </Link>
                            <Link
                                to="/categories/2" // Đường dẫn cho Categories 2
                                className={`block mb-2 p-2 rounded-lg ${location.pathname === "/categories/2" ? "bg-[#003F62] text-white" : "hover:bg-[#003F62] hover:text-white"}`}
                            >
                                Categories 2
                            </Link>
                            <Link
                                to="/categories/3" // Đường dẫn cho Categories 3
                                className={`block mb-2 p-2 rounded-lg ${location.pathname === "/categories/3" ? "bg-[#003F62] text-white" : "hover:bg-[#003F62] hover:text-white"}`}
                            >
                                Categories 3
                            </Link>
                        </div>
                    )}
                </div> */}
            </div>
        </div>
    );
}

export default Sidebar;