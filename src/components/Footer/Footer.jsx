function Footer() {
    return ( 
        <footer className="bg-black text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between">
                    {/* Phần Đặc Biệt */}
                    <div>
                        <div className="text-2xl font-semibold text-[#FAFAFA] font-inter">Exclusive</div>
                        <div className="my-6 text-lg font-medium">Đăng Ký</div>
                        <div className="mb-4 font-normal text-base">Nhận 10% giảm giá cho đơn hàng đầu tiên của bạn</div>
                        {/* <input
                            type="email"
                            placeholder="Nhập email của bạn"
                            className="p-2 rounded-md text-black w-full bg-transparent border text-white"
                        /> */}
                    </div>
                    
                    {/* Phần Hỗ Trợ */}
                    <div>
                        <div className="text-xl font-medium mb-2 text-[#FAFAFA] font-inter">Hỗ Trợ</div>
                        <div className="text-[#FAFAFA] font-normal text-base mt-6">123 Ao Sen, Mộ Lao, Hà Đông, Hà Nội.</div>
                        <div className="text-[#FAFAFA] font-normal text-base my-4">hoanganh@gmail.com</div>
                        <div>0123456789</div>
                    </div>
                    
                    {/* Phần Tài Khoản */}
                    <div>
                        <div className="text-xl font-medium mb-2 text-[#FAFAFA] font-inter">Tài Khoản</div>
                        <div className="text-[#FAFAFA] font-normal text-base mt-6">Tài Khoản Của Tôi</div>
                        <div className="text-[#FAFAFA] font-normal text-base my-4">Đăng Nhập / Đăng Ký</div>
                        <div className="text-[#FAFAFA] font-normal text-base my-4">Giỏ Hàng</div>
                        <div className="text-[#FAFAFA] font-normal text-base my-4">Danh Sách Ưa Thích</div>
                        <div className="text-[#FAFAFA] font-normal text-base my-4">Cửa Hàng</div>
                    </div>
                    
                    {/* Phần Liên Kết Nhanh */}
                    <div>
                        <div className="text-xl font-medium mb-2 text-[#FAFAFA] font-inter">Liên Kết Nhanh</div>
                        <div className="text-[#FAFAFA] font-normal text-base mt-6">Chính Sách Bảo Mật</div>
                        <div className="text-[#FAFAFA] font-normal text-base my-4">Điều Khoản Sử Dụng</div>
                        <div className="text-[#FAFAFA] font-normal text-base my-4">Câu Hỏi Thường Gặp</div>
                        <div className="text-[#FAFAFA] font-normal text-base my-4">Liên Hệ</div>
                    </div>
                </div>
            </div>
            
            {/* Phần Bản Quyền */}
            <div className="text-center mt-8">
                <p>© Copyright 2024. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;