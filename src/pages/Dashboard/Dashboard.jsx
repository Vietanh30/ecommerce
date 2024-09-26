import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/SideBar/Sidebar";
import Swal from "sweetalert2"; // Thư viện thông báo
import { getAccessTokenFromLS } from "../../utils/auth";
import categoryApi from "../../api/categoryApi";

function Dashboard() {
    
    const [accessToken, setAccessToken] = useState(""); // State để lưu accessToken

    useEffect(() => {
        setAccessToken(getAccessTokenFromLS()); // Cập nhật state với accessToken
    }, []);

    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-full bg-[#E7E7E3]">
                    <Navbar />
                    <div className="px-4">
                        <div className="text-2xl mt-6 font-semibold">Dashboard</div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;