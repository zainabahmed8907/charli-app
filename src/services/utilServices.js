import moment from "moment";
import get from "lodash.get";
import { generatePath } from "react-router";
import * as lodashIsEmpty from "lodash.isempty";

const utilService = {
  apiUrl: process.env.REACT_APP_API_URL,
  getValue,
  redirectToLogin,
  redirectToReturnUrl,
  isEmpty,
  createDynamicUrl,
  createUrl,
};

function createUrl(link, obj) {
  let parameter = {};
  for (const key in obj) {
    if (typeof obj[key] == "string") {
      obj[key] = obj[key].toLowerCase();
      obj[key] = obj[key].split(" ").join("-");
      parameter = obj;
    } else {
      parameter[key] = obj[key];
    }
  }
  const url = generatePath(link, parameter);
  return url;
}

function getValue(...param) {
  return get(...param);
}

function redirectToLogin(loginUrl) {
  let returnUrl = encodeURIComponent(
    window.location.pathname.replace(/[//]+/, "") + window.location.search
  );
  utilService.redirectTo(loginUrl + "?returnUrl=" + returnUrl);
}

function redirectToReturnUrl(defaultUrl) {
  utilService.redirectTo(
    utilService.getUrlParameterByName("returnUrl")
      ? "/" + utilService.getUrlParameterByName("returnUrl")
      : defaultUrl
  );
}

function isEmpty(value) {
  return lodashIsEmpty(value);
}

function createDynamicUrl(dynamicUrl, object) {
  for (const key in object) {
    dynamicUrl = dynamicUrl.replace(`{${key}}`, object[key]);
  }
  return dynamicUrl;
}

export const getTimeDuration = (date) => {
  return moment(date).calendar();
};

export default utilService;
