import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/SideBar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import imgInputFile from "../../assets/Dashboard/imgInputFile.svg";
import React, { useRef, useState, useEffect } from "react";
import path from "../../constants/path";
import productApi from "../../api/productApi"; 
import categoryApi from "../../api/categoryApi";
import { getAccessTokenFromLS } from "../../utils/auth"; 
import ErrorAdmin from "../ErrorAdmin/ErrorAdmin";
import Swal from 'sweetalert2';
import Loading from "../../components/Loading/Loading";

function ProductDetailAdmin() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState({});
    const [product, setProduct] = useState(null);
    const [initialProduct, setInitialProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fileImage, setFileImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryDetails, setCategoryDetails] = useState([]);

    // Chỉ gọi getAccessTokenFromLS một lần
    const accessToken = getAccessTokenFromLS();

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Fetch product details
                const productResponse = await productApi.getProductDetail(id, accessToken);
                console.log(productResponse.data.data);
                
                setProduct(productResponse.data.data);
                setInitialProduct(productResponse.data.data);
                setImage(productResponse.data.data.img || null);

                // Fetch categories
                const categoriesResponse = await categoryApi.getAllCategories(accessToken);
                setCategories(categoriesResponse.data.data.data);

                // Fetch category details
                if (productResponse.data.data.category_id) {
                    const categoryResponse = await categoryApi.getCategoryDetails(productResponse.data.data.category_id, accessToken);
                    setCategoryDetails(categoryResponse.data.data);
                }
                setLoading(false);                
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [id, accessToken]); // Chỉ gọi khi `id` thay đổi

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

    const handleUpdate = async () => {
        const data = new FormData();
        let hasChanges = false;
        data.append("id", id);
        // Kiểm tra từng trường để xác định có thay đổi hay không
        if (product.category !== initialProduct.category) {
            data.append("category_id", product.category);
            hasChanges = true;
        }
        if (product.cost_price !== initialProduct.cost_price) {
            data.append("cost_price", product.cost_price);
            hasChanges = true;
        }
        if (product.selling_price !== initialProduct.selling_price) {
            data.append("selling_price", product.selling_price);
            hasChanges = true;
        }
        if (product.name !== initialProduct.name) {
            data.append("name", product.name);
            hasChanges = true;
        }
        if (product.description !== initialProduct.description) {
            data.append("description", product.description);
            hasChanges = true;
        }
        if (fileImage) {
            data.append("image", fileImage);
            hasChanges = true;
        }
        
        // Nếu không có thay đổi nào, thông báo cho người dùng
        if (!hasChanges) {
            Swal.fire({
                icon: 'info',
                title: 'No Changes Made',
                text: 'No fields have been changed. Please update at least one field.',
            });
            return; // Ngừng thực hiện nếu không có thay đổi
        }
        
        try {
            setLoading(true);
            const response = await productApi.editProduct(data, accessToken);
            if (response.data.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Product details updated successfully.',
                })
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
                title: 'Update Failed',
                text: 'Failed to update product. Please try again.',
            });
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel'
        });
        
        if (result.isConfirmed) {
            setLoading(true);
            try {
                const response = await productApi.deleteProduct(id, accessToken);                
                if (response.data.status === 200) {
                    Swal.fire(
                        'Deleted!',
                        'Your product has been deleted.',
                        'success'
                    ).then(() => {
                        navigate(path.allProduct);
                    });
                }
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Delete Failed',
                    text: 'Failed to delete product. Please try again.',
                });
                console.log(err);
            }
            finally{
                setLoading(false);
            }
        }
    };
    if (loading) return <Loading />;
    if (error) return <ErrorAdmin />;
    return ( 
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-full bg-[#E7E7E3]">
                    <Navbar />
                    <div className="px-4">
                        <div className="flex justify-between items-center mt-6">
                            <div className="text-2xl font-semibold">Product Details</div>
                            <Link to={path.addProductChild(id)} className="px-8 py-3 bg-[#003F62] rounded-lg text-white hover:bg-[#002144]">Add Product Child</Link>
                        </div>
                        <div className="p-6 rounded-2xl bg-white mt-5">
                            <div className="grid grid-cols-12">
                                <div className="col-span-6">
                                    <div>
                                        <div className="font-semibold text-xl">Product Name</div>
                                        <input 
                                            className="mt-3 py-2 px-4 border-2 rounded-lg border-[#232321] w-full" 
                                            type="text" 
                                            defaultValue={product.name}
                                            onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <div className="font-semibold text-xl">Description</div>
                                        <textarea 
                                            className="mt-3 py-2 px-4 border-2 rounded-lg border-[#232321] w-full min-h-28 text-left leading-6" 
                                            defaultValue={product.description}
                                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                        />
                                    </div>   
                                    <div className="mt-5">
                                        <div className="font-semibold text-xl">Category</div>
                                        <select 
                                            className="mt-3 py-2 px-4 border-2 rounded-lg border-[#232321] w-full"
                                            value={product.category || ""}
                                            onChange={(e) => setProduct({ ...product, category: e.target.value })}
                                        >
                                            {categoryDetails && (
                                                <option value={categoryDetails.id}>{categoryDetails.name}</option>
                                            )}
                                            {categories.filter(category => category.id !== categoryDetails?.id).map((category) => (
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
                                                    className="mt-3 py-2 px-4 border-2 rounded-lg border-[#232321] w-full" 
                                                    type="text" 
                                                    defaultValue={product.cost_price}
                                                    onChange={(e) => setProduct({ ...product, cost_price: e.target.value })}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <div className="font-semibold text-xl">Sale Price</div>
                                                <input 
                                                    className="mt-3 py-2 px-4 border-2 rounded-lg border-[#232321] w-full" 
                                                    type="text" 
                                                    defaultValue={product.selling_price}
                                                    onChange={(e) => setProduct({ ...product, selling_price: e.target.value })}
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
                                                    src={image.url || product.img} 
                                                    alt={image.name || 'Product Image'} 
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
                                    <div className="mt-8 flex justify-between">
                                        <button onClick={handleUpdate} className="px-8 py-2 bg-[#003F62] rounded-lg text-white hover:bg-[#002144]">Update</button>
                                        <button onClick={handleDelete} className="px-8 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700">Delete</button>
                                        <Link to={path.allProduct} className="px-8 py-2 border-2 border-[#232321] rounded-lg text-[#232321] hover:bg-[#f0f0f0]">Cancel</Link>                                    
                                    </div>
                                </div>
                            </div>
                            <div className="border-b my-8"></div>
                            <div className="font-semibold text-xl">Product Child</div>
                            <div className="grid grid-cols-12 gap-6 mb-8">
                                {product.list_child && product.list_child.length > 0 ? (
                                    product.list_child.map((child) => (
                                        <Link
                                            key={child.id} // Giả sử mỗi sản phẩm có id duy nhất
                                            to={`/product-child/${child.id}`}
                                            className="col-span-4 mt-6 h-full bg-white rounded-2xl p-4 shadow hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out"
                                        >
                                            <div className="flex flex-col gap-4">
                                                <div className="flex gap-4"> 
                                                    <img className="p-2 rounded-lg w-20 h-20 bg-zinc-300" src={child.img || headphone} alt={child.name} />
                                                    <div className="flex flex-col justify-between">
                                                        <div className="text-sm font-semibold">
                                                            {child.feature_name}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-xs">
                                                                <span className="opacity-75">Cost price:</span> ${child.cost_price}
                                                            </div>
                                                            <div className="mt-1 font-semibold text-xs">
                                                                <span className="opacity-75">Sale price:</span> ${child.selling_price}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="border rounded-lg p-4">
                                                    <div className="flex justify-between">
                                                        <div className="text-sm font-medium">Sale</div>
                                                        <div className="text-sm opacity-80">{child.sale}</div>
                                                    </div>
                                                    <div className="border-b my-3"></div>
                                                    <div className="flex justify-between">
                                                        <div className="text-sm font-medium">Remaining Products</div>
                                                        <div className="text-sm opacity-80">{child.quantity}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="col-span-12 text-start text-gray-500">
                                        No child
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetailAdmin;