import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bgLogin from "../../assets/Login/bg-login.svg";
import path from "../../constants/path";
import userApi from "../../api/userApi";
import { setAccessTokenToLS } from "../../utils/auth";

function Login() {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form

        // Kiểm tra xem các trường có trống không
        if (!emailOrPhone || !password) {
            Swal.fire({
                title: 'Warning!',
                text: 'Please fill in all fields.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return; // Ngừng thực thi nếu có trường trống
        }

        try {
            const response = await userApi.login(emailOrPhone, password);
           if(response.data.status === 200) {
               Swal.fire({
                   title: 'Success!',
                   text: 'You have logged in successfully.',
                   icon: 'success',
                   timer: 1500,
                   showConfirmButton: false
               }).then(() => {
                setAccessTokenToLS(response.data.access_token)
                navigate(path.home)
               });
           }
           else if(response.data.status === 422){
            Swal.fire({
                title: 'Error!',
                html: `
                    ${response.data.message.email ? response.data.message.email + '<br>':''} 
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
                text: 'Login failed. Please check your credentials.',
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
                            Log in to Exclusive
                        </div>
                        <div className="text-base mt-4">
                            Enter your details below
                        </div>
                        <form onSubmit={handleLogin} className="mt-10 w-3/5">
                            <input 
                                className="border-b-2 p-2 w-full outline-none" 
                                type="text" 
                                placeholder="Email or Phone Number" 
                                value={emailOrPhone}
                                onChange={(e) => setEmailOrPhone(e.target.value)}
                            />
                            <input 
                                className="border-b-2 p-2 w-full mt-8 outline-none" 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="mt-3 text-[#DB4444] text-sm text-end hover:underline ms-1">Forgot Password?</div>
                            <div className="mt-5">
                                <button className="w-full py-3 bg-[#DB4444] hover:bg-red-700 focus:bg-red-700 text-white rounded" type="submit">Log in</button>
                            </div>
                            <div className="mt-5 text-center">
                                <span className="text-sm">Don't have an account? </span>
                                <Link to={path.register} className="text-[#DB4444] hover:underline ms-1">Sign up</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;