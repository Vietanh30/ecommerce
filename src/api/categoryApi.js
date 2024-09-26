import { http } from "../constants/config";

export const URL_GET_ALL = "admin/categories/index";
export const URL_GET_DETAIL = "admin/categories/detail";
export const URL_CREATE = "admin/categories/create";
export const URL_EDIT = "admin/categories/edit";
export const URL_DELETE = "admin/categories/delete";

const categoryApi = {
  getAllCategories: function (accessToken) {
    return http.get(URL_GET_ALL, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  getCategoryDetails: function (id, accessToken) {
    return http.get(`${URL_GET_DETAIL}?id=${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  addCategory: function (formData, accessToken) {
    return http.post(URL_CREATE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  editCategory: function (formData, accessToken) {
    return http.post(URL_EDIT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  deleteCategory: function (id, accessToken) {
    return http.delete(`${URL_DELETE}?id=${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default categoryApi;
