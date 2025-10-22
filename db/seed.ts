import { db, Dulces } from 'astro:db';

export default async function seed() {
  await db.insert(Dulces).values([
    { id: 1, nombre: 'Paleta Payaso', stock: 50, vendidos: 10 },
    { id: 2, nombre: 'Mazapán', stock: 80, vendidos: 25 },
    { id: 3, nombre: 'Pulparindo', stock: 100, vendidos: 40 },
  ]);
}
