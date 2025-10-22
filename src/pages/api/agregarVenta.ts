import { db, Dulces, eq } from 'astro:db';

export async function POST({ request }: { request: Request }) {
  try {
    const { id, cantidad } = await request.json();

    if (typeof id !== 'number' || typeof cantidad !== 'number') {
      return new Response(JSON.stringify({ ok: false, error: "Datos inválidos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const dulce = await db.select().from(Dulces).where(eq(Dulces.id, id));
    
    if (dulce.length === 0) {
      return new Response(JSON.stringify({ ok: false, error: "Dulce no encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (dulce[0].stock < cantidad) {
      return new Response(JSON.stringify({ ok: false, error: "Stock insuficiente" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const nuevoStock = dulce[0].stock - cantidad;
    const nuevosVendidos = dulce[0].vendidos + cantidad;

    await db.update(Dulces).set({ 
      stock: nuevoStock,
      vendidos: nuevosVendidos
    }).where(eq(Dulces.id, id));

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ ok: false, error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}