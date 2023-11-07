export const COOKIE_JWT = "auth";
export const COOKIE_REFCODE = "refcode";
export const redirectKey = "login_redirect";
export const COOKIE_REMEMBER = "cookie-remember";
export const API_URL_ROOT = process.browser
    ? process.env.NEXT_PUBLIC_API
    : process.env.API;


export const COOKIE_LIKE_PRODUCT = "like_product";
export const fileTypes = ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf"]
export const urlAPI = `${process.browser ? process.env.NEXT_PUBLIC_API : process.env.API}`;