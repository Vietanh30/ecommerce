import React from 'react';

function Category({ category }) {
    return (
        <div className="border px-14 py-6 mx-auto mr-7 h-40">
            <div className='flex justify-center'>
                <img src={category.img || phone} alt={category.name} className="w-16 h-16 object-contain" />
            </div>
            <div className="text-sm font-normal flex text-center justify-center mt-4">
                {category.name}
            </div>
        </div>
    );
}

export default Category;
