import { STORAGE_CONST } from "../constant/apiConstant";
import LocalStorageService from "./LocalStorageServices";

const authService = {
    isTokenExist,
    getToken,
    getUserInfo,
    getRole
};

function getRole() {
    let userInfo = LocalStorageService.get(STORAGE_CONST.USER_INFO);
    if (userInfo) {
        userInfo = JSON.parse(userInfo);
        return "Admin";
    }
    return null;
}

function isTokenExist() {
    let userInfo = LocalStorageService.get(STORAGE_CONST.USER_INFO);
    if (userInfo) {
        return true;
    }
    return false;
}

function getToken() {
    let userInfo = LocalStorageService.get(STORAGE_CONST.USER_INFO);
    if (userInfo) {
        userInfo = JSON.parse(userInfo);
        return userInfo.token;
    }
    return null;
}

function getUserInfo() {
    let userInfo = LocalStorageService.get(STORAGE_CONST.USER_INFO);
    if (userInfo) {
        return JSON.parse(userInfo);
    }
    return null;
}

export default authService;