import { defineTable, column } from 'astro:db';

export const Products = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    stock: column.number(),
  },
});

export default { tables: { Products } };
