import axios from 'axios'
import { configFile } from './configFile'

export const request = axios.create({ baseURL: configFile.Url });
request.interceptors.request.use((config) => {
    config.headers.Authorization = 'Bearer token'
    return config
})