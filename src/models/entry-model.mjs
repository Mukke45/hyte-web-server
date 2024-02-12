// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../utils/database.mjs';

const listAllEntries = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries');
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findEntryById = async (id) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries WHERE entry_id = ?', [id]);
    console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addEntry = async (entry) => {
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = entry;
  const sql = `INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, entry_date, mood, weight, sleep_hours, notes];
  try {
    const rows = await promisePool.query(sql, params);
    console.log('rows', rows);
    return {entry_id: rows[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const updateEntry = async (entryId, updatedEntry) => {
  const { mood, weight, sleep_hours, notes } = updatedEntry;
  const sql = `
    UPDATE DiaryEntries
    SET mood = ?, weight = ?, sleep_hours = ?, notes = ?
    WHERE entry_id = ?`;

  const params = [mood, weight, sleep_hours, notes, entryId];

  try {
    const result = await promisePool.query(sql, params);
    console.log('Update result:', result);
    return { message: 'Entry updated successfully.' };
  } catch (error) {
    console.error('Error updating entry in the database:', error);
    return { error: 'Internal Server Error' };
  }
};

const deleteEntry = async (entryId) => {
  const sql = `DELETE FROM DiaryEntries WHERE entry_id = ?`;

  try {
    const result = await promisePool.query(sql, [entryId]);
    console.log('Delete result:', result);
    return { message: 'Entry deleted successfully.' };
  } catch (error) {
    console.error('Error deleting entry in the database:', error);
    return { error: 'Internal Server Error' };
  }
};

export {listAllEntries, findEntryById, addEntry, updateEntry, deleteEntry};
