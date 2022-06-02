import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  allowed: boolean;
  redirectPath: string;
  children: ReactElement;
};

export const ProtectedRouteElement = ({ allowed, redirectPath, children }: Props) => {
  if (!allowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
