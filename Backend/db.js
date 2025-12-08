import 'dotenv/config';
import { Pool } from 'pg';

export const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: 'moviepad-db',
});

if (pool) {
  console.log('DB connection success');
}
