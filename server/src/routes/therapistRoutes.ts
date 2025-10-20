import express from 'express';
import { getTherapists, getTherapistById, getTherapistStats } from '../controllers/therapistController';

const router = express.Router();

// GET /api/v1/therapists - Get all therapists with filtering and pagination
router.get('/', getTherapists);

// GET /api/v1/therapists/stats - Get therapist statistics
router.get('/stats', getTherapistStats);

// GET /api/v1/therapists/:id - Get single therapist by ID
router.get('/:id', getTherapistById);

export default router;
