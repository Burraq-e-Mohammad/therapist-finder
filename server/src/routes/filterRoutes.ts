import express from 'express';
import { getFilterOptions } from '../controllers/filterController';

const router = express.Router();

// GET /api/v1/filters - Get available filter options with counts
router.get('/', getFilterOptions);

export default router;
