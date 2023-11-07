import { COOKIE_JWT } from "../utils/constant";
import { getAcessToken, getRefreshToken, setCookie } from "../utils/cookie.helper";
import axios from "axios";
import queryString from 'query-string';
const API_URL_ROOT = process.env.REACT_PUBLIC_API || process.env.API;
const API_AUTH_REFRESH_TOKEN = "auth/refresh-token";

interface apiRes {
    data?: object,
    message?: string,
    status?: number,
    errors?: string
}

export default function (ctx: any = null) {
    const instance = axios.create({
        baseURL: API_URL_ROOT,
        headers: {
            "Content-Type": "application/json",
        },
        paramsSerializer: params => queryString.stringify(params),
    });

    instance.interceptors.request.use(
        (config: any) => {
            const token = getAcessToken(ctx);
            const { is_refresh = null, Authorization } = config.headers || {};
            if (is_refresh == '1' && Authorization) {
                config.headers["Authorization"] = Authorization;
                config.headers["is_refresh"] = null;
            }
            else {
                if (token) {
                    config.headers["Authorization"] = 'Bearer ' + token;
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response: any) => {
            const { config } = response;
            if (config.responseType && config.responseType === "blob") {
                return response;
            }
            const _data: apiRes = response.data

            return _data.data;
        },
        async (err) => {

            const originalConfig = err.config;
            let { data: apiData = {} } = err.response || {};
            const { status } = err.response
            apiData = Object.assign(apiData, { status });
            if (!apiData.status) {
                return Promise.reject('Vui lòng kiểm tra lại kết nối.')
            }
            if (status == 501 || status == 400 || status == 404) {
                return Promise.reject(apiData);
            }
            const { message = null } = apiData || {}
            if (originalConfig.url !== "/auth/token" && status === 401 && !originalConfig._retry && message == 'jwt expired') {
                originalConfig._retry = true;
                try {
                    const authData = getRefreshToken(ctx) || {};
                    const { refreshToken, remember = false } = authData;
                    const dataToken = await instance.post(API_AUTH_REFRESH_TOKEN, { refreshToken, remember });
                    const { accessToken = '' }: any = dataToken || {}
                    if (ctx) {
                        const date: any = new Date();
                        date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
                        const expires: string = "; expires=" + date.toGMTString();
                        ctx.res.setHeader('set-cookie', [`${COOKIE_JWT}=${JSON.stringify(dataToken)}${expires}`])
                    }
                    else {
                        setCookie(COOKIE_JWT, JSON.stringify(dataToken));
                    }
                    originalConfig.headers.Authorization = `Bearer ${accessToken}`;
                    originalConfig.headers.is_refresh = `1`;
                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
            return Promise.reject(apiData);
        }
    );
    return instance;
}