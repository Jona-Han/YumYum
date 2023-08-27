import pool from '../utils/connectDB';

export const checkIfNewUser = async (userID: String) => {
  const result = await pool.query('SELECT * FROM USERS WHERE id = $1', [userID]);
  return result.rows.length == 0;
};
