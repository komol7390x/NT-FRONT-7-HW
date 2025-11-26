import axios from 'axios'
import { configFile } from './configFile'
import Cookies from 'js-cookie';
import { type ILoginResponse } from '@/pages/auth/types';

export const request = axios.create({ baseURL: configFile.Url });
request.interceptors.request.use((config) => {
    const token = Cookies.get('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Response interseptor
request.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const orginalRequest = error.config;
        if (error.response.status == 401 && !orginalRequest._retry) {
            orginalRequest._retry = true;
            try {
                const response = await axios.post<ILoginResponse>(
                    `${configFile.Url}/admin/refresh`
                );
                const newAccessToken = response.data.data.token
                Cookies.set('token', newAccessToken);

                orginalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return request(orginalRequest);
            } catch (error) {
                Cookies.remove('token');
                Cookies.remove('role');
                window.location.href = '/'
                return Promise.reject(error);
            }
        }
        return Promise.reject(error)
    }
)