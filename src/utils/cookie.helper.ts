import cookie from "js-cookie";
import _Cookies from "universal-cookie";

import {
    COOKIE_JWT,
    COOKIE_REMEMBER
} from "./constant";

export const setCookie = (key: string, value: string, expires = 1) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires,
            path: "/",
        });
    }
};

export const removeCookie = (key: string) => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1,
        });
    }
};

export const getCookie = (key: string, req: object) => {
    return process.browser
        ? getCookieFromBrowser(key)
        : getCookieFromServer(key, req);
};

export const getCookieFromBrowser = (key: string) => {
    return cookie.get(key);
};

export const getCookieFromServer = (key: string, req: any) => {
    if (!req.headers.cookie) {
        return undefined;
    }
    const rawCookie = req.headers.cookie
        .split(";")
        .find((c: string) => c.trim().startsWith(`${key}=`));
    if (!rawCookie) {
        return undefined;
    }
    return rawCookie.split("=")[1];
};

export const getAcessToken = (_ctx: any = null) => {
    let accessToken = null;
    if (_ctx) {
        const { req = null } = _ctx || {};
        if (!req) return null;

        const ___cookies = new _Cookies(_ctx.req.headers.cookie);
        const value = ___cookies.get(COOKIE_JWT);

        if (value) accessToken = value["accessToken"] || null;
    } else {
        const _cookieToken = cookie.get(COOKIE_JWT);
        if (_cookieToken != null && _cookieToken != undefined) {
            const token: any = cookie.get(COOKIE_JWT);
            accessToken = token.accessToken;
        }
    }
    return accessToken;
};

export const getRefreshToken = (_ctx: any = null) => {
    let tokenObj = null;
    if (_ctx) {
        const ___cookies = new _Cookies(_ctx.req.headers.cookie);
        const value = ___cookies.get(COOKIE_JWT);
        const remember = ___cookies.get(COOKIE_REMEMBER) || false;
        if (value) {
            const refresh_data = Object.assign(value, { remember })
            tokenObj = refresh_data;
        }
    } else {
        const _cookieToken = cookie.get(COOKIE_JWT);
        const remember = cookie.get(COOKIE_REMEMBER) || false;
        if (_cookieToken != null && _cookieToken != undefined) {
            const resfresh_data = Object.assign(JSON.parse(_cookieToken), { remember });
            tokenObj = resfresh_data;
        }
    }
    return tokenObj;
};
