import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import xbox1 from "../../assets/Product/xbox1.svg";
import xbox2 from "../../assets/Product/xbox2.svg";
import xbox3 from "../../assets/Product/xbox3.svg";
import xbox4 from "../../assets/Product/xbox4.svg";
import StarDisplay from '../Product/Star/Star';
import ProductSlider from '../ProductSlider/ProductSlider';
import Footer from '../Footer/Footer';

function ProductDetail() {
    const { id } = useParams(); // Lấy ID từ URL
    console.log(id);
    
    const [quantity, setQuantity] = useState(1); // State cho số lượng
    const [hoveredImage, setHoveredImage] = useState(xbox1); // State cho ảnh lớn

    const handleImageHover = (image) => {
        setHoveredImage(image);
    };

    return ( 
        <div>
            <Header />
            <div className="container mx-auto mt-20">
                <div className="grid grid-cols-12 gap-16">
                    <div className="col-span-7">
                        <div className="flex justify-between">
                            <div className='gap-6 flex flex-col'>
                                <div className="bg-[#F5F5F5] rounded cursor-pointer">
                                    <img 
                                        className="max-w-32 max-h-28 px-6 py-3" 
                                        src={xbox1} 
                                        alt="" 
                                        onMouseEnter={() => handleImageHover(xbox1)}
                                    />
                                </div>
                                <div className="bg-[#F5F5F5] rounded cursor-pointer">
                                    <img 
                                        className="max-w-32 max-h-28 px-6 py-3" 
                                        src={xbox2} 
                                        alt="" 
                                        onMouseEnter={() => handleImageHover(xbox2)}
                                    />
                                </div>
                                <div className="bg-[#F5F5F5] rounded cursor-pointer">
                                    <img 
                                        className="max-w-32 max-h-28 px-6 py-3" 
                                        src={xbox3} 
                                        alt="" 
                                        onMouseEnter={() => handleImageHover(xbox3)}
                                    />
                                </div>
                                <div className="bg-[#F5F5F5] rounded cursor-pointer">
                                    <img 
                                        className="max-w-32 max-h-28 px-6 py-3" 
                                        src={xbox4} 
                                        alt="" 
                                        onMouseEnter={() => handleImageHover(xbox4)}
                                    />
                                </div>
                            </div>
                            <div className="bg-[#F5F5F5] rounded w-4/5 flex items-center">
                                <img 
                                    className='max-w-md max-h-80 min-w-md min-h-80 mx-auto' 
                                    src={hoveredImage} 
                                    alt="" 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className='font-inter text-2xl font-semibold'>Havic HV G-92 Gamepad</div>
                        <div className='mt-2'>
                            <StarDisplay rating={3} />
                        </div>
                        <div className='mt-2 font-inter font-normal text-[#000]'>
                            $192.00
                        </div>
                        <div className='mt-4 text-sm font-normal'>
                            PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.
                        </div>
                        <div className='border-b w-full my-4 border-2'></div>
                        <div className=''>Colours: </div>
                        <div className='mt-4 flex gap-6 items-center'>
                            <div>Size:</div>
                            <div className='flex gap-4'>
                                {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                    <button key={size} className='text-sm font-medium w-8 h-8 
                                        focus:bg-[#DB4444] focus:text-white focus:border-[#DB4444] 
                                        hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] 
                                        border rounded border-black'>
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className='mt-5 flex gap-4'>
                            <div className='flex'>
                                <button 
                                    className='text-3xl px-3 py-[2px] border-black border border-r-0 
                                        rounded-s-md focus:bg-[#DB4444] focus:text-white 
                                        focus:border-[#DB4444] hover:bg-[#DB4444] 
                                        hover:text-white hover:border-[#DB4444]'
                                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                                >
                                    -
                                </button>
                                <div className='text-xl font-medium px-6 w-16 h-full border-black border flex items-center'>
                                    {quantity}
                                </div>
                                <button 
                                    className='text-2xl px-3 py-[2px] border-black border border-s-0 
                                        rounded-e-md focus:bg-[#DB4444] focus:text-white 
                                        focus:border-[#DB4444] hover:bg-[#DB4444] 
                                        hover:text-white hover:border-[#DB4444]'
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button className='bg-[#DB4444] text-base font-medium px-12 rounded text-white 
                                hover:bg-red-700 focus:bg-red-700'>
                                Buy Now
                            </button>
                            <div className='border-black border rounded flex items-center px-2 
                                focus:bg-[#DB4444] focus:text-white focus:border-[#DB4444] 
                                hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] 
                                cursor-pointer group'>
                                <FontAwesomeIcon 
                                    icon={faShoppingCart} 
                                    className='w-5 h-5 p-1 text-black group-hover:text-white' 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto my-20">
                <div className="flex gap-5 items-center">
                    <div className="w-4 h-8 bg-[#da4445] rounded-sm"></div>
                    <div className="text-[#da4445] font-semibold">Related Item</div>
                </div>
                <div className="mt-6">
                    <div className="font-inter text-3xl font-semibold">Explore Our Products</div>
                    <div className="mt-8">
                        <ProductSlider/>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductDetail;