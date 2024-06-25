import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_AUTH,
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Database connection error', err);
});

export default pool;