import axios, { AxiosInstance, AxiosError } from "axios";
import { USER_ACCESS_TOKEN } from "./appstrings";

// Base Axios instance configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://voom-engine.onrender.com/api",
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
    "Authorization": `${localStorage.getItem(USER_ACCESS_TOKEN)}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(USER_ACCESS_TOKEN); 
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 400) {
      localStorage.removeItem(USER_ACCESS_TOKEN);
      if(window.location.pathname !== "/auth/login"){
        window.location.href = "/auth/login";
      }
    } else if (error.code === 'ECONNABORTED' || !error.response) {
      // Handle timeout or no connection errors
      console.error('Network connection error:', error.message);
    }
    return Promise.reject(error);
  }
);


export function handleAxiosError(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return 'An unexpected error occurred';
  }

  const axiosError = error as AxiosError;

  // Handle network errors (no response received)
  if (error.code === 'ECONNREFUSED' || error.code === 'ECONNABORTED' || error.message.includes('Network Error')) {
    return 'Unable to connect to the server. Please check your internet connection.';
  }

  // Handle timeout errors
  if (error.code === 'ETIMEDOUT' || error.message.includes('timeout')) {
    return 'The request timed out. Please try again.';
  }

  // Handle HTTP errors with response
  if (axiosError.response) {
    const responseData = axiosError.response.data as { message?: string };
    if(responseData.message){
      return responseData.message;
    }
    const status = axiosError.response.status;

    switch (status) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'Unauthorized. Please log in again.';
      case 403:
        return 'Access forbidden. You don\'t have permission to access this resource.';
      case 404:
        return 'Resource not found.';
      case 408:
        return 'Request timeout. Please try again.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Internal server error. Please try again later.';
      case 502:
        return 'Bad gateway. Please try again later.';
      case 503:
        return 'Service unavailable. Please try again later.';
      case 504:
        return 'Gateway timeout. Please try again later.';
      default:
        if (status >= 500) {
          return 'Server error. Please try again later.';
        }
        if (status >= 400) {
          return 'Request failed. Please try again.';
        }
    }
  }

  if (axiosError.request) {
    return 'The request was made but no response was received.';
  }

  return error.message || 'An error occurred while processing your request.';
}


export default axiosInstance;
