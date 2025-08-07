import { Button, Menu, Switch } from 'antd';
import type { MenuProps } from 'antd';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { isAuthenticated, logout } from '~/stores/auth';
import Logo from '~/components/Logo';
import { useThemeStore } from '~/stores/themeStore';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleTheme } = useThemeStore();

  const currentPath = location.pathname;

  const handleLogout = async () => {
    try {
      await logout().then(() => {
        navigate('/auth');
      })
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  const menuItems: MenuProps['items'] = isAuthenticated()
    ? [
      {
        key: '/',
        label: <NavLink to='/'>Главная</NavLink>,
      },
      {
        key: '/about',
        label: <NavLink to='/about'>О сервисе</NavLink>,
      },
      {
        key: '/profile',
        label: <NavLink to='/profile'>Профиль</NavLink>,
      },
      {
        key: 'logout',
        label: (
          <Button type='link' danger onClick={handleLogout}>
            Выйти
          </Button>
        ),
      },
    ]
    : [];

  const selectedKey = menuItems
    .map((item) => (item ? item.key : undefined))
    .filter((key): key is string => typeof key === 'string' && !!key && currentPath.startsWith(key))
    .sort((a, b) => b.length - a.length)[0];

  return (
    <div className='flex justify-between px-6 py-3 mb-4 container'>
      <NavLink to='/' className='flex items-center gap-2'>
        <Logo />
      </NavLink>

      <div className='flex flex-1 justify-end items-center gap-2'>
        {isAuthenticated() ? (
          <Menu
            mode='horizontal'
            selectedKeys={[selectedKey]}
            items={menuItems}
            style={{ flexGrow: 1, justifyContent: 'flex-end', minWidth: 0, border: 'none' }}
          />
        ) : (
          <>
            <Button type='default' onClick={() => navigate('/auth')}>
              Auth
            </Button>
            <Button type='primary' onClick={() => navigate('/register')}>
              Register
            </Button>
          </>
        )}
        <Switch checked={mode === 'dark'} onChange={toggleTheme} />
      </div>
    </div>
  );
};

export default Navbar;
