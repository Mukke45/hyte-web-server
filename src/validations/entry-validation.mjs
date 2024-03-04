import { body } from 'express-validator';

export const postEntryValidationRules = () => {
  return [
    // Validates user_id is not empty and is a numeric value
    body('user_id').notEmpty().withMessage('User ID is required').isNumeric().withMessage('User ID must be numeric'),

    // Validates entry_date is not empty and is a valid date
    body('entry_date').notEmpty().withMessage('Entry date is required').isISO8601().withMessage('Entry date must be a valid ISO 8601 date'),

    // Optional fields with validation if provided
    body('mood').optional().isString().trim().withMessage('Mood must be a string'),
    body('weight').optional().isFloat({ min: 0 }).withMessage('Weight must be a positive number').toFloat(),
    body('sleep_hours').optional().isFloat({ min: 0, max: 24 }).withMessage('Sleep hours must be between 0 and 24').toFloat(),
    body('notes').optional().isString().trim().escape().withMessage('Notes must be a string'),
  ];
};
