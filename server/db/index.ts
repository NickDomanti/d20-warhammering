import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import connection from './connection';
import * as schema from './schema';

const client = neon(connection);
export default drizzle({ schema, client, casing: 'snake_case' });
