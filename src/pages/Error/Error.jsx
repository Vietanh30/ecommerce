import { Link } from "react-router-dom";
import path from "../../constants/path";

function Error() {
    return ( 
        <> 
        <div className="container mx-auto h-screen text-center my-auto">
            <div className="h-full flex items-center flex-col justify-center">
                <div className="font-inter text-[110px] font-semibold text-center">404 Không Tìm Thấy</div>
                <div className="mt-10">Trang bạn truy cập không tìm thấy. Bạn có thể quay về trang chính.</div>
                <Link to={path.home}>
                    <div className="px-10 py-3 bg-[#DB4444] hover:bg-red-700 focus:bg-red-700 text-white rounded mt-20">Quay về trang chính</div>
                </Link>
            </div>
        </div>
        </>
     );
}

export default Error;