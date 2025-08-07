import { NavLink, Outlet, useLocation } from 'react-router';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { EditOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';

export default function ProfileLayout() {
  const location = useLocation();

  const items = [
    {
      key: '/profile',
      label: (
        <>
          <UserOutlined className='mr-2' />
          <NavLink to='/profile'>Профиль</NavLink>
        </>
      ),
    },
    {
      key: '/profile/travels',
      label: (
        <>
          <UnorderedListOutlined className='mr-2' />
          <NavLink to='/profile/travels'>Мои путешествия</NavLink>
        </>
      ),
    },
    {
      key: '/profile/edit',
      label: (
        <>
          <EditOutlined className='mr-2' />
          <NavLink to='/profile/edit'>Редактировать профиль</NavLink>
        </>
      ),
    },
  ];

  const [selectedKey, setSelectedKey] = useState<string>('/profile');

  useEffect(() => {
    const matchedKey = items
      .map((item) => item.key)
      .filter((key) => location.pathname.startsWith(key))
      .sort((a, b) => b.length - a.length)[0];

    setSelectedKey(matchedKey || '/profile');
  }, [location.pathname]);

  return (
    <div className='container flex gap-4'>
      <aside>
        <Menu selectedKeys={[selectedKey]} style={{ width: 256 }} mode='inline' items={items} />
      </aside>
      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  );
}
