import express from 'express';
import {
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
  deleteEntry,
} from '../controllers/entry-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import { postEntryValidationRules } from '../validations/entry-validation.mjs';
import { validationResult } from 'express-validator';

const entryRouter = express.Router();

entryRouter.route('/')
  .get(authenticateToken, getEntries)
  .post(authenticateToken, postEntryValidationRules(), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }, postEntry);

entryRouter.route('/:id').get(getEntryById).put(putEntry).delete(deleteEntry);

export default entryRouter;
