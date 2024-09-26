import { http } from "../constants/config";

export const URL_GET_ALL = "admin/products/index";
export const URL_GET_DETAIL = "admin/products/detail";
export const URL_CREATE = "admin/products/create";
export const URL_EDIT = "admin/products/edit";
export const URL_DELETE = "admin/products/delete";
export const URL_CREATE_CHILD = "admin/products/create-child";
export const URL_DETAIL_CHILD = "admin/products/detail-child";
export const URL_EDIT_CHILD = "admin/products/edit-child";
export const URL_DELETE_CHILD = "admin/products/delete-child";

const productApi = {
  getAllProduct: function (accessToken) {
    return http.get(URL_GET_ALL, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  getProductDetail: function (id, accessToken) {
    return http.get(`${URL_GET_DETAIL}?id=${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  editProduct: function (formData, accessToken) {
    return http.post(URL_EDIT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  deleteProduct: function (id, accessToken) {
    return http.delete(`${URL_DELETE}?id=${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  addProduct: function (formData, accessToken) {
    return http.post(URL_CREATE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  addProductChild: function (formData, accessToken) {
    return http.post(URL_CREATE_CHILD, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  getProductChildDetail: function (id, accessToken) {
    return http.get(`${URL_DETAIL_CHILD}?id=${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  editProductChild: function (formData, accessToken) {
    return http.post(URL_EDIT_CHILD, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  deleteProductChild: function (id, accessToken) {
    return http.delete(`${URL_DELETE_CHILD}?id=${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default productApi;
