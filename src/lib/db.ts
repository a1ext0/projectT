import cr from './cr';
import { Pool } from 'pg';

const pool = new Pool({
  user: cr.db.user,
  host: cr.db.host,
  database: cr.db.database,
  password: cr.db.password,
  port: cr.db.port,
});

export default pool;
