import { Request, Response, NextFunction } from 'express';
import { db } from '../db';
import { items, users } from '../db/schema';
import { eq, and, ilike, asc, desc } from 'drizzle-orm';
import { AuthRequest } from '../middlewares/auth.middleware';
import { verifyToken } from '../utils/jwt';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary';
import { ApiError } from '../utils/api.error';

// Tambahkan file?: Express.Multer.File di bawah ini
export interface AuthRequest extends Request {
  user?: { id: number };
  file?: Express.Multer.File;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Akses ditolak, token tidak ditemukan'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return next(new ApiError(401, 'Token tidak valid atau telah kedaluwarsa'));
  }
};

// 1. GET /api/items (Pencarian, Filter Dinamis, Sorting, Pagination)
export const getItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q, category, sort, status, page = '1', limit = '10' } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const offset = (pageNum - 1) * limitNum;

    let conditions = [];

    if (q) {
      conditions.push(ilike(items.title, `%${q}%`));
    }
    if (category) {
      conditions.push(eq(items.category, category as string));
    }
    if (status) {
      conditions.push(eq(items.status, status as string));
    }

    let orderByClause = desc(items.createdAt);
    if (sort === 'price_asc') {
      orderByClause = asc(items.sellingPrice);
    } else if (sort === 'price_desc') {
      orderByClause = desc(items.sellingPrice);
    }

    const data = await db.select()
      .from(items)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(orderByClause)
      .limit(limitNum)
      .offset(offset);

    res.status(200).json({
      success: true,
      page: pageNum,
      limit: limitNum,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// 2. GET /api/items/:id (Detail Item)
export const getItemById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const [item] = await db.select().from(items).where(eq(items.id, id));

    if (!item) {
      throw new ApiError(404, 'Barang tidak ditemukan');
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

// 3. POST /api/items (Tambah Item + Upload Foto ke Cloudinary)
export const createItem = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new ApiError(401, 'Unauthorized');

    const { title, description, category, originalPrice, sellingPrice, condition } = req.body;

    if (!req.file) {
      throw new ApiError(400, 'Foto barang wajib diunggah');
    }

    // Upload buffer ke Cloudinary
    const cloudResult = await uploadToCloudinary(req.file.buffer);

    const [newItem] = await db.insert(items).values({
      userId,
      title,
      description,
      category,
      originalPrice: parseInt(originalPrice, 10),
      sellingPrice: parseInt(sellingPrice, 10),
      condition,
      imageUrl: cloudResult.url,
      imagePublicId: cloudResult.public_id,
      status: 'Available',
    }).returning();

    res.status(201).json({
      success: true,
      message: 'Barang berhasil diunggah',
      data: newItem,
    });
  } catch (error) {
    next(error);
  }
};

// 4. PUT /api/items/:id (Edit Item)
export const updateItem = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const itemId = parseInt(req.params.id as string, 10);

    const [existingItem] = await db.select().from(items).where(eq(items.id, itemId));
    if (!existingItem) throw new ApiError(404, 'Barang tidak ditemukan');
    if (existingItem.userId !== userId) throw new ApiError(403, 'Anda tidak berhak mengedit barang ini');

    let imageUrl = existingItem.imageUrl;
    let imagePublicId = existingItem.imagePublicId;

    // Jika mengunggah gambar baru
    if (req.file) {
      await deleteFromCloudinary(existingItem.imagePublicId);
      const cloudResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = cloudResult.url;
      imagePublicId = cloudResult.public_id;
    }

    const { title, description, category, originalPrice, sellingPrice, condition, status } = req.body;

    const [updatedItem] = await db.update(items)
      .set({
        title: title || existingItem.title,
        description: description || existingItem.description,
        category: category || existingItem.category,
        originalPrice: originalPrice ? parseInt(originalPrice, 10) : existingItem.originalPrice,
        sellingPrice: sellingPrice ? parseInt(sellingPrice, 10) : existingItem.sellingPrice,
        condition: condition || existingItem.condition,
        status: status || existingItem.status,
        imageUrl,
        imagePublicId,
        updatedAt: new Date(),
      })
      .where(eq(items.id, itemId))
      .returning();

    res.status(200).json({
      success: true,
      message: 'Barang berhasil diperbarui',
      data: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};

// 5. DELETE /api/items/:id (Hapus Item & Foto Cloudinary)
export const deleteItem = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const itemId = parseInt(req.params.id as string, 10);

    const [existingItem] = await db.select().from(items).where(eq(items.id, itemId));
    if (!existingItem) throw new ApiError(404, 'Barang tidak ditemukan');
    if (existingItem.userId !== userId) throw new ApiError(403, 'Anda tidak berhak menghapus barang ini');

    // Hapus dari Cloudinary
    await deleteFromCloudinary(existingItem.imagePublicId);

    // Hapus dari Database
    await db.delete(items).where(eq(items.id, itemId));

    res.status(200).json({
      success: true,
      message: 'Barang dan foto berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

// 6. GET /api/items/me (Dashboard Riwayat Item Milik User Login)
export const getUserItems = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new ApiError(401, 'Unauthorized');

    const userItems = await db.select().from(items).where(eq(items.userId, userId)).orderBy(desc(items.createdAt));

    res.status(200).json({
      success: true,
      data: userItems,
    });
  } catch (error) {
    next(error);
  }
};

// 7. PATCH /api/items/:id/status (Toggle cepat Available <-> Sold)
export const toggleItemStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const itemId = parseInt(req.params.id as string, 10);

    const [existingItem] = await db.select().from(items).where(eq(items.id, itemId));
    if (!existingItem) throw new ApiError(404, 'Barang tidak ditemukan');
    if (existingItem.userId !== userId) throw new ApiError(403, 'Akses ditolak');

    const newStatus = existingItem.status === 'Available' ? 'Sold' : 'Available';

    const [updatedItem] = await db.update(items)
      .set({ status: newStatus, updatedAt: new Date() })
      .where(eq(items.id, itemId))
      .returning();

    res.status(200).json({
      success: true,
      message: `Status berhasil diubah menjadi ${newStatus}`,
      data: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};