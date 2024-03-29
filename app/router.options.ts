import type { RouterOptions } from '@nuxt/schema'

export default <RouterOptions>{
  routes: (_routes) => [
    ..._routes,
    {
      name: 'root',
      path: '/',
      redirect: '/dashboard',
    },
  ],
}
