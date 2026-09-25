import { Router } from 'express';
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getUserItems,
  toggleItemStatus,
} from '../controllers/items.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

// Public Routes
router.get('/', getItems);

// Protected Routes Khusus User (Taruh /me sebelum /:id agar tidak terbaca sebagai param ID)
router.get('/me', authenticateJWT, getUserItems);
router.get('/:id', getItemById);

router.post('/', authenticateJWT, upload.single('image'), createItem);
router.put('/:id', authenticateJWT, upload.single('image'), updateItem);
router.delete('/:id', authenticateJWT, deleteItem);
router.patch('/:id/status', authenticateJWT, toggleItemStatus);

export default router;