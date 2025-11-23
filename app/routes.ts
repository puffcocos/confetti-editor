import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('preview', 'routes/preview.tsx'),
  route('example', 'routes/example.tsx'),
] satisfies RouteConfig
