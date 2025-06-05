import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '~/stores/auth';

const ProtectedLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return <div className='container'>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to='/auth' />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
