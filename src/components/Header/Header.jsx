import { Link, useLocation, useNavigate } from 'react-router-dom';
import iconCart from '../../assets/Header/iconCart.svg';
import iconSearch from '../../assets/Header/iconSearch.svg';
import path from '../../constants/path';
import { clearLS, getAccessTokenFromLS } from '../../utils/auth';
import { useEffect, useState } from 'react';
import userApi from '../../api/userApi';
import Swal from 'sweetalert2';
import imgUser from "../../assets/Header/user.svg";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [quantityCart, setQuantityCart] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false); // Trạng thái để theo dõi cuộn
    const token = getAccessTokenFromLS();

    useEffect(() => {
        if (token) {
            fetchCartItems(token);
        }

        // Theo dõi sự kiện cuộn
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [token]);

    const fetchCartItems = async (token) => {
        try {
            const response = await userApi.getCart(token);
            if (response.data.status === 200) {
                const products = response.data.data.products;
                setQuantityCart(products.length);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleLogout = () => {
        Swal.fire({
            title: 'Bạn có chắc không?',
            text: "Bạn sẽ bị đăng xuất!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DB4444',
            cancelButtonColor: '#f0ad4e',
            confirmButtonText: 'Có, đăng xuất!',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                clearLS();
                navigate(path.login);
            }
        });
    };

    return (
        <header className={`border-b z-50 w-full transition-all duration-1500 ${isScrolled ? 'fixed top-0 bg-white shadow-lg text-black' : 'relative bg-transparent text-black'}`}>
            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center">
                    <div className="font-inter text-2xl font-bold">
                        Exclusive
                    </div>
                    <div className="flex gap-12">
                        <Link to={path.home}>
                            <div className={`relative ${location.pathname === path.home ? 'after:content-[""] after:block after:w-full after:h-[2px] after:bg-black after:mt-1' : ''} hover:opacity-70`}>
                                Trang Chủ
                            </div>
                        </Link>
                        <Link to={path.about}>
                            <div className={`relative ${location.pathname === path.about ? 'after:content-[""] after:block after:w-full after:h-[2px] after:bg-black after:mt-1' : ''} hover:opacity-70`}>
                                Giới Thiệu
                            </div>
                        </Link>
                        {location.pathname === path.home && (
                            <>
                                <a href="#flash-sale">
                                    <div className={`relative hover:opacity-70`}>
                                        Giảm giá
                                    </div>
                                </a>
                                <a href="#categories">
                                    <div className={`relative hover:opacity-70`}>
                                        Thể loại
                                    </div>
                                </a>
                                <a href="#location">
                                    <div className={`relative hover:opacity-70`}>
                                        Vị trí
                                    </div>
                                </a>
                            </>
                        )}
                    </div>
                    <div className="flex gap-6">
                        <div className="relative">
                            <img 
                                src={iconSearch}
                                alt="Tìm kiếm" 
                                className="absolute left-2 top-[40%] transform -translate-y-1/2 w-4 h-4" 
                            />
                            <input 
                                className='py-2 px-10 bg-[#F5F5F5] rounded text-xs' 
                                type="text" 
                                placeholder="Bạn đang tìm gì?" 
                            />
                        </div>
                        <div className='cursor-pointer relative'>
                            <Link to={path.cart}>
                                <img src={iconCart} alt="Giỏ hàng" />
                                <div className='absolute px-1 text-white bg-red-600 left-[-5%] top-[-10%] rounded-full text-[9px] font-semibold'>{quantityCart}</div>
                            </Link>
                        </div>
                        <div className="relative">
                            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                                <div>
                                    <img src={imgUser} alt="Tài khoản" />
                                </div>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 bg-white shadow-md rounded mt-2 z-10 w-40">
                                    {token ? (
                                        <>
                                            <Link to={path.historyOrder} className="block px-4 py-2 text-sm text-black hover:bg-gray-200">Lịch Sử Đặt Hàng</Link>
                                            <button 
                                                onClick={handleLogout} 
                                                className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-200"
                                            >
                                                Đăng Xuất
                                            </button>
                                        </>
                                    ) : (
                                        <Link to={path.login} className="block px-4 py-2 text-sm text-black hover:bg-gray-200">Đăng Nhập</Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
