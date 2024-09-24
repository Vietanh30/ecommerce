function Footer() {
    return ( 
        <footer className="bg-black text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between">
                    {/* Exclusive Section */}
                    <div>
                        <div className="text-2xl font-semibold text-[#FAFAFA] font-inter">Exclusive</div>
                        <div className="my-6 text-lg font-medium">Subscribe</div>
                        <div className="mb-4 font-normal text-base">Get 10% off your first order</div>
                        {/* <input
                            type="email"
                            placeholder="Enter your email"
                            className="p-2 rounded-md text-black w-full bg-transparent border text-white"
                        /> */}
                    </div>
                    
                    {/* Support Section */}
                    <div>
                        <div className="text-xl font-medium mb-2 text-[#FAFAFA] font-inter">Support</div>
                        <div className="text-[#FAFAFA] font-normal text-base mt-6">123 Ao Sen, Mộ Lao, Hà Đông, Hà Nội.</div>
                        <div className="text-[#FAFAFA] font-normal text-base my-4">hoanganh@gmail.com</div>
                        <div>0123456789</div>
                    </div>
                    
                    {/* Account Section */}
                    <div>
                        <div className="text-xl font-medium mb-2 text-[#FAFAFA] font-inter">Account</div>
                        <div className="text-[#FAFAFA] font-normal text-base mt-6">My Account</div>
                        <div className="text-[#FAFAFA] font-normal text-base my-4">Login / Register</div>
                        <div className="text-[#FAFAFA] font-normal text-base my-4">Cart</div>
                        <div className="text-[#FAFAFA] font-normal text-base my-4">Wishlist</div>
                        <div className="text-[#FAFAFA] font-normal text-base my-4">Shop</div>
                    </div>
                    
                    {/* Quick Link Section */}
                    <div>
                        <div className="ext-xl font-medium mb-2 text-[#FAFAFA] font-inter">Quick Link</div>
                        <div className="text-[#FAFAFA] font-normal text-base mt-6">Privacy Policy</div>
                        <div className="text-[#FAFAFA] font-normal text-base my-4">Terms Of Use</div>
                        <div className="text-[#FAFAFA] font-normal text-base my-4">FAQ</div>
                        <div className="text-[#FAFAFA] font-normal text-base my-4">Contact</div>
                    </div>
                </div>
            </div>
            
            {/* Copyright Section */}
            <div className="text-center mt-8">
                <p>© Copyright 2024. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;