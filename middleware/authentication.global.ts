export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useUserStore()
  if (to.meta.private) {
    const activeUser = user.isActive
    if (!activeUser) {
      // redirect to login
      return navigateTo({ name: 'login' })
    }
  }

  if (to.path == from.path) {
    return
  }
})
