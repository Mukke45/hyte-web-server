import {listAllUsers, selectUserById, addUser, updateUser, deleteUser} from "../models/user-model.mjs";

// TODO: implement route handlers below for users (real data)

const getUsers = async (req, res) => {
  const result = await listAllUsers();
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

const getUserById = async (req, res) => {
  const result = await selectUserById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

const postUser = async (req, res) => {
  try {
    const result = await addUser(req.body);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.status(201).json(result); // 201 Created status for successful resource creation
  } catch (error) {
    console.error('postUser', error);
    return res.status(500).json({ error: 500, message: 'Internal server error' });
  }
};

const putUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body;

    // Check if the user exists
    const existingUser = await selectUserById(userId);
    if (existingUser.error) {
      return res.status(existingUser.error).json(existingUser);
    }

    // Merge existing user data with updated data
    const updatedUser = { ...existingUser, ...updatedUserData };

    // Update the user in the database
    // Assuming you have a function named updateUser in your user-model.mjs file
    // Implement the updateUser function accordingly
    const result = await updateUser(userId, updatedUser);

    if (result.error) {
      return res.status(result.error).json(result);
    }

    return res.json(result);
  } catch (error) {
    console.error('putUser', error);
    return res.status(500).json({ error: 500, message: 'Internal server error' });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the user exists
    const existingUser = await selectUserById(userId);
    if (existingUser.error) {
      return res.status(existingUser.error).json(existingUser);
    }

    // Delete the user from the database
    const result = await deleteUser(userId);

    if (result.error) {
      return res.status(result.error).json(result);
    }

    return res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('deleteUserById', error);
    return res.status(500).json({ error: 500, message: 'Internal server error' });
  }
};


// Dummy login with mock data, returns user object if username & password match
const postLogin = (req, res) => {
  const userCreds = req.body;
  if (!userCreds.username || !userCreds.password) {
    return res.sendStatus(400);
  }
  const userFound = users.find(user => user.username == userCreds.username);
  // user not found
  if (!userFound) {
    return res.status(403).json({error: 'username/password invalid'});
  }
  // check if posted password matches to user found password
  if (userFound.password === userCreds.password) {
    res.json({message: 'logged in successfully', user: userFound});
  } else {
    return res.status(403).json({error: 'username/password invalid'});
  }
};

export {getUsers, getUserById, postUser, putUser, postLogin, deleteUserById};
