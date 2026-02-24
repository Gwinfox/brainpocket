import { Navigate } from "react-router-dom";
import type { withAuthRedirectProps } from "../types/appTypes";

function WithAuthRedirect({ component, isAuth, redirectPath = "/login" }: withAuthRedirectProps) {
  if (!isAuth) {
    return <Navigate to={redirectPath} />;
  }
  return component;
}

export default WithAuthRedirect;
