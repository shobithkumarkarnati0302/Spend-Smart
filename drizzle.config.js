require('dotenv/config');

import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.jsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_yHKxYB7kM3WP@ep-dark-lake-a8deur3a-pooler.eastus2.azure.neon.tech/Spend%20Smart?sslmode=require',
    // url: process.env.NEXT_PUBLIC_DATABASE_URL,
  },
});
