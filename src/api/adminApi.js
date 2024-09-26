import { http } from "../constants/config";

export const URL_LOGIN = "admin/login";
export const URL_REGISTER = "admin";
export const URL_GET_PROFILE = "admin/profile";
export const URL_GET_ORDERS = "admin/bills/index";
export const URL_GET_ORDER_DETAIL = "admin/bills/detail";
export const URL_CHANGE_STATUS = "admin/bills/change-status";

const adminApi = {
  registerAccount: function (body) {
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
  getOrders: function (access_token) {
    return http.get(URL_GET_ORDERS, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  },
  getOrderDetail: function (id, access_token) {
    return http.get(`${URL_GET_ORDER_DETAIL}?id=${id}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  },
  changeStatusOrder: function (id, status, access_token) {
    return http.post(
      `${URL_CHANGE_STATUS}?status=${status}&bill_id=${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
  },
};

export default adminApi;
