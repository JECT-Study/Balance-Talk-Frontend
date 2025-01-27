import React from 'react';
import { PATH } from '@/constants/path';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  token: string | undefined;
};

const ProtectedRoutes = ({ token }: Props) => {
  return token ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};

export default ProtectedRoutes;
