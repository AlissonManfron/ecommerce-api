import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

router.get('/', authController.getAll)
.post('/register', authController.register)
.post('/authenticate', authController.authenticate)

export default router;