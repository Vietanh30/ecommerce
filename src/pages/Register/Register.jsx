import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bgLogin from "../../assets/Login/bg-login.svg";
import path from "../../constants/path";
import userApi from "../../api/userApi"; // Nhập userApi để gọi API

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); // Tách email
    const [phone, setPhone] = useState(""); // Tách phone
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form

        // Kiểm tra xem các trường có trống không
        if (!name || (!email && !phone) || !password) {
            Swal.fire({
                title: 'Warning!',
                text: 'Please fill in all fields.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return; // Ngừng thực thi nếu có trường trống
        }

        try {
            const response = await userApi.registerAccount( name, email, phone, password );
            console.log(response);
            if (response.data.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your account has been created successfully.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    setName("")
                    setEmail("")
                    setPhone("")
                    setPassword("")
                });
            } else if (response.data.status === 422) {
                Swal.fire({
                    title: 'Error!',
                    html: `
                        ${response.data.message.name ? response.data.message.name + '<br>' : ''}
                        ${response.data.message.email ? response.data.message.email + '<br>' : ''}
                        ${response.data.message.phone ? response.data.message.phone + '<br>' : ''}
                        ${response.data.message.password ? response.data.message.password + '<br>' : ''}
                    `,
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {
            // Hiển thị thông báo lỗi
            Swal.fire({
                title: 'Error!',
                text: 'Registration failed. Please try again later.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };

    return ( 
        <>
            <div className="container-fluid">
                <div className="grid grid-cols-12 items-center justify-evenly">
                    <div className="col-span-6">
                        <img className="w-full max-h-screen" src={bgLogin} alt="" />
                    </div>
                    <div className="col-span-5 col-start-8">
                        <div className="text-4xl font-medium">
                            Create an account
                        </div>
                        <div className="text-base mt-4">
                            Enter your details below
                        </div>
                        <form onSubmit={handleRegister} className="mt-10 w-3/5">
                            <input 
                                className="border-b-2 p-2 w-full outline-none" 
                                type="text" 
                                placeholder="Name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input 
                                className="border-b-2 p-2 w-full mt-8 outline-none" 
                                type="text" 
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input 
                                className="border-b-2 p-2 w-full mt-8 outline-none" 
                                type="text" 
                                placeholder="Phone Number" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <input 
                                className="border-b-2 p-2 w-full mt-8 outline-none" 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="mt-5">
                                <button className="w-full py-3 bg-[#DB4444] hover:bg-red-700 focus:bg-red-700 text-white rounded" type="submit">
                                    Create Account
                                </button>
                            </div>
                            <div className="text-center mt-5 opacity-70">
                                Already have an account? 
                                <span className="text-[#DB4444] hover:underline ms-1">
                                    <Link to={path.login}>Log in</Link>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;