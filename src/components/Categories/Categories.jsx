import CategorySlider from "../CategorySlider/CategorySlider";

function Categories() {
    return ( 
        <div className="container mx-auto mt-20">
            <div className="flex gap-5 items-center">
                <div className="w-4 h-8 bg-[#da4445] rounded-sm"></div>
                <div className="text-[#da4445] font-semibold">Categories</div>
            </div>
            <div className="mt-6">
                <div className="font-inter text-3xl font-semibold">Browse By Category</div>
                <div className="mt-8">
                    <CategorySlider/>
                    <div className="mt-14 border-b"></div>
                </div>
            </div>
        </div>
     );
}

export default Categories;