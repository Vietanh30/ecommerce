import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import path from "../../constants/path";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Lấy vị trí hiện tại

    return (
        <div className="bg-[#E7E7E3]">
            <div className="flex flex-col min-h-screen h-full w-60 bg-white text-[#232321] p-5 border-r-2 rounded-ee-2xl">
                <h2 className="text-2xl font-bold mb-6 cursor-pointer">Exclusive</h2>
                <Link
                    to={path.dashboard} // Đường dẫn cho Dashboard
                    className={`mb-4 p-2 rounded-lg ${location.pathname === path.dashboard ? "bg-[#003F62] text-white" : "hover:bg-[#003F62] hover:text-white"}`}
                >
                    Trang chủ
                </Link>
                <Link
                    to={path.allCategories} // Đường dẫn cho Tất cả Thể Loại
                    className={`mb-4 p-2 rounded-lg ${location.pathname === path.allCategories ? "bg-[#003F62] text-white" : "hover:bg-[#003F62] hover:text-white"}`}
                >
                    Quản lý Thể Loại
                </Link>
                <Link
                    to={path.allProduct} // Đường dẫn cho Tất cả Sản Phẩm
                    className={`mb-4 p-2 rounded-lg ${location.pathname === path.allProduct ? "bg-[#003F62] text-white" : "hover:bg-[#003F62] hover:text-white"}`}
                >
                    Quản lý Sản Phẩm
                </Link>
                <Link
                    to={path.orderList} // Đường dẫn cho Danh Sách Đơn Hàng
                    className={`mb-4 p-2 rounded-lg ${location.pathname === path.orderList ? "bg-[#003F62] text-white" : "hover:bg-[#003F62] hover:text-white"}`}
                >
                    Quản lý Đơn Hàng
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;