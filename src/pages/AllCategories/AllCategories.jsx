import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/SideBar/Sidebar";
import headphone from "../../assets/Product/headphone.svg";
import path from "../../constants/path";
import { Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { getAccessTokenFromLS } from "../../utils/auth";
import ErrorAdmin from "../ErrorAdmin/ErrorAdmin";
import categoryApi from "../../api/categoryApi";
import Swal from "sweetalert2";
import imgInputFile from "../../assets/Dashboard/imgInputFile.svg";
import Loading from "../../components/Loading/Loading";

function AllCategories() {
    const [categories, setCategories] = useState([]); // State để lưu trữ sản phẩm
    const [loading, setLoading] = useState(true); // State để quản lý trạng thái tải
    const [error, setError] = useState(null); // State để lưu trữ lỗi
    const [accessToken, setAccessToken] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // State để quản lý modal thêm danh mục
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // State để quản lý modal thông tin
    const [categoryName, setCategoryName] = useState(""); // State cho tên danh mục
    const [categoryImage, setCategoryImage] = useState(null); // State cho ảnh danh mục
    const [categoryNameAdd, setCategoryNameAdd] = useState(""); // State cho tên danh mục
    const [categoryImageAdd, setCategoryImageAdd] = useState(null); // State cho ảnh danh mục
    const [imagePreview, setImagePreview] = useState(null); // State cho preview ảnh
    const [imagePreviewAdd, setImagePreviewAdd] = useState(null); // State cho preview ảnh
    const [selectedCategory, setSelectedCategory] = useState(null); // State cho danh mục đã chọn
    const fileInputRef = useRef(null); // Sử dụng ref để tham chiếu đến input file

    // Lấy accessToken từ localStorage
    useEffect(() => {
        const token = getAccessTokenFromLS();
        setAccessToken(token);
    }, []);

    // Gọi API để lấy danh sách sản phẩm khi accessToken có sẵn
    useEffect(() => {
        const fetchProducts = async () => {
            if (!accessToken) return; // Nếu không có accessToken, không gọi API

            try {
                const response = await categoryApi.getAllCategories(accessToken); // Gọi API                
                setCategories(response.data.data.data); // Giả sử response.data chứa danh sách sản phẩm
            } catch (err) {
                setError(err.message); // Lưu trữ lỗi nếu có
            } finally {
                setLoading(false); // Cập nhật trạng thái tải
            }
        };

        fetchProducts();
    }, [accessToken]); // Thêm accessToken vào dependency array

    const handleAddCategory = async () => {
        setLoading(true)

        if (!categoryNameAdd || !categoryImageAdd) {
            Swal.fire({
                title: 'Warning!',
                text: 'Please fill in all fields.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return;
        }
    
        const formData = new FormData();
        formData.append("name", categoryNameAdd);
        formData.append("image", categoryImageAdd);
    
        try {
            const response = await categoryApi.addCategory(formData, accessToken); // Gọi API với accessToken              
            if (response.data.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Category added successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                setCategories([...categories, { id: response.data.data.id, name: categoryNameAdd, img: URL.createObjectURL(categoryImageAdd) }]); // Cập nhật danh sách danh mục
                setIsModalOpen(false); // Đóng modal
                setCategoryNameAdd(""); // Reset tên danh mục
                setCategoryImageAdd(null); // Reset ảnh danh mục
                setImagePreviewAdd(null); // Reset preview ảnh
            } else if (response.data.status === 422) {
                Swal.fire({
                    title: 'Error!',
                    text: response.data.message.name || 'Invalid input.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add category. Please try again.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
        finally{
            setLoading(false)
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCategoryImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleImageChangeAdd = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCategoryImageAdd(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewAdd(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleClick = () => {
        fileInputRef.current.click(); // Mở hộp thoại chọn file khi nhấp vào khung
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category); // Cập nhật danh mục đã chọn
        setCategoryName(category.name); // Đặt tên danh mục vào input
        setImagePreview(category.img); // Đặt ảnh từ danh mục đã chọn vào preview
        setIsInfoModalOpen(true); // Mở modal thông tin
    };

    const handleDeleteCategory = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });
    
        if (result.isConfirmed) {
        setLoading(true);
            try {
                const response = await categoryApi.deleteCategory(selectedCategory.id, accessToken); // Gọi API xóa danh mục
                if (response.data.status === 200) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Category deleted successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    setCategories(categories.filter(item => item.id !== selectedCategory.id)); // Cập nhật danh sách sản phẩm
                    setIsInfoModalOpen(false); // Đóng modal thông tin
                    setSelectedCategory(null); // Reset danh mục đã chọn
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to delete category. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
            finally{
                setLoading(false);

            }
        }
    };

    const handleUpdateCategory = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("id", selectedCategory.id);
    
        // Kiểm tra xem có thay đổi gì không
        let isUpdated = false;
    
        if (categoryName && categoryName !== selectedCategory.name) {
            formData.append("name", categoryName);
            isUpdated = true; // Đánh dấu là có sự thay đổi
        }
    
        if (categoryImage) {
            formData.append("image", categoryImage);
            isUpdated = true; // Đánh dấu là có sự thay đổi
        }
    
        if (!isUpdated) {
            Swal.fire({
                title: 'No Changes!',
                text: 'Please update the category name or image before submitting.',
                icon: 'info',
                confirmButtonText: 'OK',
            });
            return; // Nếu không có thay đổi, không gọi API
        }
    
        try {
            const response = await categoryApi.editCategory(formData, accessToken); // Gọi API cập nhật danh mục            
            if (response.data.status === 200) {
                Swal.fire({
                    title: 'Updated!',
                    text: 'Category updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                setIsInfoModalOpen(false); // Đóng modal thông tin
                setSelectedCategory(null); // Reset danh mục đã chọn
                setCategories(categories.map(item => 
                    item.id === selectedCategory.id 
                        ? { ...item, name: categoryName, img: categoryImage ? URL.createObjectURL(categoryImage) : item.img } 
                        : item
                )); // Cập nhật danh sách sản phẩm
            } else if (response.data.status === 422) {
                Swal.fire({
                    title: 'Error!',
                    html: `
                        ${response.data.message.name ? response.data.message.name + '<br>' : ''}
                    `,
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
             else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update category. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update category. Please try again.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
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
                    <div className="px-8">
                        <div className="flex justify-between items-center mt-6">
                            <div className="text-2xl font-semibold">All Categories</div>
                            <button 
                                onClick={() => setIsModalOpen(true)} 
                                className="px-8 py-3 bg-[#003F62] rounded-lg text-white hover:bg-[#002144]"
                            >
                                Add Category
                            </button>
                        </div>
                        <div className="mt-8">
                            <div className="grid grid-cols-12 gap-4">
                                {categories.map((category) => (
                                    <button
                                        key={category.id} // Giả sử mỗi sản phẩm có id duy nhất
                                        onClick={() => handleCategoryClick(category)} // Mở modal thông tin khi nhấp vào danh mục
                                        className="col-span-3 h-full bg-[#FAFAFA] rounded-2xl p-4 hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out"
                                    >
                                        <div className="flex flex-col gap-4">
                                            <div className="flex gap-4 items-center"> 
                                                <img className="p-2 rounded-lg w-12 h-12 bg-zinc-300" src={category.img || headphone} alt={category.name} />
                                                <div className="flex flex-col justify-between">
                                                    <div className="text-sm font-semibold">
                                                        {category.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Thêm Danh Mục */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded shadow-lg p-6 w-1/3">
                        <h2 className="text-xl font-semibold">Add Category</h2>
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Category Name"
                                value={categoryNameAdd}
                                onChange={(e) => setCategoryNameAdd(e.target.value)}
                                className="mt-3 py-2 px-4 border-2 rounded-lg border-[#232321] w-full"
                            />
                            <div className="col-span-4 col-start-8 mt-4">
                                <div
                                    className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer"
                                    onClick={handleClick}
                                >
                                    <div className="flex justify-center mb-4">
                                        <img className="w-10 h-auto" src={imgInputFile} alt="Upload" />
                                    </div>
                                    <p className="text-blue-500 font-semibold mb-2 text-sm">
                                        Drop your image here, or browse
                                    </p>
                                    <p className="text-gray-500 text-sm">jpeg, png, svg are allowed</p>
                                    <input
                                        type="file"
                                        className="hidden"
                                        ref={fileInputRef}
                                        accept=".jpeg,.jpg,.png,.svg"
                                        onChange={handleImageChangeAdd}
                                    />
                                </div>
                                {imagePreviewAdd && (
                                    <div className="flex items-center justify-between mt-2 p-1 border rounded-lg bg-[#FAFAFA]">
                                        <img
                                            src={imagePreviewAdd}
                                            alt="Preview"
                                            className="w-16 h-auto object-cover mr-2 rounded-lg"
                                        />
                                        <div className="w-full px-3 flex justify-between">
                                            <span>{categoryImageAdd.name || "Uploaded Image"}</span>
                                            <button
                                                className="text-white rounded-full ml-2 px-2 py-1 bg-red-600 text-xs"
                                                onClick={() => {
                                                    setCategoryImageAdd(null);
                                                    setImagePreview(null);
                                                }}
                                            >
                                                X
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mr-2 px-6 py-2 border-2 border-[#232321] rounded-lg text-[#232321] hover:bg-[#f0f0f0]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddCategory}
                                className="px-6 py-2 bg-[#003F62] rounded-lg text-white hover:bg-[#002144]"
                            >
                                Add Category
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Thông Tin Danh Mục */}
            {isInfoModalOpen && selectedCategory && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded shadow-lg p-6 w-1/3">
                        <h2 className="text-xl font-semibold">Category Info</h2>
                        <div className="mt-4">
                            <div className="mb-4">
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        className="border border-gray-300 rounded-lg p-2 mb-2"
                                    />
                                    <div
                                        className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer"
                                        onClick={handleClick}
                                    >
                                        <img className="w-10 h-auto mx-auto" src={imgInputFile} alt="Upload" />
                                        <p className="text-blue-500 font-semibold my-2 text-sm">
                                            Drop your image here, or browse
                                        </p>
                                        <p className="text-gray-500 text-sm">jpeg, png, svg are allowed</p>
                                        <input
                                            type="file"
                                            className="hidden"
                                            ref={fileInputRef}
                                            accept=".jpeg,.jpg,.png,.svg"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                    {imagePreview && (
                                        <div className="flex items-center justify-between mt-2 p-1 border rounded-lg bg-[#FAFAFA]">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-16 h-auto object-cover mr-2 rounded-lg"
                                            />
                                            <div className="w-full px-3 flex justify-between">
                                                <span>{categoryImage?.name || "Uploaded Image"}</span>
                                                <button
                                                    className="text-white rounded-full ml-2 px-2 py-1 bg-red-600 text-xs"
                                                    onClick={() => {
                                                        setCategoryImage(null);
                                                        setImagePreview(selectedCategory.img); // Reset preview về ảnh ban đầu
                                                    }}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setIsInfoModalOpen(false)}
                                className="mr-2 px-6 py-2 border-2 border-[#232321] rounded-lg text-[#232321] hover:bg-[#f0f0f0]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateCategory}
                                className="mr-2 px-6 py-2 bg-[#003F62] rounded-lg text-white hover:bg-[#002144]"
                            >
                                Update
                            </button>
                            <button
                                onClick={handleDeleteCategory}
                                className="px-6 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AllCategories;