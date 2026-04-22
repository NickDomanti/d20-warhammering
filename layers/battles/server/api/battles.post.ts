import db from '~~/server/db';
import { battlesTable } from '~~/server/db/schema';
import { NewBattle } from '~~/shared/types/battle';

export default eventHandler(async (event) => {
  const body: NewBattle = await readBody(event);

  const [inserted] = await db
    .insert(battlesTable)
    .values(body)
    .returning({ id: battlesTable.id });

  return inserted;
});
