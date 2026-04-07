import { drizzle } from "drizzle-orm/node-postgres";
import connection from "./connection";
import * as schema from "./schema";

export default drizzle({ schema, connection, casing: "snake_case" });
