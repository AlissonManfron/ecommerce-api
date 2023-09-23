import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import productController from '../controllers/productController.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', productController.find)
.post('/', productController.create)
.get('/search/rankeds', productController.getRankeds);

export default router;