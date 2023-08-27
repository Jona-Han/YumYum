import pool from '../utils/connectDB';
import User from '../models/User';

export const getUserById = async (id: String | undefined) => {
  const result = await pool.query('SELECT * FROM USERS WHERE id = $1', [id]);
  if (result.rows.length === 0) {
    throw new Error('User not found');
  }
  return result.rows[0];
};

export const createUser = async (userID: String, user: User) => {
  const result = await pool.query(
    'INSERT INTO USERS (id, given_name, family_name, email) VALUES ($1, $2, $3, $4) RETURNING *',
    [userID, user.givenName, user.familyName, user.email]
  );
  return result.rows[0];
};

export const updateUser = async (id: String | undefined, user: User) => {
  const result = await pool.query(
    'UPDATE USERS SET given_name=$1, family_name=$2, email=$3 WHERE id=$4 RETURNING *',
    [user.givenName, user.familyName, user.email, id]
  );
  if (result.rows.length === 0) {
    throw new Error('User not found');
  }
  return result.rows[0];
};

export const deleteUser = async (id: String | undefined) => {
  const result = await pool.query('DELETE FROM USERS WHERE id = $1 RETURNING *', [id]);
  if (result.rows.length === 0) {
    throw new Error('User not found');
  }
  return result.rows[0];
};
