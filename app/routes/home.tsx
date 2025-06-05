import { NavLink } from 'react-router';
import type { Route } from './+types/home';
import { useAuthStore } from '~/stores/auth';
import MapComponent from '~/components/MapComponent';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  const { isAuthenticated } = useAuthStore();

  return <div className='container'>
    <div className='rounded-2xl overflow-hidden max-w-[800px] mx-auto mb-8'>
      <MapComponent />
    </div>

    {
      isAuthenticated ? (
        <h1>Добро пожаловать! Вы авторизованы.</h1>
      ) : (
        <h1>Пожалуйста, <NavLink to='/auth'>войдите</NavLink> в систему.</h1>
      )
    }
  </div >;
}
