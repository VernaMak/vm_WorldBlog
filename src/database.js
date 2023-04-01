const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


async function getAllPosts() {
  const query = 'SELECT id, title, content FROM posts';
  const result = await pool.query(query);
  return result.rows;
}



async function getPostById(id) {
  const query = `SELECT * FROM posts WHERE id = '${id}'`;
  const result = await pool.query(query);
  return result.rows[0];
}

async function createNewPost(title, content) {
  const query = `INSERT INTO posts(title, content) VALUES ('${title}', '${content}') RETURNING *`;
  const result = await pool.query(query);
  return result.rows[0];
}

async function updatePostById(id, title, content) {
  const query = `UPDATE posts SET title = '${title}', content = '${content}' WHERE id = '${id}'`;
  const result = await pool.query(query);
  return result.rows[0];
}


async function deletePostById(id) {
  const query = `DELETE FROM posts WHERE id = '${id}'`;
  await pool.query(query);
}

async function createNewComment(postId, text) {
  const query = `INSERT INTO comments(postId, text) VALUES ('${postId}', '${text}') RETURNING *`;
  const result = await pool.query(query);
  return result.rows[0];
}

async function getAllCommentsByPostId(postId) { 
  const query = `SELECT * FROM comments WHERE postId = '${postId}'`;
  const result = await pool.query(query);
  return result.rows;
}

async function getAllCommentsByCommentId(commentId) { 
  const query = `SELECT * FROM comments WHERE commentId = '${commentId}'`;
  const result = await pool.query(query);
  return result.rows[0];
}

async function updateCommentById(commentId, text) {
  const query = `UPDATE comments SET text = '${text}' WHERE commentId = '${commentId}'`;
  const result = await pool.query(query);
  return result.rows[0];
}

async function deleteCommentById(commentId) {
  const query = `DELETE FROM comments WHERE commentId = '${commentId}'`;
  await pool.query(query);
}





module.exports = {
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
  createNewPost,
  createNewComment,
  getAllCommentsByPostId,
  deleteCommentById,
  getAllCommentsByCommentId,
  updateCommentById,
  updatePostById,
};
