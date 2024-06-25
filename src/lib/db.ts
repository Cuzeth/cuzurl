import { Pool } from 'pg';

const pool = new Pool({
  connectionString: "postgresql://postgres:mysecretpassword@localhost:5432/mydatabase",
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Database connection error', err);
});

export default pool;