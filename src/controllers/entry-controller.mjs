import {listAllEntries, findEntryById, addEntry, updateEntry, deleteEntry as deleteEntryFromDB} from "../models/entry-model.mjs";

const getEntries = async (req, res) => {
  const result = await listAllEntries();
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
  }
};

const getEntryById = async (req, res) => {
  const entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};

const postEntry = async (req, res) => {
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = req.body;
  if (entry_date && (weight || mood || sleep_hours || notes) && user_id) {
    const result = await addEntry(req.body);
    if (result.entry_id) {
      res.status(201);
      res.json({message: 'New entry added.', ...result});
    } else {
      res.status(500);
      res.json(result);
    }
  } else {
    res.sendStatus(400);
  }
};

const putEntry = async (req, res) => {
  const entryId = req.params.id;
  const { mood, weight, sleep_hours, notes } = req.body;

  try {
    // Check if the entry exists
    const existingEntry = await findEntryById(entryId);
    if (!existingEntry) {
      return res.sendStatus(404); // Not Found
    }

    // Update the entry
    const updatedEntry = {
      ...existingEntry,
      mood: mood || existingEntry.mood,
      weight: weight || existingEntry.weight,
      sleep_hours: sleep_hours || existingEntry.sleep_hours,
      notes: notes || existingEntry.notes,
    };

    // Perform the update
    const result = await updateEntry(entryId, updatedEntry);

    if (!result.error) {
      res.json({ message: 'Entry updated successfully.', ...result });
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error('Error updating entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteEntry = async (req, res) => {
  const entryId = req.params.id;

  try {
    // Check if the entry exists
    const existingEntry = await findEntryById(entryId);
    if (!existingEntry) {
      return res.sendStatus(404); // Not Found
    }

    // Delete the entry
    const result = await deleteEntryFromDB(entryId);

    if (!result.error) {
      res.json({ message: 'Entry deleted successfully.' });
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};
