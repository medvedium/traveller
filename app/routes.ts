import { type RouteConfig, index, route, layout } from '@react-router/dev/routes';

export default [
  route('/', 'routes/home.tsx'),
  route('auth', 'routes/auth.tsx'),
  route('register', 'routes/register.tsx'),

  layout('routes/protected.tsx', [
    route('about', 'routes/about.tsx'),
    route('profile', 'routes/profile.tsx')
  ]),
] satisfies RouteConfig;
