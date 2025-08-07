import { NavLink } from 'react-router';
import type { Route } from './+types/home';
import { useAuthStore } from '~/stores/auth';
import MapComponent from '~/components/MapComponent';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return <div className='text-center'>Загрузка...</div>;
  }

  if (!isAuthenticated) {
    return (
      <h1 className='text-center'>
        <NavLink to='/auth'>Войдите</NavLink>, чтобы увидеть свои путешествия
      </h1>
    );
  }

  return (
    <div className='container'>
      <div className='rounded-2xl overflow-hidden max-w-[800px] mx-auto mb-8'>
        <MapComponent />
      </div>

      {!isAuthenticated && (
        <h1 className='text-center'>
          <NavLink to='/auth'>Войдите</NavLink>, чтобы увидеть свои путешествия
        </h1>
      )}
    </div>
  );
}
