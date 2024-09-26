import React from 'react';
import { Link } from 'react-router-dom';
import headphone from '../../assets/Product/headphone.svg';
import StarDisplay from './Star/Star';
import path from '../../constants/path';

function Product({product}) {  
  return (
    <Link to={`${path.products}/${product.id}`} className="group block cursor-pointer z-0">
      <div className='bg-[#F5F5F5] relative py-12 flex justify-center mr-7 transition-transform duration-300 group-hover:scale-105'>
        <img className='transition-transform duration-300 group-hover:scale-110 w-36 h-36' src={product.img} alt="Headphone" />
        {/* <div className='bg-black absolute bottom-0 w-full text-white py-2 text-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          Add to Cart
        </div> */}
        {product.sale_price? 
        <div className='absolute bg-[#DB4444] text-xs py-1 px-3 rounded-[4px] top-2 left-2 text-white'>
            {product.sale_price? "-20" : ""}
        </div>
        : ""}
      </div>
      <div>
        <div className='text-[#000] font-semibold mt-4'>
          {product.name}
        </div>
        <div className='flex gap-3'>
          <span className='font-medium text-[#DB4444] mt-2'>${product.selling_price}</span>
          <span className='font-medium text-black opacity-50 mt-2 line-through'>{product.sale_price? `$${product.sale_price}` : ""}</span>
        </div>
        <div className='mt-2'>
          <StarDisplay rating={4} totalStars={5} />
        </div>
      </div>
    </Link>
  );
}

export default Product;