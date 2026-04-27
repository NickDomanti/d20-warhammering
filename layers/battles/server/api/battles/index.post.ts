import db from '~~/server/db';
import { battlesTable, playersTable } from '~~/server/db/schema';
import { battleSchema } from '~~/shared/types/battle';

export default eventHandler(async (event) => {
  const body = await validateBody(event, battleSchema);

  await db
    .insert(playersTable)
    .values([{ name: body.player1 }, { name: body.player2 }])
    .onConflictDoNothing();

  const [inserted] = await db
    .insert(battlesTable)
    .values(body)
    .returning({ id: battlesTable.id });

  return inserted;
});
