import { createApiClient } from "./client-config";
import { ApiRoute, createAuthRoute } from "../routes";

export const client = createApiClient({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? "",
  apiName: "",
});

export const apiRoutes: ApiRoute = {
  authRoute: createAuthRoute(client),
};
