export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();

  if (to.path === '/login' && loggedIn.value) return navigateTo('/admin');
  if (to.path.startsWith('/admin') && !loggedIn.value)
    return navigateTo('/login');
});
