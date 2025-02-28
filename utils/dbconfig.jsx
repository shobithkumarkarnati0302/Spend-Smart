import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
// const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
const sql = neon('postgresql://neondb_owner:npg_yHKxYB7kM3WP@ep-dark-lake-a8deur3a-pooler.eastus2.azure.neon.tech/Spend%20Smart?sslmode=require');
export const db = drizzle(sql,{schema });

