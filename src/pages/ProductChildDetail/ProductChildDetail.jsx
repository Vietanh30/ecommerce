import Sidebar from "../../components/SideBar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import imgInputFile from "../../assets/Dashboard/imgInputFile.svg";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import path from "../../constants/path";
import productApi from "../../api/productApi"; // Import API
import Swal from 'sweetalert2'; // Import SweetAlert2
import { getAccessTokenFromLS } from "../../utils/auth";
import Loading from "../../components/Loading/Loading";
import ErrorAdmin from "../ErrorAdmin/ErrorAdmin";

function ProductChildDetail() {
    const { id } = useParams();
    const [accessToken, setAccessToken] = useState("");
    const [loading, setLoading] = useState(false); // Trạng thái tải
    const [error, setError] = useState(null); // Lỗi
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [fileImage, setFileImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState({});
    const [productData, setProductData] = useState({
        product_id: id, // Sử dụng ID của sản phẩm cha
        feature_name: "",
        cost_price: "",
        selling_price: "",
        quantity: "",
    });
    const [initialProductData, setInitialProductData] = useState({}); // Dữ liệu ban đầu

    useEffect(() => {
        const token = getAccessTokenFromLS();
        setAccessToken(token);
        
        if (token) {
            fetchProductChildDetail(token);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: 'Không tìm thấy mã truy cập.',
            });
        }
    }, [id]);

    const fetchProductChildDetail = async (token) => {
        setLoading(true);
        try {
            const response = await productApi.getProductChildDetail(id, token);
            const data = response.data.data;
            setProductData({
                product_id: data.product_id,
                feature_name: data.feature_name,
                cost_price: data.cost_price,
                selling_price: data.selling_price,
                quantity: data.quantity,
            });
            setInitialProductData({ // Cập nhật dữ liệu ban đầu
                product_id: data.product_id,
                feature_name: data.feature_name,
                cost_price: data.cost_price,
                selling_price: data.selling_price,
                quantity: data.quantity,
            });
            setImage({ url: data.img, name: data.feature_name }); // Giả sử API trả về trường hình ảnh
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileImage(file);
        if (!file) return;

        const reader = new FileReader();

        reader.onloadstart = () => {
            setUploadProgress({ [file.name]: 0 });
        };

        reader.onprogress = (event) => {
            if (event.lengthComputable) {
                const percent = Math.round((event.loaded / event.total) * 100);
                setUploadProgress({ [file.name]: percent });
            }
        };

        reader.onload = () => {
            const newImage = {
                name: file.name,
                url: URL.createObjectURL(file),
            };
            setImage(newImage);
            setUploadProgress({ [file.name]: 100 });
        };

        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setImage(null);
        setUploadProgress({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const { feature_name, cost_price, selling_price, quantity } = productData;
        if (!feature_name || !cost_price || !selling_price || !quantity || !image) {
            Swal.fire({
                icon: 'warning',
                title: 'Thông tin chưa đầy đủ',
                text: 'Vui lòng điền tất cả các trường và tải lên hình ảnh.',
            });
            return false;
        }
        return true;
    };

    const hasChanges = () => {
        return Object.keys(productData).some(key => 
            key !== "product_id" && productData[key] !== initialProductData[key]
        ) || (fileImage !== null); // Kiểm tra xem có file hình ảnh mới không
    };

    const handleUpdateProductChild = async () => {
        if (!validateForm()) return;
        
        if (!hasChanges()) {
            Swal.fire({
                icon: 'info',
                title: 'Không có thay đổi',
                text: 'Vui lòng sửa đổi ít nhất một trường trước khi cập nhật.',
            });
            return;
        }
    
        const data = new FormData();
        data.append("id", id);
        
        // Chỉ append các trường đã thay đổi
        if (productData.feature_name !== initialProductData.feature_name) {
            data.append("feature_name", productData.feature_name);
        }
        if (productData.cost_price !== initialProductData.cost_price) {
            data.append("cost_price", productData.cost_price);
        }
        if (productData.selling_price !== initialProductData.selling_price) {
            data.append("selling_price", productData.selling_price);
        }
        if (productData.quantity !== initialProductData.quantity) {
            data.append("quantity", productData.quantity);
        }
        if (fileImage) { // Hoặc image !== null
            data.append("image", fileImage);
        }
        
        try {
            setLoading(true);
            const response = await productApi.editProductChild(data, accessToken);
            console.log(response);
            
            if (response.data.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công!',
                    text: 'Sản phẩm con đã được cập nhật.',
                }).then(() => {
                    navigate(`${path.allProduct}/${productData.product_id}`);
                });
            }
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProductChild = async () => {
        const result = await Swal.fire({
            title: 'Bạn có chắc không?',
            text: "Bạn sẽ không thể khôi phục lại điều này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        });

        if (result.isConfirmed) {
            setLoading(true);
            try {
                const response = await productApi.deleteProductChild(id, accessToken);
                if (response.status === 200) {
                    Swal.fire('Đã xóa!', 'Sản phẩm con đã được xóa.', 'success').then(() => {
                        navigate(`${path.allProduct}/${productData.product_id}`);
                    });
                }
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) return <Loading />; // Hiển thị loading khi đang tải
    if (error) return <ErrorAdmin />; // Hiển thị lỗi nếu có

    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-full bg-[#E7E7E3]">
                    <Navbar />
                    <div className="px-4">
                        <div className="text-2xl mt-6 font-semibold">Chi Tiết Sản Phẩm Con</div>
                        <div className="p-6 rounded-2xl bg-white mt-5">
                            <div className="grid grid-cols-12">
                                <div className="col-span-6">
                                    <div>
                                        <div className="font-semibold text-xl">Tên Tính Năng</div>
                                        <input 
                                            className="mt-3 py-2 px-4 border-2 rounded-lg border-[#232321] w-full" 
                                            type="text" 
                                            name="feature_name"
                                            value={productData.feature_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <div className="font-semibold text-xl">Giá Gốc</div>
                                        <input 
                                            className="mt-3 py-2 px-4 border-2 rounded-lg border-[#232321] w-full" 
                                            type="number" 
                                            name="cost_price"
                                            value={productData.cost_price}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <div className="font-semibold text-xl">Giá Bán</div>
                                        <input 
                                            className="mt-3 py-2 px-4 border-2 rounded-lg border-[#232321] w-full" 
                                            type="number" 
                                            name="selling_price"
                                            value={productData.selling_price}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <div className="font-semibold text-xl">Số Lượng</div>
                                        <input 
                                            className="mt-3 py-2 px-4 border-2 rounded-lg border-[#232321] w-full" 
                                            type="number" 
                                            name="quantity"
                                            value={productData.quantity}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-span-4 col-start-8">
                                    <div
                                        className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer"
                                        onClick={handleClick}
                                    >
                                        <div className="flex justify-center mb-4">
                                            <img src={imgInputFile} alt="Tải lên" />
                                        </div>
                                        <p className="text-blue-500 font-semibold mb-2">
                                            Kéo thả hình ảnh của bạn vào đây, hoặc duyệt
                                        </p>
                                        <p className="text-gray-500">jpeg, png, svg được chấp nhận</p>
                                        <input
                                            type="file"
                                            className="hidden"
                                            ref={fileInputRef}
                                            accept=".jpeg,.jpg,.png,.svg"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <div className="font-semibold text-xl">Hình Ảnh Sản Phẩm</div>
                                        {image && (
                                            <div className="flex items-center justify-between mt-2 p-3 border rounded-lg bg-[#FAFAFA]">
                                                <img 
                                                    src={image.url} 
                                                    alt={image.name} 
                                                    className="w-16 h-auto object-cover mr-2 rounded-lg"
                                                />
                                                <div className="w-full px-3">
                                                    <div className="flex mb-2 items-center justify-between">
                                                        <span>{image.name}</span>
                                                        {uploadProgress[image.name] !== undefined && (
                                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                                                                {uploadProgress[image.name]}%
                                                            </span>
                                                        )}
                                                        <button
                                                            className="text-white rounded-full ml-2 px-2 py-1 bg-red-600 text-xs"
                                                            onClick={handleRemoveImage}
                                                        >
                                                            X
                                                        </button>
                                                    </div>
                                                    {uploadProgress[image.name] !== undefined && (
                                                        <div className="flex h-2 mb-2 overflow-hidden text-xs bg-gray-200 rounded">
                                                            <div
                                                                style={{ width: `${uploadProgress[image.name]}%` }}
                                                                className="flex flex-col text-center text-white bg-teal-500 shadow-none rounded"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-8 flex justify-end gap-5">
                                        <button 
                                            onClick={handleUpdateProductChild} 
                                            className="px-8 py-2 bg-[#003F62] rounded-lg text-white hover:bg-[#002144]"
                                        >
                                            Cập Nhật
                                        </button>
                                        <button 
                                            onClick={handleDeleteProductChild} 
                                            className="px-8 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700"
                                        >
                                            Xóa
                                        </button>
                                        <Link to={`${path.allProduct}/${productData.product_id}`} className="px-8 py-2 border-2 border-[#232321] rounded-lg text-[#232321] hover:bg-[#f0f0f0]">Hủy</Link>
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

export default ProductChildDetail;