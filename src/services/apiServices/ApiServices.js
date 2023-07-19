import { create } from "apisauce";

import authService from "../AuthServices";
import { STORAGE_CONST } from "../../constant/apiConstant";
import LocalStorageService from "../LocalStorageServices";
import notificationService from "../NotificationService";
import utilService from "../utilServices";

const apiService = {
  apiSauceInstance: create({
    baseURL: utilService.apiUrl,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer 846|Sl1EUDFxAspvFXK2JLSPmHD7zTtsyN0PyPkXj8aJ`,
      "Access-Control-Allow-Origin": "false",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  }),
  post,
  get,
  put,
  patch,
  remove,
  handleResponse: responseHandler,
};

const SIGNIN_URL = "/sign-in";

async function get(url, queryParams, axiosConfig) {
  const response = await apiService.apiSauceInstance.get(
    url,
    queryParams,
    axiosConfig
  );
  return apiService.responseHandler(response);
}

async function post(url, data) {
  const response = await apiService.apiSauceInstance.post(url, data);
  return apiService.responseHandler(response);
}

async function put(url, data) {
  const response = await apiService.apiSauceInstance.put(url, data);
  return apiService.responseHandler(response);
}

async function patch(url, data) {
  const response = await apiService.apiSauceInstance.patch(url, data);
  return apiService.responseHandler(response);
}

async function remove(url, data) {
  const response = await apiService.apiSauceInstance.delete(url, data);
  return apiService.responseHandler(response);
}

function responseHandler(response) {
  const generatedResponse = {
    ok: response.ok,
    status: response.status,
    response: {
      code: utilService.getValue(response.data, "response.code", 500),
      message: utilService.getValue(
        response.data,
        "response.message",
        "Something went wrong"
      ),
      errorCode: utilService.getValue(response.data, "response.errorCode", 400),
    },
  };
  const data = utilService.getValue(response.data, "data", response.data);
  if (response.status === 401) {
    notificationService.error("You are not authorized to perform this action");
    LocalStorageService.remove(STORAGE_CONST.USER_INFO);
    utilService.redirectToLogin(SIGNIN_URL);
    return {
      ...generatedResponse,
      data: !utilService.isEmpty(data) ? data : null,
    };
  }
  if (response.status === 500) {
    return {
      ...generatedResponse,
      data: !utilService.isEmpty(data) ? data : null,
    };
  }
  if (response.ok) {
    return { ...generatedResponse, data };
  } else {
    return {
      ...generatedResponse,
      data: !utilService.isEmpty(data) ? data : null,
    };
  }
}

export default {
  post: apiService.post,
  get: apiService.get,
  patch: apiService.patch,
  put: apiService.put,
  remove: apiService.remove,
};
