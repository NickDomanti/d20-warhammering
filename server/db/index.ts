import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import connection from './connection';
import * as schema from './schema';

export default drizzle({
  schema,
  client: neon(connection),
  casing: 'snake_case',
});
