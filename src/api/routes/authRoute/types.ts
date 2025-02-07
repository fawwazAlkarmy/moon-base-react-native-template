import { GenericResponse } from "@/api";
import { LoginPayload } from "./req";
import { LoginResponse } from "./res";

export type AuthRoute = {
  login: (payload: LoginPayload) => Promise<GenericResponse<LoginResponse>>;
};
