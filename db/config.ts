import { defineDb, defineTable, column } from 'astro:db';

const Dulces = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    nombre: column.text(),
    stock: column.number(),
    vendidos: column.number(),
  },
});

export default defineDb({
  tables: { Dulces },
});
