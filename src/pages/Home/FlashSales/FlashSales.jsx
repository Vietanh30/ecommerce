import ProductSlider from "../../../components/ProductSlider/ProductSlider";
function FashSales() {
    return ( 
        <div className="container mx-auto mt-20">
            <div className="flex gap-5 items-center">
                <div className="w-4 h-8 bg-[#da4445] rounded-sm"></div>
                <div className="text-[#da4445] font-semibold">Today’s</div>
            </div>
            <div className="mt-6">
                <div className="font-inter text-3xl font-semibold">Flash Sales</div>
                <div className="mt-8">
                    <ProductSlider/>
                    <div className="flex justify-center mt-16">
                        <button className="text-[#FAFAFA] bg-[#DB4444] hover:bg-red-600 py-4 px-12 rounded">View All Products</button>
                    </div>
                    <div className="mt-14 border-b"></div>
                </div>
            </div>
        </div>
     );
}

export default FashSales;