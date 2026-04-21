export default defineEventHandler(async (event) => {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw createError({
      status: 500,
      message: 'Nessuna password admin è stata impostata',
    });
  }

  const body = await readBody<{ password?: string }>(event);

  if (body.password !== password) {
    throw createError({
      status: 401,
      message: 'Password sbagliata',
    });
  }

  await setUserSession(event, { user: 'admin' }, { maxAge: 60 * 60 * 24 });

  return {
    message: 'Accesso garantito',
  };
});
