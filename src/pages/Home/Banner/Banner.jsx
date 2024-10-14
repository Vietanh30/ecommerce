import AOS from 'aos';
import 'aos/dist/aos.css'; // Đảm bảo bạn đã nhập CSS cho AOS
import { useEffect } from 'react';
import SliderBanner from './SliderBanner';
function Banner({cateories}) {
  // Khởi tạo AOS
  useEffect(() => {
    AOS.init();
  }, []);

  console.log(cateories);
  
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-10 min-h-80">
        {/* Sidebar Category List */}
        <ul className="list-none border-r pr-6 lg:pr-24 space-y-4 col-span-1 justify-center" data-aos="fade-right">
          {cateories.map(item =>{
            return (
              <li className='cursor-pointer' key={item.id}>{item.name}</li>
            )
          })}
        </ul>

        {/* Banner Section */}
        <SliderBanner/>
        
      </div>
    </div>
  );
}

export default Banner;
