export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useUserStore()
  if (to.meta.private) {
    await user.refresh()
    const activeUser = user.isActive
    if (!activeUser) {
      // redirect to login
      return navigateTo({ name: 'login' })
    }

    if (!!to.meta.roles && !(to.meta.roles as string[]).includes(user.role ?? '')) {
      // abort navigation
      return abortNavigation('you don\'t have required roles')
    }
  }

  if (to.path == from.path) {
    return
  }
})
