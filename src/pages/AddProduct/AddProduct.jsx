import Sidebar from "../../components/SideBar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import imgInputFile from "../../assets/Dashboard/imgInputFile.svg";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import path from "../../constants/path";
import { getAccessTokenFromLS } from "../../utils/auth";
import categoryApi from "../../api/categoryApi";
import productApi from "../../api/productApi"; // Đảm bảo bạn có productApi để gọi API thêm sản phẩm
import Error from "../Error/Error";
import Swal from 'sweetalert2';
import Loading from "../../components/Loading/Loading";
function AddProduct() {
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [fileImage, setFileImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState({});
    const [accessToken, setAccessToken] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        categoryId: "",
        costPrice: "",
        salePrice: "",
    });

    useEffect(() => {
        const token = getAccessTokenFromLS();
        setAccessToken(token);
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            if (!accessToken) return;
            try {
                const response = await categoryApi.getAllCategories(accessToken);
                setCategories(response.data.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [accessToken]);

   

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileImage(file)
        if (!file) return;

        const reader = new FileReader();
        reader.onloadstart = () => setUploadProgress({ [file.name]: 0 });
        reader.onprogress = (event) => {
            if (event.lengthComputable) {
                const percent = Math.round((event.loaded / event.total) * 100);
                setUploadProgress({ [file.name]: percent });
            }
        };
        reader.onload = () => {
            const newImage = {
                file: file,
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
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { name, description, categoryId, costPrice, salePrice } = formData;
        if (!name || !description || !categoryId || !costPrice || !salePrice || !image) {
            return "All fields are required.";
        }
        if (isNaN(costPrice) || isNaN(salePrice)) {
            return "Cost Price and Sale Price must be numbers.";
        }
        return null;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorMessage = validateForm();
        if (errorMessage) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: errorMessage,
            });
            return;
        }
    
        const data = new FormData();
        data.append("category_id", formData.categoryId);
        data.append("cost_price", formData.costPrice);
        data.append("selling_price", formData.salePrice);
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("image", fileImage); // Giả sử bạn lưu trữ file trong image.file   
        try {
            setLoading(true);
            const response = await productApi.addProduct(data, accessToken);
            console.log(response);
            
            if (response.data.status === 200){
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Product added successfully!',
            }).then(() => {
                setFormData(
                    {
                    name: "",
                    description: "",
                    categoryId: "",
                    costPrice: "",
                    salePrice: ""
                })
                setFileImage(null)
                setImage(null)
            });
            }
            else if (response.data.status === 422){
                Swal.fire({
                    title: 'Error!',
                    html: `
                        ${response.data.message.name ? response.data.message.name + '<br>' : ''}
                        ${response.data.message.selling_price ? response.data.message.selling_price + '<br>' : ''}
                    `,
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Create Failed',
                text: 'Failed to add product. Please try again.',
            });
            // setError(err.message)
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    };
    if (loading) return <Loading />;
    if (error) return <Error />;
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-full bg-[#E7E7E3]">
                    <Navbar />
                    <div className="px-4">
                        <div className="text-2xl mt-6 font-semibold">Add Product</div>
                        <div className="p-6 rounded-2xl bg-white mt-5">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-12">
                                    <div className="col-span-6">
                                        <div>
                                            <div className="font-semibold text-xl">Product Name</div>
                                            <input
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="mt-3 py-2 px-4 border-2 rounded-lg border-[#232321] w-full"
                                                type="text"
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <div className="font-semibold text-xl">Description</div>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                className="mt-3 py-2 px-4 border-2 rounded-lg border-[#232321] w-full min-h-28 text-left leading-6"
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <div className="font-semibold text-xl">Category</div>
                                            <select
                                                name="categoryId"
                                                value={formData.categoryId}
                                                onChange={handleChange}
                                                className="mt-3 py-2 px-4 border-2 rounded-lg border-[#232321] w-full"
                                            >
                                                <option value="">Select a category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <div className="flex gap-6">
                                                <div className="w-full">
                                                    <div className="font-semibold text-xl">Cost Price</div>
                                                    <input
                                                        name="costPrice"
                                                        value={formData.costPrice}
                                                        onChange={handleChange}
                                                        className="mt-3 py-2 px-4 border-2 rounded-lg border-[#232321] w-full"
                                                        type="number"
                                                    />
                                                </div>
                                                <div className="w-full">
                                                    <div className="font-semibold text-xl">Sale Price</div>
                                                    <input
                                                        name="salePrice"
                                                        value={formData.salePrice}
                                                        onChange={handleChange}
                                                        className="mt-3 py-2 px-4 border-2 rounded-lg border-[#232321] w-full"
                                                        type="number"
                                                    />
                                                </div>
                                            </div>
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
                                            <Link to={path.allProduct} className="px-8 py-2 border-2 border-[#232321] rounded-lg text-[#232321] hover:bg-[#f0f0f0]">Cancel</Link>
                                            <button type="submit" className="px-8 py-2 bg-[#003F62] rounded-lg text-white hover:bg-[#002144]">Add Product</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddProduct;