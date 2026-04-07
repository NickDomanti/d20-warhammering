import { db } from "@nuxthub/db";

export default eventHandler(async () => {
  return await db.query.playersTable.findMany({});
});
