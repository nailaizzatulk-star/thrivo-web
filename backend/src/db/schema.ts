import { pgTable, serial, text, integer, timestamp, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enum Kategori
export const categoryEnum = pgEnum('category_type', [
  'OUTERWEAR',
  'KNITWEAR',
  'SHIRTS',
  'BOTTOMS',
  'JACKET'
]);

// Enum Kondisi Produk
export const conditionEnum = pgEnum('condition_type', [
  'NEW',
  'LIKE NEW',
  'VERY GOOD',
  'GOOD',
  'FAIR'
]);

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
  category: categoryEnum('category').notNull(), 
  originalPrice: integer('original_price').notNull(),
  sellingPrice: integer('selling_price').notNull(),   
  
  condition: conditionEnum('condition').notNull(), 
  
  imageUrl: text('image_url').notNull(),
  imagePublicId: text('image_public_id').notNull(),
  status: varchar('status', { length: 20 }).default('Available').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  items: many(items),
}));

export const itemsRelations = relations(items, ({ one }) => ({
  author: one(users, {
    fields: [items.userId],
    references: [users.id],
  }),
}));