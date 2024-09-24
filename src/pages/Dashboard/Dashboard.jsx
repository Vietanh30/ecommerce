import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/SideBar/Sidebar";


function Dashboard() {
    
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