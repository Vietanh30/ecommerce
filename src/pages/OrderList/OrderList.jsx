import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/SideBar/Sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import path from "../../constants/path";
import { useEffect, useState } from "react";
import { getAccessTokenFromLS } from "../../utils/auth";
import adminApi from "../../api/adminApi";
import Loading from "../../components/Loading/Loading";
import { formatDate } from "../../utils/utils";

function OrderList() {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const token = getAccessTokenFromLS();
        if (token) {
            fetchOrders(token);
        }
    }, []);

    const fetchOrders = async (token) => {
        try {
            setLoading(true);
            const response = await adminApi.getOrders(token);
            console.log(response.data.data.data);
            if(response.data.status === 200){                
                setOrders(response.data.data.data);
            }
            
            if (response.data.status === 200) {                
                         
            }
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };
    if(loading) return <Loading/>
    return ( 
        <>
        <div className="flex">
            <Sidebar />
            <div className="w-full bg-[#E7E7E3]">
                <Navbar />
                <div className="px-4">
                    <div className="text-2xl mt-6">Order List</div>
                    <div className="mt-8 px-4 py-6 bg-[#F8F8F8] rounded-2xl">
                        <div className="font-semibold text-xl">Recent Purchases</div>
                        <div className="border-b my-4"></div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="text-sm leading-normal border-b">
                                        <th className="pb-3 text-left opacity-60">
                                        </th>
                                        <th className="pb-3 text-left opacity-60">Index</th>
                                        <th className="pb-3 text-left opacity-60">Order ID</th>
                                        <th className="pb-3 text-left opacity-60">Date</th>
                                        <th className="pb-3 text-left opacity-60">Customer Name</th>
                                        <th className="pb-3 text-left opacity-60">Status</th>
                                        <th className="pb-3 text-left opacity-60">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[#000000] text-sm font-semibold opacity-80">
                                    {orders.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-300">
                                            <td className="py-3 text-center">
                                                <Link to={path.orderList +  `/${item.id}`} >
                                                    <FontAwesomeIcon icon={faEye} className="cursor-pointer" />
                                                </Link>
                                            </td>
                                            <td className="py-3">{index}</td>
                                            <td className="py-3 italic">#{item.id}</td>
                                            <td className="py-3">{formatDate(item.created_at)}</td>
                                            <td className="py-3">{item.address.name}</td>
                                            <td className="py-3 flex items-center">
                                        <span className={`w-2 h-2 rounded-full mr-2 ${
                                            item.status === 1 ? 'bg-yellow-500' :
                                            item.status === 5 ? 'bg-red-500' :
                                            item.status === 4 ? 'bg-green-500' :
                                            item.status === 3 ? 'bg-blue-500' :
                                            'bg-gray-500'}`}>
                                        </span>
                                        {
                                            item.status === 1 ? 'Pending' :
                                            item.status === 5 ? 'Cancel' :
                                            item.status === 4 ? 'Success' :
                                            item.status === 3 ? 'Shipping' :
                                            'Pended'}
                                    </td>                                            
                                            <td className="py-3">${item.total_price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}

export default OrderList;