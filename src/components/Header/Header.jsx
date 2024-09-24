import { Link, useLocation } from 'react-router-dom';
import iconCart from '../../assets/Header/iconCart.svg';
import iconSearch from '../../assets/Header/iconSearch.svg';
import path from '../../constants/path';

function Header() {
    const location = useLocation();
    
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
                        <div className='cursor-pointer'>
                            <Link to={path.cart}>
                                <img src={iconCart} alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;