const path = {
    // user
    home: '/',
    about: '/about',
    login: '/login',
    checkout: '/checkout',
    products: '/products',
    productDetail: (id)=> `/products/${id}`,
    error: '/error',
    cart: '/cart',
    register: '/register',
    // admin
    loginAdmin: '/login-admin',
    dashboard: '/dashboard',
    allProduct: '/all-product',
    orderList: '/order-list',
    orderDetailAdmin: (id) => `order-list/${id}`,
    addProduct: '/add-product',
    productDetailAdmin: (id)=> `/all-product/${id}`,

};

export default path;
