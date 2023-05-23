import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export type { AxiosInstance } from 'axios';


const BASE_URL = 'http://localhost:3006';

const defaultHeaders = {
 'Content-Type': 'application/json'

};




const axiosInstance = axios.create({
 baseURL: BASE_URL,
 headers: defaultHeaders,

});




const requestInterceptor = async <T>(config: InternalAxiosRequestConfig<T>) => {
 return config;

};

const responseInterceptor = <T>(response: AxiosResponse<T, any>) => response//response.data;




const responseErrorHandler = (error: any) => {
 if (!error.response) {
 console.log('unable to connect '); // show notification
 throw error;
 }



 if (error.response.status == 0) {
 console.log(' server not reachable');
 throw error;
 }



 if (error.response.status == 400) {
 console.log('bad request');
 throw error;
 }



 if (error.response.status == 401) {
 console.log('unauthorized request');
 throw error;
 }



 if (error.response.status >= 500) {
 console.log('server issue');
 throw error;
 }



 return Promise.reject(error);

};
// axiosInstance.interceptors.response.use(responseInterceptor, responseErrorHandler);

// axiosInstance.interceptors.request.use(requestInterceptor, responseErrorHandler);

export const toFormData = (
 obj: Record<string, any>,
 headers?: Record<string, string>,

) => {
 const options = {
 headers: {
  ...defaultHeaders,
  'Content-Type': 'multipart/form-data',
  ...headers,
 },
 };
 const formData = new FormData();
 for (const key in obj) formData.append(key, obj[key]);



 return { formData, options };

};

const api = {
 get: axiosInstance.get,
 post: axiosInstance.post,
 put: axiosInstance.put,
 delete: axiosInstance.delete,
 toFormData,

};




export type Api = typeof api;




export default api;