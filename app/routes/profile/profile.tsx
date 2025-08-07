import { NavLink } from 'react-router';
import { storeUser } from '~/stores/auth';

export default function Profile() {
  const user = storeUser();
  console.log(user);
  return <div>{user.email}</div>;
}
