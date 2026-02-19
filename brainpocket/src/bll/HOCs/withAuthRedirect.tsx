import { Navigate } from "react-router-dom";

interface withAuthRedirectProps {
  component: React.ReactNode;
  isAuth: boolean;
  redirectPath?: string;
}

function WithAuthRedirect({ component, isAuth, redirectPath = "/login" }: withAuthRedirectProps) {
  if (!isAuth) {
    return <Navigate to={redirectPath} />;
  }
  return component;
}

export default WithAuthRedirect