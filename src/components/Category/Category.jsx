import phone from '../../assets/Category/Phone.svg'
function Category() {
    return ( 
        <div className="border px-14 py-6 mx-auto mr-7">
            <div className='flex justify-center'>
                <img src={phone} alt="" />
            </div>
            <div className="text-base font-normal flex justify-center">
                Phones
            </div>
        </div>
     );
}

export default Category;