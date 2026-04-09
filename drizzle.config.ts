import { defineConfig } from 'drizzle-kit';
import connection from './server/db/connection';

export default defineConfig({
  out: './server/db/migrations',
  schema: './server/db/schema.ts',
  dialect: 'postgresql',
  casing: 'snake_case',
  dbCredentials: {
    url: connection,
  },
  migrations: {
    schema: 'd20_warhammering',
  },
  verbose: true,
});
