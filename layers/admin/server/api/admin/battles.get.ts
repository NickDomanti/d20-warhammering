import db from '~~/server/db';

export default eventHandler(async (): Promise<Battle[]> => {
  return await db.query.battlesTable.findMany();
});
