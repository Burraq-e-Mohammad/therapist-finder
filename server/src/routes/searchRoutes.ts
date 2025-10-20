import express from 'express';
import { searchTherapists } from '../controllers/searchController';

const router = express.Router();

// GET /api/v1/search?q=query - Search therapists
router.get('/', searchTherapists);

export default router;
