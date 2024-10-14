import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../PrivateRoute/AuthContext'; 
import Swal from 'sweetalert2';
import Header from '../Header/Header';
import StarDisplay from '../Product/Star/Star';
import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';
import userApi from '../../api/userApi';
import { getAccessTokenFromLS } from '../../utils/auth';
import ProductSlider from '../ProductSlider/ProductSlider';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { isAuthenticated, role } = useAuth();
    const [quantity, setQuantity] = useState(1);
    const [hoveredImage, setHoveredImage] = useState('');
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState(null);

    useEffect(() => {
        const token = getAccessTokenFromLS();
        setAccessToken(token);
    }, []);

    const handleImageHover = (image) => {
        setHoveredImage(image);
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            setLoading(true);
            try {
                const response = await userApi.getProductDetail(id);
                const data = response.data.data.currentProduct;
                setProduct(data);
                setRelatedProducts(response.data.data.relatedProducts);
                if (data.list_child && data.list_child.length > 0) {
                    setHoveredImage(data.list_child[0].img);
                }
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleAddToCart = async () => {
        if (!isAuthenticated && role !== 2) {
            navigate(path.login);
        } else {
            const selectedChild = product.list_child.find(child => child.selected);
            if (selectedChild) {
                try {
                    setLoading(true);
                    const response = await userApi.addToCart(selectedChild.id, quantity, accessToken);
                    if (response.data.status === 200) {
                        Swal.fire({
                            title: 'Thành công!',
                            text: 'Sản phẩm đã được thêm vào giỏ hàng.',
                            icon: 'success',
                        }).then(() => {
                            setQuantity(1);
                            const updatedList = product.list_child.map(child => ({
                                ...child,
                                selected: false
                            }));
                            setProduct({ ...product, list_child: updatedList });
                        });
                    }
                    if (response.data.status === 400) {
                        Swal.fire({
                            title: 'Lỗi!',
                            html: `
                                ${response.data.message ? response.data.message + '<br>' : ''}
                            `,
                            icon: 'error',
                            confirmButtonText: 'Thử lại',
                        });
                    }
                } catch (error) {
                    setError(true);
                } finally {
                    setLoading(false);
                }
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Chưa chọn!',
                    text: 'Vui lòng chọn tùy chọn sản phẩm trước khi thêm vào giỏ hàng.',
                    confirmButtonText: 'OK'
                });
            }
        }
    };    

    if (loading) return <Loading />;
    if (!product) return <div>Không tìm thấy sản phẩm.</div>;

    return ( 
        <>
            <Header />
            <div className="container mx-auto mt-20">
                <div className="grid grid-cols-12 gap-16">
                    <div className="col-span-7">
                        <div className="flex justify-between">
                            <div className='gap-6 flex flex-col'>
                                {product.list_child.map((item, index) => (
                                    <div key={index} className={`bg-[#F5F5F5] rounded cursor-pointer ${item.selected ? 'border-2 border-[#DB4444]' : ''}`}>
                                        <img 
                                            className="max-w-32 max-h-28 px-6 py-3" 
                                            src={item.img} 
                                            alt={item.name} 
                                            onMouseEnter={() => handleImageHover(item.img)} 
                                            onClick={() => {
                                                const updatedList = product.list_child.map(child => ({
                                                    ...child,
                                                    selected: child.id === item.id 
                                                }));
                                                setProduct({ ...product, list_child: updatedList });
                                                setHoveredImage(item.img);
                                            }}
                                        />
                                    </div>
                                ))}
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
                        <div className='font-inter text-2xl font-semibold'>{product.name}</div>
                        <div className='mt-2'>
                            <StarDisplay rating={3} />
                        </div>
                        <div className='mt-2 font-inter font-normal text-[#000]'>
                            ${product.selling_price}
                        </div>
                        <div className='mt-4 text-sm font-normal line-clamp-3'>
                            {product.description}
                        </div>
                        <div className='border-b w-full my-4 border-2'></div>
                        <div className='my-4'>
                            <div className='grid grid-cols-12 gap-4'>
                                {product.list_child.map((item) => (
                                    <button key={item.id}
                                        className={`mt-2 text-sm text-center border border-black rounded-md p-2 col-span-3 
                                        ${item.selected ? 'bg-[#DB4444] text-white' : ''} 
                                        focus:bg-[#DB4444] focus:text-white 
                                        hover:bg-[#DB4444] hover:text-white`}
                                        onClick={() => {
                                            const updatedList = product.list_child.map(child => ({
                                                ...child,
                                                selected: child.id === item.id 
                                            }));
                                            setProduct({ ...product, list_child: updatedList });
                                            setHoveredImage(item.img);
                                        }}
                                    >
                                        {item.feature_name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className='mt-5 flex gap-6'>
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
                                <div className='text-xl font-medium w-16 h-full border-black border flex items-center justify-center'>
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
                            <div className='border-black border rounded flex items-center px-2 
                                focus:bg-[#DB4444] focus:text-white focus:border-[#DB4444] 
                                hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444]                                    
                                cursor-pointer group'
                                onClick={handleAddToCart}>
                                <span className='mr-2'>Thêm vào giỏ hàng</span>  
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
                    <div className="text-[#da4445] font-semibold">Sản phẩm liên quan</div>
                </div>
                <div className="mt-6">
                    <div className="font-inter text-3xl font-semibold">Khám phá sản phẩm của chúng tôi</div>
                    <div className="mt-8">
                        <ProductSlider products={relatedProducts} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductDetail;