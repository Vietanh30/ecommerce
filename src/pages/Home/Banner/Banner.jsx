
import SliderBanner from './SliderBanner';
function Banner() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-10">
        {/* Sidebar Category List */}
        <ul className="list-none border-r pr-6 lg:pr-24 space-y-4 col-span-1 justify-center">
          <li>Woman’s Fashion</li>
          <li>Men’s Fashion</li>
          <li>Electronics</li>
          <li>Home & Lifestyle</li>
          <li>Medicine</li>
          <li>Sports & Outdoor</li>
          <li>Baby’s & Toys</li>
          <li>Health & Beauty</li>
        </ul>

        {/* Banner Section */}
        <SliderBanner/>
        
      </div>
    </div>
  );
}

export default Banner;
