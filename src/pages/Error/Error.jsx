import { Link } from "react-router-dom";
import path from "../../constants/path";

function Error() {
    return ( 
        <> 
        <div className="container mx-auto h-screen text-center my-auto">
            <div className="h-full flex items-center flex-col justify-center">
                <div className="font-inter text-[110px] font-semibold text-center">404 Not Found</div>
                <div className="mt-10">Your visited page not found. You may go home page.</div>
                <Link to={path.home}>
                    <div className="px-10 py-3 bg-[#DB4444] hover:bg-red-700 focus:bg-red-700 text-white rounded mt-20">Back to home page</div>
                </Link>
            </div>
        </div>
        </>
     );
}

export default Error;