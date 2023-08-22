import pool from '../utils/connectDB';

export const getUsers = async () => {
  const result = await pool.query('SELECT * FROM USERS');
  return result.rows;
};

export const getUserById = async (id: number) => {
  const result = await pool.query('SELECT * FROM USERS WHERE id = $1', [id]);
  if (result.rows.length === 0) {
    throw new Error('User not found');
  }
  return result.rows[0];
};

interface User {
  given_name: string;
  family_name: string;
  email: string;
}

export const createUser = async (user: User) => {
  const result = await pool.query(
    'INSERT INTO USERS (given_name, family_name, email) VALUES ($1, $2, $3) RETURNING *',
    [user.given_name, user.family_name, user.email]
  );
  return result.rows[0];
};

export const updateUser = async (id: number, user: User) => {
  const result = await pool.query(
    'UPDATE USERS SET given_name=$1, family_name=$2, email=$3 WHERE id=$4 RETURNING *',
    [user.given_name, user.family_name, user.email, id]
  );
  if (result.rows.length === 0) {
    throw new Error('User not found');
  }
  return result.rows[0];
};

export const deleteUser = async (id: number) => {
  const result = await pool.query('DELETE FROM USERS WHERE id = $1 RETURNING *', [id]);
  if (result.rows.length === 0) {
    throw new Error('User not found');
  }
  return result.rows[0];
};
