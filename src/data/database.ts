import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('spreedsheet.db');

import { Item } from '@/models/Item'


export const createTable = () => {
db.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price TEXT
    );
    `);
  };
;

export const insertItem = async (name: string, price: string) => {
  await db.runAsync(
    'INSERT INTO products (name, price) VALUES (?, ?)',
    name, price
  );
};

export const selectItems = async (): Promise<Item[]> => {
  const result = await db.getAllAsync('SELECT * FROM products');

  return result.map((item: any) => ({
    id: Number(item.id), // <- Converte para número
    name: String(item.name),
    price: String(item.price),
  }));
};

export const clearItems = () => {
  db.runAsync('DELETE FROM items;');
}

export default db;