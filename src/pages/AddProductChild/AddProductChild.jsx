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

function AddProductChild() {
    const { id } = useParams();
    const [accessToken, setAccessToken] = useState("");
    const [loading, setLoading] = useState(false); // State để quản lý trạng thái tải
    const [error, setError] = useState(false); // State để lưu trữ lỗi
    const navigate = useNavigate()
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
    useEffect(() => {
        const token = getAccessTokenFromLS();
        setAccessToken(token);
    }, []);
    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileImage(file)
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
            [name]: value
        });
    };

    const validateForm = () => {
        const { feature_name, cost_price, selling_price, quantity } = productData;
        if (!feature_name || !cost_price || !selling_price || !quantity || !image) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Information',
                text: 'Please fill in all fields and upload an image.',
            });
            return false;
        }
        return true;
    };

    const handleAddProductChild = async () => {
        if (!validateForm()) return;
        
        const data = new FormData();
        data.append("product_id", productData.product_id); // ID của sản phẩm cha
        data.append("feature_name", productData.feature_name);
        data.append("cost_price", productData.cost_price);
        data.append("selling_price", productData.selling_price);
        data.append("quantity", productData.quantity);
        
        if (image) {
            data.append("image", fileImage); // Gửi ảnh
        }

        try {
            setLoading(true);
            const response = await productApi.addProductChild(data, accessToken);
            console.log(response);
            
            if (response.data.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Product child added successfully.',
                }).then(() => {
                    setProductData({
                        product_id: id, // Sử dụng ID của sản phẩm cha
                        feature_name: "",
                        cost_price: "",
                        selling_price: "",
                        quantity: "",
                    })
                    setImage(null)
                });
                // Xử lý điều hướng hoặc reset form ở đây nếu cần
            }
            else if (response.data.status === 422){
                Swal.fire({
                    title: 'Error!',
                    html: `
                        ${response.data.message.feature_name ? response.data.message.feature_name + '<br>' : ''}
                        ${response.data.message.selling_price ? response.data.message.selling_price + '<br>' : ''}
                    `,
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {
            setError(true)
            console.error(error);
        }
        finally{
            setLoading(false);
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
                        <div className="text-2xl mt-6 font-semibold">Add Product Child</div>
                        <div className="p-6 rounded-2xl bg-white mt-5">
                            <div className="grid grid-cols-12">
                                <div className="col-span-6">
                                    <div>
                                        <div className="font-semibold text-xl">Feature Name</div>
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
                                        <div className="font-semibold text-xl">Cost Price</div>
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
                                        <div className="font-semibold text-xl">Selling Price</div>
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
                                        <div className="font-semibold text-xl">Quantity</div>
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
                                            <img src={imgInputFile} alt="Upload" />
                                        </div>
                                        <p className="text-blue-500 font-semibold mb-2">
                                            Drop your image here, or browse
                                        </p>
                                        <p className="text-gray-500">jpeg, png, svg are allowed</p>
                                        <input
                                            type="file"
                                            className="hidden"
                                            ref={fileInputRef}
                                            accept=".jpeg,.jpg,.png,.svg"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <div className="font-semibold text-xl">Product Image</div>
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
                                    <Link to={`${path.allProduct}/${id}`} className="px-8 py-2 border-2 border-[#232321] rounded-lg text-[#232321] hover:bg-[#f0f0f0]">Cancel</Link>                                        <button 
                                            onClick={handleAddProductChild} 
                                            className="px-8 py-2 bg-[#003F62] rounded-lg text-white hover:bg-[#002144]"
                                        >
                                            Add Product Child
                                        </button>
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

export default AddProductChild;