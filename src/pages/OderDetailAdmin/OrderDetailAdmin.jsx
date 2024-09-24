import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/SideBar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import React, { useRef, useState } from "react";
import path from "../../constants/path";
function OrderDetailAdmin() {
    const { id } = useParams();
    console.log(id);
    
    return ( 
        <>
        <div className="flex">
            <Sidebar />
            <div className="w-full bg-[#E7E7E3]">
                <Navbar />
                <div className="px-4">
                    <div className="text-2xl mt-6 font-semibold">Order Details</div>
                </div>                
            </div>       
        </div>
        </>
     );
}

export default OrderDetailAdmin;