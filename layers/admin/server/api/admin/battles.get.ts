import db from '~~/server/db';

export default eventHandler(async (): Promise<Battle[]> => {
  await delay(2000);

  return await db.query.battlesTable.findMany();
});
