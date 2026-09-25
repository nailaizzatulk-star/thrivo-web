import { pgTable, serial, text, integer, timestamp, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Tabel Users
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Tabel Items (Pakaian Thrifting)
export const items = pgTable('items', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: varchar('category', { length: 50 }).notNull(), // '90s', 'Y2K', 'Retro', dll.
  originalPrice: integer('original_price').notNull(), // Harga beli asli
  sellingPrice: integer('selling_price').notNull(),   // Harga jual thrift
  condition: varchar('condition', { length: 50 }).notNull(), // 'Like New', 'Good', 'Fair'
  imageUrl: text('image_url').notNull(),
  imagePublicId: text('image_public_id').notNull(), // Untuk menghapus dari Cloudinary
  status: varchar('status', { length: 20 }).default('Available').notNull(), // 'Available' | 'Sold'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relasi antara User dan Items
export const usersRelations = relations(users, ({ many }) => ({
  items: many(items),
}));

export const itemsRelations = relations(items, ({ one }) => ({
  author: one(users, {
    fields: [items.userId],
    references: [users.id],
  }),
}));