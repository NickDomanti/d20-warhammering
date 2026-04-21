export default defineEventHandler(async (event) => {
  const path = event.path;

  if (!path.startsWith('/api/admin')) return;
  if (path.startsWith('/api/admin/login')) return;

  const message =
    event.method === 'GET'
      ? 'Non hai accesso a questi dati'
      : 'Non hai i permessi per questa operazione';

  await requireUserSession(event, { message });
});
