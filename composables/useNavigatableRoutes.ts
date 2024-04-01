import { type INavigationRoute } from '~/types'

export const useNavigatableRoutes = () => {
  const router = useRouter()
  const routes = router.getRoutes() ?? []
  const navigatableRoutes = routes.filter((v) => !!v?.meta?.display)
  return { routes: navigatableRoutes as any as INavigationRoute[] }
}
