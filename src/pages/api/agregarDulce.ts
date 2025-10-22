import { db, Dulces } from 'astro:db';

export async function POST({ request }: { request: Request }) {
  try {
    const { nombre, stock } = await request.json();

    if (!nombre || typeof stock !== 'number') {
      return new Response(JSON.stringify({ ok: false, error: "Datos inválidos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await db.insert(Dulces).values({
      nombre,
      stock,
      vendidos: 0,
    });

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