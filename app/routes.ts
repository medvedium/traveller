import { type RouteConfig, index, route, layout } from '@react-router/dev/routes';

export default [
  route('/', 'routes/home.tsx'),
  route('auth', 'routes/auth.tsx'),
  route('register', 'routes/register.tsx'),

  layout('routes/protected.tsx', [
    route('about', 'routes/about.tsx'),
    layout('routes/profile/profile-layout.tsx', [
      route('profile', 'routes/profile/profile.tsx'),
      route('profile/add-travel', 'routes/profile/add-travel.tsx'),
      route('profile/travels', 'routes/profile/travels.tsx'),
      route('profile/edit', 'routes/profile/edit.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
