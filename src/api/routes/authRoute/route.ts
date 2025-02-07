import { AxiosInstance } from "axios";
import { AuthRoute } from "./types";

export const createAuthRoute = (apiClient: AxiosInstance): AuthRoute => ({
  login: (payload) =>
    apiClient.post(`Business/Business/Login?Phone=${payload.phone}`),
});
