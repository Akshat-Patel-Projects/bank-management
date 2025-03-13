import express from 'express';

import { registerUser } from '../controllers/userController.js';

const router = express.Router();

//Post- Register New User
router.post('/signup', registerUser);

export default router;