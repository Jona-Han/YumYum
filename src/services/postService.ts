import pool from '../utils/connectDB';

export const getXRandomPosts = async (count: Number) => {
  const result = await pool.query('SELECT * FROM POSTS ORDER BY RANDOM() LIMIT $1', [count]);
  if (result.rows.length === 0) {
    throw new Error('No posts found');
  }
  return result.rows;
};

export const getUserPosts = async (userID: String) => {
  const result = await pool.query('SELECT * FROM POSTS WHERE user_ID = $1', [userID]);
  return result.rows;
};

export const getSpecificPost = async (postID: Number) => {
  const result = await pool.query('SELECT * FROM POSTS WHERE id = $1', [postID]);
  return result.rows[0];
};

interface Post {
  content: String;
  category: Number;
  userID: String;
}

export const createPost = async (userID: String, post: Post) => {
  const result = await pool.query(
    'INSERT INTO POSTS(content, category, user_ID) VALUES($1, $2, $3)',
    [post.content, post.category, post.userID]
  );
};

export const deletePost = async (postID: Number) => {
  await pool.query('DELETE FROM POSTS WHERE id = $1', [postID]);
};

export const updatePost = async (postID: Number, post: Post) => {
  const result = await pool.query(
    'UPDATE POSTS SET content=$1, category=$2 WHERE id=$3 RETURNING *',
    [post.content, post.category, postID]
  );
  if (result.rows.length === 0) {
    throw new Error('Post not found');
  }
  return result.rows[0];
};

export const updateReactionCounter = async (postID: Number, newCount: Number) => {
  const result = await pool.query('UPDATE USERS SET num_of_reactions=$1 WHERE id=$2 RETURNING *', [
    newCount,
    postID,
  ]);
  if (result.rows.length === 0) {
    throw new Error('Post not found');
  }
  return result.rows[0];
};
