import express from 'express';
import {
 gerMembership,
} from '../controllers/membershipController.js';

const router = express.Router();


router.get('/', gerMembership);

export default router;