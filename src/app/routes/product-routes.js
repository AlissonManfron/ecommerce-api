import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import productController from '../controllers/productController.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', productController.getAll)
.post('/', productController.register)
.get('/search/:id', productController.findById)
.get('/search/group/:group', productController.findByGroup);

export default router;