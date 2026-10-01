import { Request, Response, NextFunction } from 'express';
import { db } from '../db';
import { items, users } from '../db/schema';
import { eq, and, ilike, asc, desc, count } from 'drizzle-orm';
import { AuthRequest } from '../middlewares/auth.middleware';
import { verifyToken } from '../utils/jwt';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary';
import { ApiError } from '../utils/api.error';

// 1. GET /api/items (Pencarian, Filter, Sorting, Pagination)
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
      conditions.push(eq(items.category, category as any));
    }
    if (status) {
      conditions.push(eq(items.status, status as string));
    }

    const whereClause = conditions.length ? and(...conditions) : undefined;

    let orderByClause = desc(items.createdAt);
    if (sort === 'price_asc') {
      orderByClause = asc(items.sellingPrice);
    } else if (sort === 'price_desc') {
      orderByClause = desc(items.sellingPrice);
    }

    // Ambil total data untuk keperluan meta pagination frontend
    const [totalData] = await db
      .select({ value: count() })
      .from(items)
      .where(whereClause);

    const totalItems = totalData.value;
    const totalPages = Math.ceil(totalItems / limitNum);

    const data = await db.select()
      .from(items)
      .where(whereClause)
      .orderBy(orderByClause)
      .limit(limitNum)
      .offset(offset);

    res.status(200).json({
      success: true,
      meta: {
        page: pageNum,
        limit: limitNum,
        totalItems,
        totalPages,
      },
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
    if (isNaN(id)) throw new ApiError(400, 'Invalid item ID format');

    const [item] = await db.select().from(items).where(eq(items.id, id));

    if (!item) {
      throw new ApiError(404, 'Item not found');
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
      throw new ApiError(400, 'Item image is required');
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
      message: 'Item created successfully',
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
    
    if (isNaN(itemId)) throw new ApiError(400, 'Invalid item ID format');
    if (!userId) throw new ApiError(401, 'Unauthorized');

    const [existingItem] = await db.select().from(items).where(eq(items.id, itemId));
    if (!existingItem) throw new ApiError(404, 'Item not found');
    if (existingItem.userId !== userId) throw new ApiError(403, 'You are not authorized to edit this item');

    let imageUrl = existingItem.imageUrl;
    let imagePublicId = existingItem.imagePublicId;

    // Jika mengunggah gambar baru
    if (req.file) {
      if (existingItem.imagePublicId) {
        await deleteFromCloudinary(existingItem.imagePublicId);
      }
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
      message: 'Item updated successfully',
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
    
    if (isNaN(itemId)) throw new ApiError(400, 'Invalid item ID format');
    if (!userId) throw new ApiError(401, 'Unauthorized');

    const [existingItem] = await db.select().from(items).where(eq(items.id, itemId));
    if (!existingItem) throw new ApiError(404, 'Item not found');
    if (existingItem.userId !== userId) throw new ApiError(403, 'You are not authorized to delete this item');

    // Hapus dari Cloudinary jika ID ada
    if (existingItem.imagePublicId) {
      await deleteFromCloudinary(existingItem.imagePublicId);
    }

    // Hapus dari Database
    await db.delete(items).where(eq(items.id, itemId));

    res.status(200).json({
      success: true,
      message: 'Item and image deleted successfully',
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

    if (isNaN(itemId)) throw new ApiError(400, 'Invalid item ID format');
    if (!userId) throw new ApiError(401, 'Unauthorized');

    const [existingItem] = await db.select().from(items).where(eq(items.id, itemId));
    if (!existingItem) throw new ApiError(404, 'Item not found');
    if (existingItem.userId !== userId) throw new ApiError(403, 'Access denied');

    const newStatus = existingItem.status === 'Available' ? 'Sold' : 'Available';

    const [updatedItem] = await db.update(items)
      .set({ status: newStatus, updatedAt: new Date() })
      .where(eq(items.id, itemId))
      .returning();

    res.status(200).json({
      success: true,
      message: `Status successfully updated to ${newStatus}`,
      data: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};