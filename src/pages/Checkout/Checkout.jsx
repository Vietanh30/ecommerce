import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import provinces from "../../utils/province.json";
import districts from "../../utils/district.json";
import wards from "../../utils/ward.json";
import userApi from "../../api/userApi";
import { getAccessTokenFromLS } from "../../utils/auth";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";
import Error from "../Error/Error";
import path from "../../constants/path";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [notes, setNotes] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState("");

    useEffect(() => {
        const token = getAccessTokenFromLS();
        if (token) {
            fetchCartItems(token);
        }
    }, []);

    const fetchCartItems = async (token) => {
        try {
            setLoading(true);
            const response = await userApi.getCheckout(token);
            if (response.data.status === 200) {
                setCartItems(response.data.data.products);
                setTotalPrice(response.data.data.total);
            }
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handlePlaceOrder = async () => {
        const token = getAccessTokenFromLS();
        if (!token) return;
    
        // Validation
        if (!name || !phone || !selectedProvince || !selectedDistrict || !selectedWard || !detailAddress || !notes) {
            Swal.fire("Error", "Please fill in all required fields.", "error");
            return;
        }
    
        const wardId = selectedWard; // Assuming ward ID is the same as selectedWard value
        try {
           const responseCreateAddress = await userApi.createAddress(detailAddress, name, wardId, phone, token);
            console.log(responseCreateAddress);
            if(responseCreateAddress.data.status === 200){
                const responseOrder = await userApi.order(responseCreateAddress.data.data.id, 1, notes, totalPrice, token )
                console.log(responseOrder);
                
                if (responseOrder.data.status === 200) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'You ordered in successfully.',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    }).then(()=>{
                        navigate(path.home)
                    })
                }
                else if (responseOrder.data.status === 422){
                    Swal.fire({
                        title: 'Error!',
                        html: `
                            ${responseOrder.data.message.phone ? responseOrder.data.message.phone + '<br>':''} 
                            ${responseOrder.data.message.delivery_id ? responseOrder.data.message.delivery_id + '<br>':''} 
                        `,
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                    });
                }                
            }
            // Swal.fire("Success", "Order placed successfully!", "success");
            // navigate(path.home); // Redirect to home or another page
        } catch (err) {
            console.log(err);
            
            Swal.fire("Error", "Failed to place order. Please try again.", "error");
        }
    };

    const filteredDistricts = districts.filter(
        (district) => district.code_province === selectedProvince
    );

    const filteredWards = wards.filter(
        (ward) => ward.code_district === selectedDistrict
    );

    if (loading) return <Loading />;
    if (error) return <Error />;

    return (
        <>
            <Header />
            <div className="container mx-auto my-20">
                <div className="font-inter text-4xl font-medium">Billing Details</div>
                <div className="grid grid-cols-2 mt-12 gap-28">
                    <div className="col-span-1">
                        <div>
                            <div className="text-sm font-normal opacity-40">
                                Name <span className="text-[#DB4444]">*</span>
                            </div>
                            <input
                                className="bg-[#F5F5F5] rounded py-2 w-full mt-2 px-4 text-base outline-none"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mt-5">
                            <div className="text-sm font-normal opacity-40">
                                Phone Number <span className="text-[#DB4444]">*</span>
                            </div>
                            <input
                                className="bg-[#F5F5F5] rounded py-2 w-full mt-2 px-4 text-base outline-none"
                                type="number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="mt-5">
                            <div className="text-sm font-normal opacity-40">
                                Province <span className="text-[#DB4444]">*</span>
                            </div>
                            <select
                                className="bg-[#F5F5F5] rounded py-2 w-full mt-2 px-4 text-base outline-none"
                                value={selectedProvince}
                                onChange={(e) => {
                                    setSelectedProvince(e.target.value);
                                    setSelectedDistrict("");
                                    setSelectedWard("");
                                }}
                            >
                                <option value="">Select a province</option>
                                {provinces.map((province) => (
                                    <option key={province.code} value={province.code}>
                                        {province.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-5">
                            <div className="text-sm font-normal opacity-40">
                                District <span className="text-[#DB4444]">*</span>
                            </div>
                            <select
                                className="bg-[#F5F5F5] rounded py-2 w-full mt-2 px-4 text-base outline-none"
                                value={selectedDistrict}
                                onChange={(e) => {
                                    setSelectedDistrict(e.target.value);
                                    setSelectedWard("");
                                }}
                                disabled={!selectedProvince}
                            >
                                <option value="">Select a district</option>
                                {filteredDistricts.map((district) => (
                                    <option key={district.code} value={district.code}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-5">
                            <div className="text-sm font-normal opacity-40">
                                Ward <span className="text-[#DB4444]">*</span>
                            </div>
                            <select
                                className="bg-[#F5F5F5] rounded py-2 w-full mt-2 px-4 text-base outline-none"
                                value={selectedWard}
                                onChange={(e) => setSelectedWard(e.target.value)}
                                disabled={!selectedDistrict}
                            >
                                <option value="">Select a ward</option>
                                {filteredWards.map((ward) => (
                                    <option key={ward.code} value={ward.code}>
                                        {ward.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-5">
                            <div className="text-sm font-normal opacity-40">
                                Number Home<span className="text-[#DB4444]">*</span>
                            </div>
                            <input
                                className="bg-[#F5F5F5] rounded py-2 w-full mt-2 px-4 text-base outline-none"
                                type="text"
                                value={detailAddress}
                                onChange={(e) => setDetailAddress(e.target.value)}
                            />
                        </div>
                        <div className="mt-5">
                            <div className="text-sm font-normal opacity-40">
                                Notes<span className="text-[#DB4444]"></span>
                            </div>
                            <textarea
                                className="bg-[#F5F5F5] rounded py-2 w-full mt-2 px-4 text-base outline-none"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-span-1">
                        {cartItems.map((item) => (
                            <div key={item.id} className="mt-8 flex items-center justify-between w-4/5">
                                <div className="flex justify-center items-center gap-5">
                                    <img className="w-16 h-auto" src={item.img} alt="" />
                                    <div className="text-base">{item.name}</div>
                                </div>
                                <div>${item.price}</div>
                            </div>
                        ))}
                        <div className="mt-6 flex justify-between w-4/5">
                            <div>Subtotal:</div>
                            <div>${totalPrice}</div>
                        </div>
                        <div className="border-b border-2 w-4/5 mt-3"></div>
                        <div className="mt-6 flex justify-between w-4/5">
                            <div>Shipping:</div>
                            <div>Free</div>
                        </div>
                        <div className="border-b border-2 w-4/5 mt-3"></div>
                        <div className="mt-6 flex justify-between w-4/5">
                            <div>Total:</div>
                            <div>${totalPrice}</div>
                        </div>
                        <div className="mt-6">
                            <button
                                onClick={handlePlaceOrder}
                                className="px-10 py-3 bg-[#DB4444] hover:bg-red-700 focus:bg-red-700 text-white rounded"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Checkout;