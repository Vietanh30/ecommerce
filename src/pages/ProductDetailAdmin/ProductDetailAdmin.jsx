import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/SideBar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import imgInputFile from "../../assets/Dashboard/imgInputFile.svg";
import React, { useRef, useState } from "react";
import path from "../../constants/path";

function ProductDetailAdmin() {
    const { id } = useParams();
    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length + images.length > 4) {
            alert("You can only upload up to 4 images.");
            return;
        }

        files.forEach((file) => {
            const reader = new FileReader();
            
            reader.onloadstart = () => {
                setUploadProgress(prev => ({
                    ...prev,
                    [file.name]: 0,
                }));
            };

            reader.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percent = Math.round((event.loaded / event.total) * 100);
                    setUploadProgress(prev => ({
                        ...prev,
                        [file.name]: percent,
                    }));
                }
            };

            reader.onload = () => {
                const newImage = {
                    name: file.name,
                    url: URL.createObjectURL(file),
                };
                setImages(prevImages => [...prevImages, newImage]);
                setUploadProgress(prev => ({
                    ...prev,
                    [file.name]: 100,
                }));
            };

            reader.readAsDataURL(file);
        });
    };

    const handleRemoveImage = (imageName) => {
        setImages(prevImages => prevImages.filter(image => image.name !== imageName));
        setUploadProgress(prevProgress => {
            const newProgress = { ...prevProgress };
            delete newProgress[imageName];
            return newProgress;
        });
    };

    console.log(id);
    return ( 
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-full bg-[#E7E7E3]">
                    <Navbar />
                    <div className="px-4">
                        <div className="text-2xl mt-6 font-semibold">Product Details</div>
                        <div className="p-6 rounded-2xl bg-white mt-5">
                            <div className="grid grid-cols-12">
                                <div className="col-span-6">
                                    <div>
                                        <div className="font-semibold text-xl">Product Name</div>
                                        <input className="mt-3 py-2 px-4 border-2 rounded-lg border-[#232321] w-full" type="text" />
                                    </div>
                                    <div className="mt-5">
                                        <div className="font-semibold text-xl">Description</div>
                                        <textarea className="mt-3 py-2 px-4 border-2 rounded-lg border-[#232321] w-full min-h-28 text-left leading-6" />
                                    </div>   
                                    <div className="mt-5">
                                        <div className="font-semibold text-xl">Category</div>
                                        <select className="mt-3 py-2 px-4 border-2 rounded-lg border-[#232321] w-full">
                                            <option value="">1</option>
                                        </select>
                                    </div>  
                                    <div className="mt-5">
                                        <div className="flex gap-6">
                                            <div className="w-full">
                                                <div className="font-semibold text-xl">Regular Price</div>
                                                <input className="mt-3 py-2 px-4 border-2 rounded-lg border-[#232321] w-full" type="text" />

                                            </div>
                                            <div className="w-full">
                                                <div className="font-semibold text-xl">Sale Price</div>
                                                <input className="mt-3 py-2 px-4 border-2 rounded-lg border-[#232321] w-full" type="text" />

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
                                            Drop your images here, or browse
                                        </p>
                                        <p className="text-gray-500">jpeg, png, svg are allowed</p>
                                        <input
                                            type="file"
                                            className="hidden"
                                            ref={fileInputRef}
                                            accept=".jpeg,.jpg,.png,.svg"
                                            multiple
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <div className="font-semibold text-xl">Product Gallery</div>
                                        {images.map((image, index) => (
                                            <div key={index} className="flex items-center justify-between mt-2 p-3 border rounded-lg bg-[#FAFAFA]">
                                                <img 
                                                    src={image.url} 
                                                    alt={image.name} 
                                                    className="w-16 h-16 object-cover mr-2 rounded-lg"
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
                                                            onClick={() => handleRemoveImage(image.name)}
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
                                        ))}
                                    </div>
                                    <div className="mt-8 flex justify-between">
                                        <button className="px-8 py-2 bg-[#232321] rounded-lg text-white hover:bg-[#1a1a1a]">Update</button>
                                        <button className="px-8 py-2 bg-[#003F62] rounded-lg text-white hover:bg-[#002144]">Delete</button>
                                        <Link to={path.allProduct} className="px-8 py-2 border-2 border-[#232321] rounded-lg text-[#232321] hover:bg-[#f0f0f0]">Cancel</Link>                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetailAdmin;