import { defineDb, defineTable, column } from "astro:db";

const Dulces = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    nombre: column.text(),              // 👈 string → text
    stock: column.number(),
    vendidos: column.number(),
    precio: column.number({ default: 0 }) // 👈 agregado con default
  }
});

export default defineDb({
  tables: { Dulces }
});
