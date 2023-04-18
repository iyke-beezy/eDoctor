import { Pool } from 'pg';

export default new Pool({
    max: 20,
    connectionString: 'postgres://edoctor:edoctor@localhost:5432/api',
    idleTimeoutMillis: 30000
});