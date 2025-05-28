import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('spreedsheet.db');

import { Item } from '@/models/Item'

export const createTable = () => {
db.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER,
        name TEXT,
        price TEXT
    );
    `);
  };
;

export const dropTable = () => {
db.execAsync(`DROP TABLE products`);
  };
;

export const insertItem = async (id: number, name: string, price: string) => {
  await db.runAsync(
    'INSERT INTO products (id, name, price) VALUES (?, ?, ?)',
    id, name, price
  );
};

export const selectItems = async (): Promise<Item[]> => {
  const result = await db.getAllAsync('SELECT * FROM products');

  return result.map((item: any) => ({
    id: Number(item.id), 
    name: String(item.name),
    price: String(item.price),
  }));
};

export const clearItems = () => {
  db.runAsync('DELETE FROM products;');
}

export const replaceAllItems = async (dados: [number, string, string][]) => {
  await db.withTransactionAsync(async () => {
    await db.runAsync('DELETE FROM products;');

    for (const item of dados) {
      const id = item[0] || 'Sem Id';
      const name = item[1] || 'Sem Nome';
      const price = item[2] || 'Sem Preço';

      await db.runAsync(
        'INSERT INTO products (id, name, price) VALUES (?, ?, ?);',
        [id, name, price]
      );
    }
  });

  console.log('Dados substituídos com sucesso!');
};


export default db;