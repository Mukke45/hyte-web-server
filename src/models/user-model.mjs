import promisePool from '../utils/database.mjs';

const listAllUsers = async () => {
  try {
    const sql = 'SELECT user_id, username, user_level FROM Users';
    const [rows] = await promisePool.query(sql);
    console.log(rows);
    return rows;
  } catch (error) {
    console.error('listAllUsers', error);
    return {error: 500, message: 'db error'};
  }
};

const selectUserById = async (id) => {
  try {
    const sql = 'SELECT * FROM Users WHERE user_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    console.log(rows);
    // if nothing is found with the user id, result array is empty []
    if (rows.length === 0) {
      return {error: 404, message: 'user not found'};
    }
    // Remove password property from result
    delete rows[0].password;
    return rows[0];
  } catch (error) {
    console.error('listAllUsers', error);
    return {error: 500, message: 'db error'};
  }
};


const addUser = async (user) => {
  try {
    const { username, password, email, user_level } = user;

    // Validate required fields
    if (!username || !password || !email || !user_level) {
      return { error: 400, message: 'All fields (username, password, email, user_level) are required' };
    }

    // Insert new user into the database with 'created_at' set to NULL
    const sql = `
      INSERT INTO Users (username, password, email, user_level)
      VALUES (?, ?, ?, ?)
    `;

    const params = [username, password, email, user_level];
    const [result] = await promisePool.query(sql, params);

    // Return the newly created user
    const createdUserId = result.insertId;
    const createdUser = await selectUserById(createdUserId);

    return createdUser;
  } catch (error) {
    console.error('addUser', error);
    return { error: 500, message: 'Internal server error' };
  }
};

const updateUser = async (userId, updatedUserData) => {
  try {
    // Extract fields from updatedUserData
    const { username, password, email, user_level } = updatedUserData;

    // Validate required fields
    if (!username || !password || !email || !user_level) {
      return { error: 400, message: 'All fields (username, password, email, user_level) are required' };
    }

    // Update user in the database
    const sql = `
      UPDATE Users
      SET username=?, password=?, email=?, user_level=?
      WHERE user_id=?
    `;

    const params = [username, password, email, user_level, userId];
    const [result] = await promisePool.query(sql, params);

    // Check if the user was successfully updated
    if (result.affectedRows === 0) {
      return { error: 404, message: 'User not found' };
    }

    // Return the updated user
    const updatedUser = await selectUserById(userId);

    return updatedUser;
  } catch (error) {
    console.error('updateUser', error);
    return { error: 500, message: 'Internal server error' };
  }
};


const deleteUser = async (userId) => {
  try {
    const sql = 'DELETE FROM Users WHERE user_id=?';
    const params = [userId];
    const [result] = await promisePool.query(sql, params);

    // Check if the user was successfully deleted
    if (result.affectedRows === 0) {
      return { error: 404, message: 'User not found' };
    }

    return { message: 'User deleted successfully' };
  } catch (error) {
    console.error('deleteUser', error);
    return { error: 500, message: 'Internal server error' };
  }
};


export {listAllUsers, selectUserById, addUser, updateUser, deleteUser};
