import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import path from "../../constants/path";
import { getAccessTokenFromLS } from "../../utils/auth";
import { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";

function Cart() {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState("");

    useEffect(() => {
        const token = getAccessTokenFromLS();
        if (token) {
            setAccessToken(token);
            fetchCartItems(token);
        }
    }, []);

    const fetchCartItems = async (token) => {
        try {
            setLoading(true);
            const response = await userApi.getCart(token);
            if (response.data.status === 200) {                
                setCartItems(response.data.data.products);   
                setTotalPrice(response.data.data.total_price);             
            }
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = (id, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.feature_product.id === id ? { ...item, quantity: Math.max(quantity, 0) } : item
            )
        );
    };

    const handleUpdateCart = async () => {
        try {
            const updatedItems = cartItems.map(item => ({
                id: item.feature_product.id,
                quantity: item.quantity
            }));
            console.log(updatedItems);
            
            // const response = await userApi.updateCart(updatedItems, accessToken);
            // console.log(response);
            
            // if (response.data.status === 200) {
            //     fetchCartItems(accessToken); // Refresh cart items after update
            // }
        } catch (err) {
            setError(true);
        }
    };
    const handleCheckout = () =>{
        if(cartItems.length == 0){
            Swal.fire({
                title: 'Warning!',
                text: 'Please add products to card.',
                icon: 'warning',
                confirmButtonText: 'OK',
            }).then(() =>{
                navigate(path.home)
            });
        }
        else{
            navigate(path.checkout)
        }
    }
    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error loading cart items</div>;
    }

    return (
        <div>
            <Header />
            <div className="container mx-auto mt-20">
                <div className="grid grid-cols-12 px-10 py-6 bg-white rounded" style={{ boxShadow: '0px 1px 13px 0px rgba(0, 0, 0, 0.05)' }}>
                    <div className="col-span-4 font-normal text-base">Product</div>
                    <div className="col-span-3 font-normal text-base">Price</div>
                    <div className="col-span-3 font-normal text-base">Quantity</div>
                    <div className="col-span-1 col-start-12 font-normal text-base">Subtotal</div>
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center text-lg font-semibold mt-10">
                        No products in cart
                    </div>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.feature_product.id} className="grid grid-cols-12 px-10 py-5 bg-white rounded mt-10" style={{ boxShadow: '0px 1px 13px 0px rgba(0, 0, 0, 0.05)' }}>
                            <div className="col-span-4 font-normal text-base">
                                <div className="flex gap-5 items-center">
                                    <div className="relative">
                                        <img className="w-12 h-10" src={item.feature_product.img} alt={item.feature_product.name} />
                                        <button className="bg-red-600 text-white px-2 py-1 rounded-full absolute top-[-25%] left-[-25%] flex items-center text-xs font-semibold">x</button>
                                    </div>
                                    <div className="text-base font-normal">{item.feature_product.name}</div>
                                </div>
                            </div>
                            <div className="col-span-3 font-normal text-base flex items-center">${item.feature_product.selling_price}</div>
                            <div className="col-span-3 font-normal text-base flex items-center">
                                <input 
                                    className="w-16 h-9 px-2 border rounded border-black" 
                                    type="number" 
                                    min={0} 
                                    value={item.quantity} 
                                    onChange={(e) => handleQuantityChange(item.feature_product.id, Number(e.target.value))}
                                />
                            </div>
                            <div className="col-span-1 col-start-12 font-normal text-base flex items-center">
                                ${item.feature_product.total}
                            </div>
                        </div>
                    ))
                )}

                <div className="mt-6 flex justify-between">
                    <Link to={path.home} className="border border-zinc-400 px-12 py-3 font-medium text-base rounded focus:bg-[#DB4444] focus:text-white 
                                        focus:border-[#DB4444] hover:bg-[#DB4444] 
                                        hover:text-white hover:border-[#DB4444]">
                        Return To Shop
                    </Link>
                    <button 
                        className="border border-zinc-400 px-12 py-3 font-medium text-base rounded focus:bg-[#DB4444] focus:text-white 
                                        focus:border-[#DB4444] hover:bg-[#DB4444] 
                                        hover:text-white hover:border-[#DB4444]"
                        onClick={handleUpdateCart}
                    >
                        Update Cart
                    </button>
                </div>

                <div className="grid grid-cols-12 my-20">
                    <div className="col-span-4 col-start-9 px-6 py-8 border-2 border-black rounded font-inter">
                        <div className="text-xl font-semibold">Cart Total</div>
                        <div className="mt-6 flex justify-between font-normal">
                            <div>Subtotal:</div>
                            <div>${totalPrice}</div>
                        </div>
                        <div className="border-b mt-3"></div>
                        <div className="mt-6 flex justify-between font-normal">
                            <div>Shipping:</div>
                            <div>Free</div>
                        </div>
                        <div className="border-b mt-3"></div>
                        <div className="mt-6 flex justify-between font-normal">
                            <div>Total:</div>
                            <div>${totalPrice}</div>
                        </div>
                        <div className="mt-3 flex justify-center">
                            <button onClick={handleCheckout} className="px-12 py-2 bg-[#DB4444] hover:bg-red-700 focus:bg-red-700 text-white rounded">Process to check out</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Cart;