import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import path from "../../constants/path";
import customer from "../../assets/Order/customer.svg";
import orderInfor from "../../assets/Order/orderInfor.svg";
import deliver from "../../assets/Order/customer.svg";
import Swal from 'sweetalert2'; // Import SweetAlert
import { getAccessTokenFromLS } from "../../utils/auth";
import { formatDate } from "../../utils/utils";
import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";
import userApi from "../../api/userApi";

function HistoryOrderDetail() {
    const { id } = useParams();
    const [orderDetail, setOrderDetail] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getAccessTokenFromLS();
        if (token) {
            fetchOrderDetail(token);
        }
    }, []);

    const fetchOrderDetail = async (token) => {
        try {
            const response = await userApi.getOrderDetail(id, token);
            console.log(response.data);
            setOrderDetail(response.data.data);
            console.log(orderDetail);
            
        } catch (error) {
            console.error("Error fetching order detail:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle cancellation of the order
    const cancelOrder = async () => {
        const token = getAccessTokenFromLS(); // Retrieve token here
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to cancel this order.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DB4444',
            cancelButtonColor: '#f0ad4e',
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No, keep it'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await userApi.changeStatusOrder(id, token); // Set status to "5" for cancellation
                    if (response.data.status === 200) {
                        Swal.fire('Success!', 'Order has been cancelled.', 'success');
                        fetchOrderDetail(token); // Re-fetch order details with the token
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire('Error!', 'There was an issue cancelling the order.', 'error');
                }
            }
        });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <div className="flex">
                <div className="container mx-auto">
                    <Header />
                    <div className="px-4 flex mt-6 gap-6 items-center">
                        <div className="text-2xl font-semibold">Order Details</div>
                        <div className="px-6 py-2 text-sm bg-[#FFA52FCC] rounded-lg">
                            {
                                orderDetail.status === 1 ? 'Pending' :
                                orderDetail.status === 5 ? 'Cancelled' :
                                orderDetail.status === 4 ? 'Success' :
                                orderDetail.status === 3 ? 'Shipping' :
                                'Pended'
                            }
                        </div>
                    </div>
                    <div className="px-4">
                        <div className="mt-8 px-4 py-6 bg-[#F8F8F8] rounded-2xl">
                            <div className="font-semibold text-xl">Orders ID: #{orderDetail.id}</div>
                            <div className="flex items-center justify-between my-4">
                                <div>Date {formatDate(orderDetail.created_at)}</div>
                                {orderDetail.status !== 5 && ( // Show cancel button only if the order is not already cancelled
                                    <button 
                                        className="bg-[#DB4444] text-white py-2 px-4 rounded-md"
                                        onClick={cancelOrder}
                                    >
                                        Cancel Order
                                    </button>
                                )}
                            </div>
                            <div className="mt-6">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-4 p-5 border flex items-start gap-8 h-full rounded-md">
                                        <img src={customer} alt="" />
                                        <div>
                                            <div className="text-xl font-semibold">Customer</div>
                                            <div className="text-[#70706E] text-sm mt-2">Full Name: {orderDetail.address.name}</div>
                                            <div className="text-[#70706E] text-sm mt-2">Phone: {orderDetail.address.phone}</div>
                                        </div>
                                    </div>
                                    <div className="col-span-4 p-5 border flex items-start gap-8 h-full rounded-md">
                                        <img src={orderInfor} alt="" />
                                        <div>
                                            <div className="text-xl font-semibold">Order Info</div>
                                            <div className="text-[#70706E] text-sm mt-2">Shipping: Next express</div>
                                            <div className="text-[#70706E] text-sm mt-2">Payment Method: Money</div>
                                            <div className="text-[#70706E] text-sm mt-2">Status: {orderDetail.status}</div>
                                        </div>
                                    </div>
                                    <div className="col-span-4 p-5 border flex items-start gap-8 h-full rounded-md">
                                        <img src={deliver} alt="" />
                                        <div>
                                            <div className="text-xl font-semibold">Delivery Address</div>
                                            <div className="text-[#70706E] text-sm mt-2">{orderDetail.address.ward_id}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <div className="font-semibold text-xl">Note</div>
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12 p-5 mt-2 border flex items-start gap-8 h-full rounded-md">
                                        {orderDetail.note}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-8 px-4 py-6 bg-[#F8F8F8] rounded-2xl">
                            <div className="font-semibold text-xl">Products</div>
                            <div className="border-b my-4"></div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="text-sm leading-normal border-b">
                                            <th className="pb-3 text-left opacity-60">Product Name</th>
                                            <th className="pb-3 text-left opacity-60">Order ID</th>
                                            <th className="pb-3 text-left opacity-60">Quantity</th>
                                            <th className="pb-3 text-left opacity-60">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[#000000] text-sm font-semibold opacity-80">
                                        {orderDetail.product.map((product) => (
                                            <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-300">
                                                <td className="py-3 w-[35%]">
                                                    <div className="flex gap-4 items-center">
                                                        <img className="w-14 h-auto" src={product.img} alt="" />
                                                        <div>{product.feature_name}</div>
                                                    </div>
                                                </td>
                                                <td className="py-3 italic">#{product.id}</td>
                                                <td className="py-3">{product.quantity}</td>
                                                <td className="py-3">${product.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-6">
                                <div className="flex justify-end">
                                    <div>
                                        <div className="flex gap-44">
                                            <div className="text-2xl font-semibold">Total</div>
                                            <div className="text-2xl font-semibold">${orderDetail.total_price}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HistoryOrderDetail;
