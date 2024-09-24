import { http } from "../constants/config";

export const URL_LOGIN = "login";
export const URL_REGISTER = "register";
export const URL_GET_PROFILE = "profile";

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
    return http.get(
      URL_GET_PROFILE
      // headers:
    );
  },
};

export default userApi;
