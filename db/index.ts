import { Pool, QueryResult, QueryResultRow } from 'pg';

const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "book_store",
  password: "15071994",
  port: 5432 // or your database port
});

const query = async <T extends QueryResultRow>(text: string, params: any[] = []): Promise<T[]> => {
  const start = Date.now();
  const { rows }: QueryResult<T> = await pool.query(text, params);
  const duration = Date.now() - start;
  
  return rows;
};

const connect = async () => {
  const client = await pool.connect();
  return client;
};

const end = async () => {
  await pool.end();
};

export default {
  query,
  connect,
  end
};

