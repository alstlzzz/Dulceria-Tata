import { db, Dulces, eq } from "astro:db";

export async function POST({ request }: { request: Request }) {
  try {
    const { id, nombre, stock, precio } = await request.json();

    if (!id || !nombre || typeof stock !== "number" || typeof precio !== "number") {
      return new Response(JSON.stringify({ ok: false, error: "Datos inválidos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await db
      .update(Dulces)
      .set({ nombre, stock, precio })
      .where(eq(Dulces.id, id));

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
