import { eq } from 'drizzle-orm';
import db from '~~/server/db';
import { playersTable } from '~~/server/db/schema';

export default eventHandler(async (event) => {
  const name = decodeURIComponent(getRouterParam(event, 'name') ?? '');

  if (!name) {
    throw createError({ status: 400, message: 'Nome non valido' });
  }

  const [deleted] = await db
    .delete(playersTable)
    .where(eq(playersTable.name, name))
    .returning({ name: playersTable.name });

  if (!deleted) {
    throw createError({ status: 404, message: 'Giocatore non trovato' });
  }

  return deleted;
});
