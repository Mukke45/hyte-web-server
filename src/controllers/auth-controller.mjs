import jwt from 'jsonwebtoken';
import {selectUserByNameAndPassword} from "../models/user-model.mjs";
import 'dotenv/config';

// INSECURE LOGIN uses harcoded passwords only
// returns user object if username & password match
const postLogin = async (req, res) => {
  const {username, password} = req.body;
  console.log('login', req.body);
  const user = await selectUserByNameAndPassword(username, password);
  if (user.error) {
    return res.status(user.error).json(user);
  }
  const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '24h'});
  return res.json({message: 'logged in successfully', user, token});
};

const getMe = async (req, res) => {
  res.json({user: req.user});
};

export {postLogin, getMe};
