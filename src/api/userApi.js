import { http } from "../constants/config";

export const URL_LOGIN = "login";
export const URL_HOME = "home";
export const URL_ADD_TO_CART = "add-to-cart";
export const URL_CART = "cart";
export const URL_CHECKOUT = "checkout";
export const URL_ORDER = "order";
export const URL_ORDER_HISTORY = "order-history";
export const URL_ORDER_DETAIL = "order-detail";
export const URL_PRODUCT_DETAIL = "product";
export const URL_REGISTER = "register";
export const URL_GET_PROFILE = "profile";
export const URL_GET_ADDRESS = "address";
export const URL_CREATE_ADDRESS = "create-address";
export const URL_CHANGE_STATUS = "change-status";

const userApi = {
  registerAccount: function (name, email, phone, password) {
    const body = {
      email: email,
      name: name,
      phone: phone,
      password: password,
    };
    return http.post(URL_REGISTER, body); // Thêm body vào đây
  },
  login: function (email, password) {
    // Tạo đối tượng body với email và password
    const body = {
      email: email,
      password: password,
    };
    return http.post(URL_LOGIN, body); // Gửi body vào đây
  },
  getProfile: function (access_token) {
    return http.get(URL_GET_PROFILE, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  },
  getInforHome: function () {
    return http.get(URL_HOME);
  },
  getProductDetail: function (id) {
    return http.get(`${URL_PRODUCT_DETAIL}?product_id=${id}`);
  },
  addToCart: function (feature_product_id, quantity, access_token) {
    const body = {
      feature_product_id: feature_product_id,
      quantity: quantity,
    };
    return http.post(URL_ADD_TO_CART, body, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  },
  getCart: function (access_token) {
    return http.get(URL_CART, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  },
  getCheckout: function (access_token) {
    return http.get(URL_CHECKOUT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  },
  createAddress: function (detail_address, name, ward_id, phone, access_token) {
    const body = {
      detail_address: detail_address,
      name: name,
      ward_id: ward_id,
      phone: phone,
    };
    return http.post(URL_CREATE_ADDRESS, body, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  },
  order: function (address_id, delivery_id, note, total_price, access_token) {
    const body = {
      address_id: address_id,
      delivery_id: delivery_id,
      note: note,
      total_price: total_price,
    };
    return http.post(URL_ORDER, body, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  },
  updateCart: function (cartItem, access_token) {},
  getHistoryOrders: function (access_token) {
    return http.get(URL_ORDER_HISTORY, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  },
  getOrderDetail: function (id, access_token) {
    return http.get(`${URL_ORDER_DETAIL}?id=${id}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  },
  changeStatusOrder: function (id, access_token) {
    return http.post(
      `${URL_CHANGE_STATUS}?id=${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
  },
};

export default userApi;
