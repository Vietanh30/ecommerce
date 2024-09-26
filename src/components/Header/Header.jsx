import { Link, useLocation } from 'react-router-dom';
import iconCart from '../../assets/Header/iconCart.svg';
import iconSearch from '../../assets/Header/iconSearch.svg';
import path from '../../constants/path';
import { getAccessTokenFromLS } from '../../utils/auth';
import { useEffect, useState } from 'react';
import userApi from '../../api/userApi';

function Header() {
    const location = useLocation();
    const [quantityCart, setQuantityCart] = useState("");

    useEffect(() => {
        const token = getAccessTokenFromLS();
        if (token) {
            fetchCartItems(token);
        }
    }, []);

    const fetchCartItems = async (token) => {
        try {
            const response = await userApi.getCart(token);
            if (response.data.status === 200) {
                const products = response.data.data.products  
                setQuantityCart(products.length)          
                console.log(quantityCart);
                              
            }
        } catch (err) {
            console.log(err);
            
        }
    };
    return ( 
        <div className='border-b'>
            <div className="container mx-auto pt-10 pb-4">
                <div className="flex justify-between">
                    <div className="font-inter text-2xl text-black font-bold">
                        Exclusive
                    </div>
                    <div className="flex gap-12">
                        <Link to={path.home}>
                            <div className={`relative ${location.pathname === path.home ? 'after:content-[""] after:block after:w-full after:h-[2px] after:bg-black after:-translate-y-1 after:mt-1' : ''}`}>
                                Home
                            </div>
                        </Link>
                        <Link to={path.contact}>
                            <div className={`relative ${location.pathname === path.contact ? 'after:content-[""] after:block after:w-full after:h-[2px] after:bg-black after:-translate-y-1 after:mt-1' : ''}`}>
                                Contact
                            </div>
                        </Link>
                        <Link to={path.about}>
                            <div className={`relative ${location.pathname === path.about ? 'after:content-[""] after:block after:w-full after:h-[2px] after:bg-black after:-translate-y-1 after:mt-1' : ''}`}>
                                About
                            </div>
                        </Link>
                        <Link to={path.login}>
                            <div className={`relative ${location.pathname === path.login ? 'after:content-[""] after:block after:w-full after:h-[2px] after:bg-black after:-translate-y-1 after:mt-1' : ''}`}>
                                Signup
                            </div>
                        </Link>    
                    </div>
                    <div className="flex gap-6">
                        <div className="relative">
                            <img 
                                src={iconSearch}
                                alt="search icon" 
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4" 
                            />
                            <input 
                                className='py-2 px-10 bg-[#F5F5F5] rounded text-xs' 
                                type="text" 
                                placeholder="What are you looking for?" 
                            />
                        </div>
                        <div className='cursor-pointer relative'>
                            <Link to={path.cart}>

                                <img src={iconCart} alt="" />
                                <div className='absolute px-1 text-white bg-red-600 left-[-5%] top-[-10%] rounded-full text-[9px] font-semibold'>{quantityCart}</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;