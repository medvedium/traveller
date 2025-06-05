import { NavLink, useNavigate } from 'react-router';
import { useAuthStore } from '~/stores/auth';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Выполняем выход
      navigate('/auth'); // Перенаправляем на страницу входа
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };


  return (
    <div className='container flex justify-between py-4'>
      <nav className='flex gap-4 text-blue-300'>
        <NavLink to={'/'}>Home page</NavLink>
        {isAuthenticated && (
          <>
            <NavLink to={'/about'}>About</NavLink>
            <NavLink to={'/profile'}>Profile</NavLink>
          </>
        )}
      </nav>
      {isAuthenticated ? (
        <button className='border-1 cursor-pointer bg-slate' onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <div className='flex gap-4'>
          <NavLink to={'/auth'}>Auth</NavLink>
          |
          <NavLink to={'/register'}>Register</NavLink>
        </div>

      )}
    </div>
  );
};

export default Navbar;
