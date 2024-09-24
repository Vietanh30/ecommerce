import { http } from "../constants/config";

export const URL_LOGIN = "admin/login";
export const URL_REGISTER = "admin";
export const URL_GET_PROFILE = "admin/profile";

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
};

export default adminApi;
