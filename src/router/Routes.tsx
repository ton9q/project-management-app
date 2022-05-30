import { Route, Routes as ReactRoutes } from 'react-router-dom';

import { Welcome } from '../pages/Welcome';
import { Main } from '../pages/Main';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { NotFound } from '../pages/NotFound';
import { EditProfile } from '../pages/EditProfile';

import { Layout } from '../components/Layout';

import { config } from '../config';
import { LocalStorage } from '../utils/localStorage';
import { accessTokenStorageVariable } from '../store/authSlice';
import { ProtectedRoute } from './ProtectedRoute';

export const Routes = () => {
  const token = LocalStorage.getItem(accessTokenStorageVariable);

  return (
    <ReactRoutes>
      <Route path={config.urls.public.root} element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route
          path={config.urls.public.main}
          element={
            <ProtectedRoute allowed={!!token} redirectPath={config.urls.public.welcome}>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route
          path={config.urls.public.signIn}
          element={
            <ProtectedRoute allowed={!token} redirectPath={config.urls.public.main}>
              <SignIn />
            </ProtectedRoute>
          }
        />
        <Route
          path={config.urls.public.signUp}
          element={
            <ProtectedRoute allowed={!token} redirectPath={config.urls.public.main}>
              <SignUp />
            </ProtectedRoute>
          }
        />
        <Route
          path={config.urls.public.editProfile}
          element={
            <ProtectedRoute allowed={token} redirectPath={config.urls.public.main}>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </ReactRoutes>
  );
};
