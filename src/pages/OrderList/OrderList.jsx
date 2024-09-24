import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/SideBar/Sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import path from "../../constants/path";

function OrderList() {
    const data = [
        {
            product: 'Product A',
            orderId: '12345',
            date: '2024-09-01',
            customerName: 'John Doe',
            status: 'Pending',
            amount: '$50.00',
        },
        {
            product: 'Product B',
            orderId: '12346',
            date: '2024-09-02',
            customerName: 'Jane Smith',
            status: 'Canceled',
            amount: '$30.00',
        },
        {
            product: 'Product C',
            orderId: '12347',
            date: '2024-09-03',
            customerName: 'Alice Johnson',
            status: 'Delivered',
            amount: '$40.00',
        },
        {
            product: 'Product D',
            orderId: '12348',
            date: '2024-09-04',
            customerName: 'Bob Brown',
            status: 'Shipping',
            amount: '$20.00',
        },
    ];

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
                                        <th className="pb-3 text-left opacity-60">Product</th>
                                        <th className="pb-3 text-left opacity-60">Order ID</th>
                                        <th className="pb-3 text-left opacity-60">Date</th>
                                        <th className="pb-3 text-left opacity-60">Customer Name</th>
                                        <th className="pb-3 text-left opacity-60">Status</th>
                                        <th className="pb-3 text-left opacity-60">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[#000000] text-sm font-semibold opacity-80">
                                    {data.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-300">
                                            <td className="py-3 text-center">
                                                <Link to={path.orderList +  `/${1}`} >
                                                    <FontAwesomeIcon icon={faEye} className="cursor-pointer" />
                                                </Link>
                                            </td>
                                            <td className="py-3">{item.product}</td>
                                            <td className="py-3">{item.orderId}</td>
                                            <td className="py-3">{item.date}</td>
                                            <td className="py-3">{item.customerName}</td>
                                            <td className="py-3 flex items-center">
                                        <span className={`w-2 h-2 rounded-full mr-2 ${
                                            item.status === 'Pending' ? 'bg-yellow-500' :
                                            item.status === 'Canceled' ? 'bg-red-500' :
                                            item.status === 'Delivered' ? 'bg-green-500' :
                                            item.status === 'Shipping' ? 'bg-blue-500' :
                                            'bg-gray-500'}`}>
                                        </span>
                                        {item.status}
                                    </td>                                            
                                            <td className="py-3">{item.amount}</td>
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