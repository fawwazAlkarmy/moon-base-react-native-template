import { store } from "@/store";
import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ErrorResponse } from "../types";
import { apiErrorHandler } from "./api-error-handler";

interface IClientConfig {
  baseURL: string;
  apiName: string;
  timeout?: number;
  additionalHeaders?: Record<string, string>;
}

const DEFAULT_TIMEOUT = 10000; // 10 seconds

/**
 * Creates and configures an Axios instance with interceptors for authentication and error handling
 * @param config - Configuration options for the Axios client
 * @returns Configured Axios instance
 */
export const createApiClient = ({
  baseURL,
  apiName,
  timeout = DEFAULT_TIMEOUT,
  additionalHeaders = {},
}: IClientConfig): AxiosInstance => {
  // Base configuration
  const axiosConfig: AxiosRequestConfig = {
    baseURL: `${baseURL}${apiName}`,
    timeout,
    headers: {
      "Content-Type": "application/json",
      ...additionalHeaders,
    },
  };

  const instance: AxiosInstance = axios.create(axiosConfig);

  /**
   * Request interceptor to handle authentication
   */
  const requestHandler = (
    request: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    try {
      const userToken = store?.getState()?.user?.token;

      if (userToken) {
        request.headers.set("Authorization", `Bearer ${userToken}`);
      }

      return request;
    } catch (error) {
      console.error("Error in request interceptor:", error);
      return request;
    }
  };

  /**
   * Response error interceptor for centralized error handling
   */
  const responseErrorHandler = async (
    error: AxiosError<ErrorResponse>
  ): Promise<never> => {
    const statusCode = Number(error.response?.status) || 500;

    // Log error details in development
    if (process.env.NODE_ENV === "development") {
      console.error("API Error:", {
        status: statusCode,
        url: error.config?.url,
        method: error.config?.method,
        message: error.message,
      });
    }

    apiErrorHandler(statusCode, error);
    return Promise.reject(error);
  };

  // Add request interceptor
  instance.interceptors.request.use(requestHandler, (error: AxiosError) =>
    Promise.reject(error)
  );

  // Add response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    responseErrorHandler
  );

  return instance;
};
