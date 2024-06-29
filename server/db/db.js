import { Pool } from "pg";

const pool = new Pool({
  user: "siobhan",
  host: "localhost",
  database: "blog_example",
  port: 5432,
});

export default pool;
