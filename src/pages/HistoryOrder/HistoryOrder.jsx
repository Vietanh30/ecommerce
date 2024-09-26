
import { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import { getAccessTokenFromLS } from "../../utils/auth";
import Swal from "sweetalert2";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils/utils";
import path from "../../constants/path";

function HistoryOrder() {
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = getAccessTokenFromLS();
    if (token) {
        fetchHistoryOrders(token);
    }
}, []);

const fetchHistoryOrders = async (token) => {
    try {
        setLoading(true);
        const response = await userApi.getHistoryOrders(token);
        if (response.data.status === 200) {                
            setOrders(response.data.data);  
            console.log(response.data.data);
            console.log(orders);
            
             
        }
    } catch (err) {
        setError(true);
    } finally {
        setLoading(false);
    }
};
  // Kiểm tra trạng thái loading
  if (loading) {
    return <Loading />;
  }

  // Kiểm tra trạng thái error
  if (error) {
    return <Error />;
  }
    
    return (
        <div>
            <Header />
            <div className="container mx-auto my-20">
                <h2 className="text-2xl font-semibold mb-5">Order History</h2>
                {orders.length === 0 ? (
                    <div className="text-center text-lg font-semibold mt-10">
                        No orders found
                    </div>
                ) : (
                    <div className="overflow-x-auto px-10 py-6 bg-white rounded" style={{ boxShadow: '0px 1px 13px 0px rgba(0, 0, 0, 0.05)' }}>
                            <table className="min-w-full">
                                <thead>
                                    <tr className="text-sm leading-normal border-b">
                                        <th className="pb-3 text-left opacity-60">
                                        </th>
                                        <th className="pb-3 text-left opacity-60">Index</th>
                                        <th className="pb-3 text-left opacity-60">Order ID</th>
                                        <th className="pb-3 text-left opacity-60">Date</th>
                                        <th className="pb-3 text-left opacity-60">Status</th>
                                        <th className="pb-3 text-left opacity-60">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[#000000] text-sm font-semibold opacity-80">
                                    {orders.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-300">
                                            <td className="py-3 text-center">
                                                <Link to={`${path.historyOrder}/${item.id}`} >
                                                    <FontAwesomeIcon icon={faEye} className="cursor-pointer" />
                                                </Link>
                                            </td>
                                            <td className="py-3">{index +1}</td>
                                            <td className="py-3 italic">#{item.id}</td>
                                            <td className="py-3">{formatDate(item.created_at)}</td>
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
                )}
            </div>
            <Footer />
        </div>
    );
}

export default HistoryOrder;