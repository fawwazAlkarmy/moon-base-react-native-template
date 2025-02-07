import { AxiosResponse } from "axios";
import { AuthRoute } from "./authRoute";

export type IAxiosResponse<T, D = any> = Promise<AxiosResponse<T, D>>;

export type ApiRoute = {
  authRoute: AuthRoute;
};
