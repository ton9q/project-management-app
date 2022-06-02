import { useEffect, useState, lazy, Suspense } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';

const Welcome = lazy(() => import('../pages/Welcome'));
const Main = lazy(() => import('../pages/Main'));
const SignIn = lazy(() => import('../pages/SignIn'));
const SignUp = lazy(() => import('../pages/SignUp'));
const NotFound = lazy(() => import('../pages/NotFound'));
// const Board = lazy(() => import('../pages/Board'));
const EditProfile = lazy(() => import('../pages/EditProfile'));

import { Layout } from '../components/Layout';
import { Loading } from '../components/Loading';

import { config } from '../config';
import { LocalStorage } from '../utils/localStorage';
import { accessTokenStorageVariable, authSelector } from '../store/authSlice';
import { ProtectedRouteElement } from './ProtectedRoute';
import { useAppSelector } from '../store';

const getToken = () => LocalStorage.getItem(accessTokenStorageVariable);

export const Routes = () => {
  const { token } = useAppSelector(authSelector);
  const [authenticated, setAuthenticated] = useState(!!getToken());

  useEffect(() => {
    setAuthenticated(!!getToken());
  }, [token]);

  const authorizedRouteElementProps = {
    allowed: !authenticated,
    redirectPath: config.urls.public.main,
  };
  const unauthorizedRedirectUrl = {
    allowed: authenticated,
    redirectPath: config.urls.public.welcome,
  };

  return (
    <ReactRoutes>
      <Route path={config.urls.public.root} element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<Loading />}>
              <Welcome />
            </Suspense>
          }
        />
        <Route
          path={config.urls.public.signIn}
          element={
            <ProtectedRouteElement {...authorizedRouteElementProps}>
              <Suspense fallback={<Loading />}>
                <SignIn />
              </Suspense>
            </ProtectedRouteElement>
          }
        />
        <Route
          path={config.urls.public.signUp}
          element={
            <ProtectedRouteElement {...authorizedRouteElementProps}>
              <Suspense fallback={<Loading />}>
                <SignUp />
              </Suspense>
            </ProtectedRouteElement>
          }
        />
        <Route
          path={config.urls.public.main}
          element={
            <ProtectedRouteElement {...unauthorizedRedirectUrl}>
              <Suspense fallback={<Loading />}>
                <Main />
              </Suspense>
            </ProtectedRouteElement>
          }
        />
        <Route
          path={config.urls.router.board}
          element={
            <ProtectedRouteElement {...unauthorizedRedirectUrl}>
              <Suspense fallback={<Loading />}>
                {/* <Board /> */}
                <div>Board</div>
              </Suspense>
            </ProtectedRouteElement>
          }
        />
        <Route
          path={config.urls.public.profile.edit}
          element={
            <ProtectedRouteElement {...unauthorizedRedirectUrl}>
              <Suspense fallback={<Loading />}>
                <EditProfile />
              </Suspense>
            </ProtectedRouteElement>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </ReactRoutes>
  );
};
