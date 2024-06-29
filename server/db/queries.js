import pool from "./db.js";

export const fetchPosts = async () => {
  const client = await pool.connect();
  try {
    const posts = await client.query(`select * from "Posts" order by id desc;`);
    return posts.rows;
  } finally {
    client.release();
  }
};

export const updatePost = async (id, formData) => {
  const client = await pool.connect();
  try {
    // Initialize parts of the query
    let updateClauses = []; //string
    let values = []; //stirng, number, boolean
    // allows to handle case where may want to update only title or content or accientally send empty objects
    let clausePosition = 1;

    // Dynamically add title and content to the query if they are provided
    updateClauses.push(`title = $${clausePosition++}`);
    values.push(formData.title);
    updateClauses.push(`content = $${clausePosition++}`);
    values.push(formData.content);

    // Add the ID as the last value for the WHERE clause
    values.push(id);

    // UPDATE "Posts"
    // SET title = 'nope', content = 'maybe'
    // WHERE id = 1;
    const updateQuery = `update "Posts" set ${updateClauses.join(
      ", "
    )} where id = $${clausePosition};`;

    // Execute the query if there are fields to update
    if (updateClauses.length > 0) {
      await client.query(updateQuery, values);
    }
  } finally {
    client.release();
  }
};

export const fetchOnePost = async (id) => {
  const client = await pool.connect();
  try {
    const post = await client.query(`select * from "Posts" where id = $1;`, [
      id,
    ]);
    return post.rows;
  } finally {
    client.release();
  }
};

export const createPost = async ({ title, content }) => {
  const client = await pool.connect();
  try {
    const newPost = await client.query(
      `insert into "Posts" (title, content) values ($1, $2) returning *;`,
      [title, content]
    );
    return newPost.rows[0];
  } finally {
    client.release();
  }
};

export const deletePost = async (id) => {
  const client = await pool.connect();
  try {
    await client.query(`delete from "Posts" where id = $1;`, [id]);
  } finally {
    client.release();
  }
};
