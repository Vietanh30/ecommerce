import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bgLogin from "../../assets/Login/bg-login.svg";
import path from "../../constants/path";
import adminApi from "../../api/adminApi";
import { clearLS, setAccessTokenToLS, setProfileToLS } from "../../utils/auth";
import Loading from "../../components/Loading/Loading";
import ErrorAdmin from "../ErrorAdmin/ErrorAdmin";

function LoginAdmin() {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form
        
        // Kiểm tra xem các trường có trống không
        if (!emailOrPhone || !password) {
            Swal.fire({
                title: 'Cảnh báo!',
                text: 'Vui lòng điền tất cả các trường.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return; // Ngừng thực thi nếu có trường trống
        }
        
        setLoading(true);
        try {
            const response = await adminApi.login(emailOrPhone, password);
            console.log(response);
            if (response.data.status === 200) {
                clearLS();
                Swal.fire({
                    title: 'Thành công!',
                    text: 'Bạn đã đăng nhập thành công.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    setAccessTokenToLS(response.data.data.access_token);
                    navigate(path.dashboard);
                });
                const profile = await adminApi.getProfile(response.data.data.access_token);
                setProfileToLS(profile.data.data);
            } else if (response.data.status === 422) {
                Swal.fire({
                    title: 'Lỗi!',
                    html: `
                        ${response.data.message.email ? response.data.message.email + '<br>' : ''} 
                        ${response.data.message.password ? response.data.message.password + '<br>' : ''} 
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
    };

    if (loading) return <Loading />; // Hiển thị loading khi đang tải
    if (error) return <ErrorAdmin />; // Hiển thị lỗi nếu có

    return ( 
        <>
            <div className="container-fluid">
                <div className="grid grid-cols-12 items-center justify-evenly">
                    <div className="col-span-6">
                        <img className="w-full max-h-screen" src={bgLogin} alt="" />
                    </div>
                    <div className="col-span-5 col-start-8">
                        <div className="text-4xl font-medium">
                            Đăng Nhập vào Exclusive
                        </div>
                        <div className="text-base mt-4">
                            Nhập thông tin của bạn bên dưới
                        </div>
                        <form onSubmit={handleLogin} className="mt-10 w-3/5">
                            <input 
                                className="border-b-2 p-2 w-full outline-none" 
                                type="text" 
                                placeholder="Email hoặc Số Điện Thoại" 
                                value={emailOrPhone}
                                onChange={(e) => setEmailOrPhone(e.target.value)}
                            />
                            <input 
                                className="border-b-2 p-2 w-full mt-8 outline-none" 
                                type="password" 
                                placeholder="Mật Khẩu" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="mt-3 text-[#DB4444] text-sm text-end hover:underline ms-1">Quên Mật Khẩu?</div>
                            <div className="mt-5">
                                <button className="w-full py-3 bg-[#DB4444] hover:bg-red-700 focus:bg-red-700 text-white rounded" type="submit">Đăng Nhập</button>
                            </div>
                            {/* <div className="mt-5 text-center">
                                <span className="text-sm">Bạn chưa có tài khoản? </span>
                                <Link to={path.register} className="text-[#DB4444] hover:underline ms-1">Đăng ký</Link>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginAdmin;