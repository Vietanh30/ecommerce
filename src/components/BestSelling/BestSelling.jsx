import ProductSlider from "../ProductSlider/ProductSlider";

function BestSelling() {
    return ( 
        <div className="container mx-auto mt-20">
            <div className="flex gap-5 items-center">
                <div className="w-4 h-8 bg-[#da4445] rounded-sm"></div>
                <div className="text-[#da4445] font-semibold">This Month</div>
            </div>
            <div className="mt-6">
                <div className="font-inter text-3xl font-semibold">Best Selling Products</div>
                <div className="mt-8">
                    < ProductSlider/>
                </div>
            </div>
        </div>
     );
}

export default BestSelling;