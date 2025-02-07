import { AxiosError } from "axios";
import { store, removeUserCredential } from "@/store";
import { showMessage } from "react-native-flash-message";
import { ErrorResponse } from "../types";
import colors from "@/components/ui/colors";

export const extractError = (error: AxiosError<ErrorResponse>): string => {
  let err: string = "";

  for (const key in error.response?.data.errors) {
    err = error.response?.data.errors[key];
    break;
  }

  return Array.isArray(err) ? err[0] : err || error.response?.data;
};

export const apiErrorHandler = (
  statusCode: number,
  error: AxiosError<ErrorResponse>
) => {
  switch (statusCode) {
    case 400: {
      return showMessage({
        message: "Uh-oh! Something Went Wrong :(",
        description: extractError(error),
        color: colors.white,
        backgroundColor: colors.danger[400],
      });
    }

    case 401: {
      showMessage({
        message: "Whoops! Session Ended :(",
        description: "Your Session Has Expired",
        color: colors.white,
        backgroundColor: colors.danger[400],
      });

      return store?.dispatch(removeUserCredential());
    }

    case 500: {
      showMessage({
        message: "Well, That Didn't Go As Planned! :(",
        description: "Something Went Wrong",
        color: colors.white,
        backgroundColor: colors.danger[400],
      });

      return;
    }

    default:
      return showMessage({
        message: "Well, That Didn't Go As Planned! :(",
        description: extractError(error) || "Something Went Wrong",
        color: colors.white,
        backgroundColor: colors.danger[400],
      });
  }
};
